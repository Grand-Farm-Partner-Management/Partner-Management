/* 
    Notes:
        node-cron looks like it schedules tasks as the script is running but the script has to be
            always running to remember them. so restarting a server will kill the tasks. so this
            is probably not a great solution. its designed for when you want to schedule some tasks
            to run while server is running, but this script is not meant to run during the server time
            because this script is not related to http or users (it is meant to run every day, not
            dependent on when someone uses the server app)

            hmm -- or we could potentially use node-cron in server.js, so that when the server boots up
            it makes sure to run this script once per day. maybe that's the ticket?? TODO

            instead, lets make this script work properly. then figure out how to run THIS SCRIPT
            from the outside world (cron or otherwise) once per day. 

    TODO:
        [ ] Make the for-loop work with console log email body and to: address
        [ ] Make the for-loop send a CORRECT email with sendgrid
        [ ] ... when you get to this step, grab me so we can review
        [ ] When we know it works, then:
                [ ] Wrap the whole thing in a new function that we can export
                [ ] Export the function
                [ ] in Server.js, pull in node-cron, and then set it up so this function will run
                    every day at 9am or whatever (and in theory you could do every 5 seconds just to
                    make sure its running. turn off email if needed so you can just see the console log)
        
*/

const pool = require('./modules/pool');
require("dotenv").config();
const sendGridMail = require("@sendgrid/mail");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendReminderEmails() {
    console.log('running scheduled task: reminder email');
    const queryText1 = `select project.id, project.title, project.description, project.due_time, project.progression, project.completed, project.completed_time, "user".id, "user".first_name, "user".email from project
    join project_employee on project.id = project_employee.project_id
    join "user" on project_employee.employee_id = "user".id
    where project.due_time = CURRENT_DATE+interval '30days';`

    const queryText2 = `select project.id, project.title, project.description, project.due_time, project.progression, project.completed, project.completed_time, "user".id, "user".first_name, "user".email from project
    join project_employee on project.id = project_employee.project_id
    join "user" on project_employee.employee_id = "user".id
    where project.due_time = CURRENT_DATE+interval '90days';`

    const queryText3 = `select project.id, project.title, project.description, project.due_time, project.progression, project.completed, project.completed_time, "user".id, "user".first_name, "user".email from project
    join project_employee on project.id = project_employee.project_id
    join "user" on project_employee.employee_id = "user".id
    where project.due_time = CURRENT_DATE;`
    pool.query(queryText1).then(result => {
        // get rid of this, there is no request.
        console.log("result", result.rows);
        // if (result.rows.length != 0) {
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
                    html: "<strong>You have a month left in your project.</strong>",
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
        // } else {
        //     console.log("query1 undefined");
        // }
    })

    pool.query(queryText2).then(result => {
        // get rid of this, there is no request.
        console.log("result", result.rows);
        // if (result.rows.length != 0) {
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
                    html: "<strong>You have 3 months left in your project.</strong>",
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
        // } else {
        //     console.log("query2 undefined");
        // }
    })
    pool.query(queryText3).then(result => {
        // get rid of this, there is no request.
        console.log("result", result.rows);
        // if(result.rows.length != 0) {
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
                html: "<strong> Your project is expiring today.</strong>",
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
    // }else {
    //     console.log('query3 undefined');
    // }
    })


}

// result.rows is an array: loop over it
// build a body for the email in a new variable
// console log the to: address and the email body
// THEN use sendGrid to actually deliver the body and the to: email


// quick check to see if we are running this from the command line. if we are, run the function 
// for testing purposes and kill the pool when done
if (require.main === module) {
    sendReminderEmails(); // we want to remove this when we export to server.js, but keep for testing right now
    pool.end(); // kill the pool when we're done with it

    // cron test
    // let cron = require('node-cron'); // do this somewhere else, you dont want to start cron every time this runs i think?
    // cron.schedule('* * * * *', () => {
    //     console.log('this is a test');
    // });
}


// schedule will fire At 09:00 in every 3rd month (0 9 * * MON)

// go the opposite. make a cron that fires THIS code every day, dont make this code fire cron every time its ran
// this is really not good -- it will send you an email every minute I think?
// var cron = require('node-cron'); // do this somewhere else, you dont want to start cron every time this runs i think?
// cron.schedule('* * * * *', () => {
// const sendGridMail = require("@sendgrid/mail");
// sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
// const message = {
//     to: "kamokamophilippe13@gmail.com",
//     from: "philippebaraka13@gmail.com",
//     subject: "hello",
//     text: "Test message",
//     html: "<strong>Message sent.</strong>",
// };
// sendGridMail.send(message)
// .then(() => {
//     console.log("Email sent")
// })
// .catch((error) => {
//     console.log(error);
// })
// });


// if deadline is egal to 30 days send this at 9 am (0 9 * * MON)
// } else if(math == 30){
//     cron.schedule('* * * * *', () => {
//         const sendGridMail = require("@sendgrid/mail");
//         sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
//         const message = {
//             to: "kamokamophilippe13@gmail.com",
//             from: "philippebaraka13@gmail.com",
//             subject: "hello",
//             text: "Test message",
//             html: "<strong>Message sent.</strong>",
//         };
//         sendGridMail.send(message)
//         .then(() => {
//             console.log("Email sent")
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//     });

//     // deadline is due sent this at 9am ((0 9 * * MON))
// } else if (math === 1){
//     cron.schedule('0 9 * * MON', () => {
//         const sendGridMail = require("@sendgrid/mail");
//         sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
//         const message = {
//             to: "kamokamophilippe13@gmail.com",
//             from: "philippebaraka13@gmail.com",
//             subject: "hello",
//             text: "Test message",
//             html: "<strong>Message sent.</strong>",
//         };
//         sendGridMail.send(message)
//         .then(() => {
//             console.log("Email sent")
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//     });

// } else {
//     console.log("not send yet")
// }

module.exports = sendReminderEmails;