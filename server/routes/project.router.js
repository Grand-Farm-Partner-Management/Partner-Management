const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', (req, res) => {
    const query = `select project.id, project.title, project.description, project.due_time, project.progression, project.completed, project.completed_time from project
    join project_employee on project.id = project_employee.project_id
    join "user" on project_employee.employee_id = "user".id
    where "user".id = $1;`

    pool.query(query, [req.user.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error making SELECT for runs:', error);
            res.sendStatus(500);
        });
})

router.get('/projectDetails/:id', (req, res) => {
    const projectId = req.params.id;
    const query = `SELECT * FROM "project"
    WHERE "id" = $1;`
    pool.query(query, [projectId])
        .then(result => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error making SELECT for project details:', error);
            res.sendStatus(500);
        });
})

/**
 * POST route for creating a project
 */
router.post('/:id', (req, res,) => {

    const title = req.body.title;
    const description = req.body.description;
    // Progression
    const due_time = req.body.due_time;
    // Completed
    const company_id = req.params.id;

    const queryText = `INSERT INTO "project" ("title", "description", "progression", "due_time", "completed")
      VALUES ($1, $2, $3, $4, $5) RETURNING id`;

    const queryText2 = `insert into company_project ("company_id", "project_id")
    values ($1, $2);`;

    pool.query(queryText, [title, description, 0, due_time, false])
        .then(result => {
            const createProjectId = result.rows[0].id
            console.log("new project id:", createProjectId);
            pool.query(queryText2, [company_id, createProjectId])
                .then(result => {
                }).catch(err => {
                    console.log(err);
                })
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
    const queryText = `select project.id, project.title, project.description, project.progression, project.due_time from project
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

router.delete('/:id', (req, res) => {
    const query1 = `delete from company_project where project.id = $1`; // delete project from company_project join table
    const query2 = `delete from project_employee where project.id = $1`;// delete project from project_employee join table
    const query3 = `delete from tasks where project.id = $1`; // delete project tasks from tasks table
    const query4 = `delete from project where project.id = $1`; // delete the project from the project table

    pool.query(query1, [req.params.id])
        .then((response) => res.sendStatus(200))
        .catch(error => {
            console.log(`Error deleting run`, error);
            res.sendStatus(500);
        });

    pool.query(query2, [req.params.id])
        .then((response) => res.sendStatus(200))
        .catch(error => {
            console.log(`Error deleting run`, error);
            res.sendStatus(500);
        });

    pool.query(query3, [req.params.id])
        .then((response) => res.sendStatus(200))
        .catch(error => {
            console.log(`Error deleting run`, error);
            res.sendStatus(500);
        });

    pool.query(query4, [req.params.id])
        .then((response) => res.sendStatus(200))
        .catch(error => {
            console.log(`Error deleting run`, error);
            res.sendStatus(500);
        });


})

module.exports = router;