const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const sendGridMail = require("@sendgrid/mail");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)
/**
 * POST route for creating a company
 */

router.post('/:id', (req, res) => {
  const companyName = req.body.companyName;
  const userId = req.params.id
  const query1 = `INSERT INTO "company" (company_name)
    VALUES ($1) RETURNING id`;
  const query2 = `UPDATE "user" SET company_id = 5
  WHERE "user".id = 6;`
    pool
      .query(query1, [req.body.company_name])
      .then((result) => {
        let company = req.body.company_name;
 const message = {
          to:"kamokamophilippe13@gmail.com",
          from: "philippebaraka13@gmail.com",
          subject:[company],
          text: [company],
          html: [company],
          html: "<strong> A new company was created, please log in to approve.</strong>",
      };

      sendGridMail.send(message)
          .then(() => {
              console.log("Email sent")
          })
          .catch((error) => {
              console.log(error);
          })
        const createCompanyId = result.rows[0].id
        pool.query(queryText2, [userId, createProjectId])
          .then(result => {
          }).catch(err => {
            console.log(err);
          })
      })
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
  const queryText = `SELECT * FROM "company" ORDER BY partner_level ASC;`
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

//to get new companies for Grand Farm to accept
router.get('/newPartner', (req, res) => {
  const queryText = `select company.id, company.company_name, company.partner_level from company where partner_level = 101 order by id asc;`
  pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

//to get people who don't have a company
router.get('/unassigned', (req,res) => {
  const query = `select "user".id, "user".first_name, "user".last_name, "user".email, "user".company_id from "user" where company_id is null order by id;`

  pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error making SELECT for unassigned users:', error);
            res.sendStatus(500);
        });
})


xrouter.put('/assign', (req, res) => {
  const companyId = req.body.companyId;
  const userId = req.body.userId;
  const queryText = `//update "user" set company_id = $1 where "user".id = $2;`
  pool
    .query(queryText, [companyId, userId])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Error assigning user. ', err);
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
