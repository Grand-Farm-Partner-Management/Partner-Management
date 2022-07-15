const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
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
 * POST route template
 */

 router.post('/', (req, res, next) => {
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

module.exports = router;
