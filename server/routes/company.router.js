const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * POST route for creating a company
 */

router.post('/', (req, res) => {
  const companyName = req.body.companyName;

  const queryText = `INSERT INTO "company" (company_name)
    VALUES ($1) RETURNING id`;
  pool
    .query(queryText, [companyName])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// ** ---
//   Docs will need to be its own table
// ** ---

/**
 * GET route for showing all companies
 */
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "company";`
  pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

/**
 * GET route for showing all members
 */
router.get('/members/:id', (req, res) => {
  const queryText = `SELECT first_name, last_name, company_id, company_name FROM "company"
  JOIN "user" ON "company".id = "user".company_id
  WHERE "user".company_id = $1;`
  pool.query(queryText, [req.params.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

/**
* PUT route for changing partner level
*/

router.put('/partnerLevel/:id', (req, res) => {
  const companyId = req.params.id;
  const partnerLevel = req.body.partnerLevel;
  const queryText = `UPDATE "company"
      SET "partner_level" = $1
      WHERE id = $2;`
  pool
    .query(queryText, [partnerLevel, companyId])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Error updating company name. ', err);
      res.sendStatus(500);
    });
});

/**
* PUT route for adding company logo
*/

router.put('/logo/:id', (req, res) => {
  const companyId = req.params.id;
  const newLogo = req.body.logo;
  const queryText = `UPDATE "company"
      SET "logo" = $1
      WHERE id = $2;`
  pool
    .query(queryText, [newLogo, companyId])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Error updating company name. ', err);
      res.sendStatus(500);
    });
});

/**
* PUT route for renaming company
*/

router.put('/:id', (req, res) => {
  const companyId = req.params.id;
  const newName = req.body.companyName;
  const queryText = `UPDATE "company"
  SET "company_name" = $1
  WHERE id = $2;`
  pool
    .query(queryText, [newName, companyId])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Error updating company name. ', err);
      res.sendStatus(500);
    });
});

/**
* DELETE route for deleting a company
*/

router.delete('/:id', (req, res) => {
  const companyId = req.params.id;
  const queryText = `DELETE FROM "company" WHERE id = $1;`
  pool
    .query(queryText, [companyId])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log('Error deleting company. ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
