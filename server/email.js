
const pool = require('./modules/pool');
require("dotenv").config();
const sendGridMail = require("@sendgrid/mail");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendReminderEmails() {

    console.log('running scheduled task: reminder email');
    const queryText = `select project.id, project.title, project.description, project.due_time, project.progression, project.completed, project.completed_time, "user".id, "user".first_name, "user".email from project
    join project_employee on project.id = project_employee.project_id
    join "user" on project_employee.employee_id = "user".id
    where project.completed_time = CURRENT_DATE;`
    pool.query(queryText).then(result => {

        // console.log("result", result.rows);

        for (let emails of result.rows) {
            console.log(emails.email);
            let title = emails.title;
            let description = emails.description;
            let due_date = emails.due_time;
            let first_name = emails.first_name;


            const message = {
                to: [emails.email],
                from: "philippebaraka13@gmail.com",
                subject: title,
                text: description,
                html: "<strong>Your project is completed.</strong>",
            };

            sendGridMail.send(message)
                .then(() => {
                    console.log("Email sent")
                })
                .catch((error) => {
                    console.log(error);
                })
            console.log(emails.email);

        }

    })
    const queryText1 = `select project.id, project.title, project.description, project.due_time, project.progression, project.completed, project.completed_time, "user".id, "user".first_name, "user".email from project
    join project_employee on project.id = project_employee.project_id
    join "user" on project_employee.employee_id = "user".id
    where DATE_TRUNC('DAY', project.due_time) = CURRENT_DATE+interval '29days';`

    const queryText2 = `select project.id, project.title, project.description, project.due_time, project.progression, project.completed, project.completed_time, "user".id, "user".first_name, "user".email from project
    join project_employee on project.id = project_employee.project_id
    join "user" on project_employee.employee_id = "user".id
    where DATE_TRUNC('DAY', project.due_time) = CURRENT_DATE+interval '90days';`

    const queryText3 = `select project.id, project.title, project.description, project.due_time, project.progression, project.completed, project.completed_time, "user".id, "user".first_name, "user".email from project
    join project_employee on project.id = project_employee.project_id
    join "user" on project_employee.employee_id = "user".id
    where DATE_TRUNC('DAY', project.due_time) <= CURRENT_DATE ;`
    pool.query(queryText1).then(result => {

        // console.log("result", result.rows);

        for (let emails of result.rows) {
            console.log(emails.email);
            let title = emails.title;
            let description = emails.description;
            let due_date = emails.due_time;
            let first_name = emails.first_name;

            if (emails.completed === true) {
                console.log("this project is completed")
            } else {

                const message = {
                    to: [emails.email],
                    from: "kamophilippephilippe13@gmail.com",
                    subject: "You have a month left for your project" ,first_name,
                    text: description,
                    html:"<strong>Hi</strong>",
                    first_name:first_name, 
                    // html2: "<strong>You have a month left in your project title:</strong>",
                    // html3: title,
                };

                sendGridMail.send(message)
                    .then(() => {
                        console.log("Email sent for a month left")
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                console.log(emails.email);
            }
        }
    });

    pool.query(queryText2).then(result => {

        // console.log("result", result.rows);

        for (let emails of result.rows) {
            console.log(emails.email);
            let title = emails.title;
            let description = emails.description;
            let due_date = emails.due_time;
            let first_name = emails.first_name;
            if (emails.completed === true) {

                console.log("the project is completed")
            } else {

                const message = {
                    to: [emails.email],
                    from: "kamophilippephilippe13@gmail.com",
                    subject: title,
                    text: description,
                    html:"<strong>Hi",
                    html:first_name, 
                    html: "<strong>You have 3 months left in your project title:</strong>",
                    html: title,
                };

                sendGridMail.send(message)
                    .then(() => {
                        console.log("Email sent")
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                console.log(emails.email);
            }
        }

    })
    pool.query(queryText3).then(result => {

        // console.log("result", result.rows);

        for (let emails of result.rows) {
            console.log(emails.email);
            let title = emails.title;
            let description = emails.description;
            let due_date = emails.due_time;
            let first_name = emails.first_name;
            if (emails.completed === true) {

                console.log("the project is completed")

                const message = {
                    to: [emails.email],
                    from: "kamophilippephilippe13@gmail.com",
                    subject: title,
                    text: description,
                    html:"<strong>Hi",
                    html:first_name, 
                    html: "<strong> Your project title:</strong>",
                    html: title,
                    html: "<strong>is due today at",
                    html: due_date,
                };

                sendGridMail.send(message)
                    .then(() => {
                        console.log("Email sent")
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                console.log(emails.email);
            }

        }

    })


}






module.exports = sendReminderEmails;