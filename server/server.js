const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const cron = require('node-cron');



// Route includes
const userRouter = require('./routes/user.router');
const projectRouter = require('./routes/project.router');
const companyRouter = require('./routes/company.router');
const taskRouter = require('./routes/task.router');
const documentRouter = require('./routes/document.router')
const sendReminderEmails = require('./email');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.use('/api/company', companyRouter);
app.use('/api/task', taskRouter);
app.use('/api/document', documentRouter);

// Serve static files
app.use(express.static('build'));
// run every minute (* * * * *), at 9am (0 9 * * *)
cron.schedule('0 9 * * *', () => {
  sendReminderEmails();
});

// App Set //
const PORT = process.env.PORT || 5000;


/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
