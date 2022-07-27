const express = require('express');
const pool = require('../modules/pool');
const {

} = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * POST route for creating a task
 */

router.post('/:id', (req, res,) => {

  const company_id = req.params.id;
  const link = req.body.link;
  const linkTitle = req.body.linkTitle;

  const queryText = `INSERT INTO "documents" ("company_id", "link", "link_title")
  VALUES ($1, $2, $3);`;
  pool.query(queryText, [company_id, link, linkTitle])
    .then(result => {
      res.sendStatus(201);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
});

router.get('/:id', (req, res) => {
  const companyId = req.params.id;
  const queryText = `SELECT * FROM "documents" WHERE company_id = 5 ORDER BY $1;`
  pool.query(queryText, [companyId])
    .then(result => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('get tasks err: ', err);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  const queryText = `DELETE FROM tasks WHERE "tasks".id = $1`; // delete tasks from tasks table
  console.log("delete task", req.params.id);
  pool.query(queryText, [req.params.id])
    .then((response) => res.sendStatus(200))
    .catch(error => {
      console.log(`Error deleting task`, error);
      res.sendStatus(500);
    });

})




module.exports = router;