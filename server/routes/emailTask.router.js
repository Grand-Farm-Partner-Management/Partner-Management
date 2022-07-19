require("dotenv").config();

var cron = require('node-cron');
const pool = require("../modules/pool");
const router = require("./project.router");
// calculate the gideadline with the current date in days 
const currentDate = new Date();
console.log(startDate);
const msInDay = 24 * 60 * 60 * 1000;



router.get('/', (req, res) => {

    const queryText =`SELECT tasks.id, tasks.title, tasks.due_time, tasks.completed_by, tasks.completed_time, tasks.parent_task from tasks
    JOIN project on tasks.project_id = project.id
    JOIN project_employee on project.id = project_employee.project_id
    JOIN "user" on project_employee.employee_id = "user".id
    where "user".id = $1;`

    pool.query(queryText,)

    const deadline = new Date('2022-10-18');
    const math = Math.round(
        Math.abs(currentDate - deadline) / msInDay);
    console.log("dayessss", math);
    // if the math(days) is equal to 90(3months) send this message 
    if (math === 90) {
        // schedule will fire At 09:00 in 3months left for the task on monday (0 9 * * MON)
        cron.schedule('0 9 * * MON', () => {
            const sendGridMail = require("@sendgrid/mail");
            sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
            const message = {
                to: "kamokamophilippe13@gmail.com",
                from: "philippebaraka13@gmail.com",
                subject: "hello",
                text: "Test message",
                html: "<strong>You have 3 months left in this task.</strong>",
            };
            sendGridMail.send(message)
                .then(() => {
                    console.log("Email sent")
                })
                .catch((error) => {
                    console.log(error);
                })
        });
        // schedule will fire At 09:00 in amonth left for the task on Monday (0 9 * * MON)
    } else if (math === 30) {
        cron.schedule('0 9 * * MON', () => {
            const sendGridMail = require("@sendgrid/mail");
            sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
            const message = {
                to: "kamokamophilippe13@gmail.com",
                from: "philippebaraka13@gmail.com",
                subject: "hello",
                text: "Test message",
                html: "<strong>You have a month left for this task</strong>",
            };
            sendGridMail.send(message)
                .then(() => {
                    console.log("Email sent")
                })
                .catch((error) => {
                    console.log(error);
                })
        });

        // schedule will fire At 09:00 in deadline for the task on monday (0 9 * * MON)
    } else if (math === 1) {
        cron.schedule('0 9 * * MON', () => {
            const sendGridMail = require("@sendgrid/mail");
            sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
            const message = {
                to: "kamokamophilippe13@gmail.com",
                from: "philippebaraka13@gmail.com",
                subject: "hello",
                text: "Test message",
                html: "<strong>Your task is due.</strong>",
            };
            sendGridMail.send(message)
                .then(() => {
                    console.log("Email sent")
                })
                .catch((error) => {
                    console.log(error);
                })
        });

    } else {
        console.log("not send yet")
    }

})