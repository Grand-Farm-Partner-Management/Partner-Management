
const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * POST route for creating a project
 */
router.post('/', (req, res,) => {

    const title = req.body.title;
    const description = req.body.description;
    // Progression
    const due_time = req.body.due_time;
    // Completed

    const queryText = `INSERT INTO "project" ("title", "description", "progression", "due_time", "completed")
      VALUES ($1, $2, $3, $4, $5) RETURNING id`;

    const queryText2 = `insert into company_project ("company_id", "project_id")
    values ($1, $2);`;
    
    pool.query(queryText, [title, description, 0, due_time, false])
        .then(result => {
            const createProjectId = result.rows[0].id
            console.log("new project id:", createProjectId);
            res.sendStatus(201);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500)
        })

    pool.query(queryText2, [])
        .then(result => {
            const createProjectId = result.rows[0].id
            console.log("new project id:", createProjectId);
            res.sendStatus(201);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
});

/**
 * GET route for showing all projects for your company
 */

router.get('/:id', (req, res) => {
    const companyId = req.params.id;
    const queryText = `select project.title, project.description, project.progression from project
    join company_project on project.id = company_project.project_id
    join company on company_project.company_id = company.id
    where company.id = $1;`
    pool.query(queryText, [companyId])
        .then(result => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('User registration failed: ', err);
            res.sendStatus(500);
        });
});

module.exports = router;