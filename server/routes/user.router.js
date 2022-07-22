const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.username;
  const linkedIn = req.body.linkedIn;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (first_name, last_name, email, linkedin, password)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool
    .query(queryText, [firstName, lastName, email, linkedIn, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// Update user infor
router.put('/update/:id', (req, res) => {
  const userId = req.params.id
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const linkedIn = req.body.linkedIn;
  const phoneNumber = req.body.phoneNumber;
  const title = req.body.jobTitle;

  const queryText = `UPDATE "user" SET "first_name" = $1, "last_name" = $2, "email" = $3, "linkedin" = $4, "phone_number" = $5, "title" = $6
  WHERE id = $7;`
  pool
    .query(queryText, [firstName, lastName, email, linkedIn, phoneNumber, title, userId])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
