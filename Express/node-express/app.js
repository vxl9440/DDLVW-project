require('dotenv').config();
const session = require('express-session');
const msal = require('@azure/msal-node');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const reasonRouter = require('./webapp/route/reason');
const advisorRouter = require('./webapp/route/advisor');

var app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/reason',reasonRouter);
app.use('/meetingHost',advisorRouter);


// const authRouter = require('./webapp/route/outlook-auth')
// const testRouter = require('./webapp/route/test')

// var app = express();
// app.locals.users = {};

// // MSAL config
// const msalConfig = {
//     auth: {
//       clientId: process.env.OAUTH_CLIENT_ID,
//       authority: process.env.OAUTH_AUTHORITY,
//       clientSecret: process.env.OAUTH_CLIENT_SECRET
//     },
//     system: {
//       loggerOptions: {
//         loggerCallback(loglevel, message, containsPii) {
//           console.log(message);
//         },
//         piiLoggingEnabled: false,
//         logLevel: msal.LogLevel.Verbose,
//       }
//     }
//   };

//   // Create msal application object
// app.locals.msalClient = new msal.ConfidentialClientApplication(msalConfig);
// // Session middleware
// // NOTE: Uses default in-memory session store, which is not
// // suitable for production
// app.use(session({
//     secret: '1M9w~XT2-vYr3Tl_zL~Q_K9WzMdUc3rh2N',
//     resave: false,
//     saveUninitialized: false,
//     unset: 'destroy'
// }));


// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());


// app.use('/users',usersRouter)
// app.use('/auth',authRouter);
// app.use('/test',testRouter);

let port = 8080;
app.listen(port,'localhost',()=>{
    console.log('RUNNING on port ', port);
});

module.exports = app;