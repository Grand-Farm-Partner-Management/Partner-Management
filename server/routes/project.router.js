
const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();



//Post route for project 
// "id" SERIAL PRIMARY KEY,
// 	"title" varchar,
// 	"description" varchar,
// 	"progression" int,
// 	"due_time" timestamp,
// 	"completed" boolean default false,
// 	"completed_time" timestamp 
router.post('/', (req, res,) => {
    const title = req.body.title;
    const description = req.body.description;
    const progression = req.body.progression;
    const due_time = req.body.due_time;
    const completed = req.body.completed;
    const completed_time = req.body.completed_time;

    const insertProjectquery = `INSERT INTO "project" ("title", "description", "progression", "due_time", "completed", "completed_time")
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
    pool.query(insertProjectquery, [title, description, progression, due_time, completed, completed_time])
        .then(result => {
            const createProjectId = result.rows[0].id
            console.log("new project id:", createProjectId);
            res.sendStatus(201);

        }).catch(err => {
            console.log(err);
            res.sendStatus(500)
        })

});

module.exports = router;