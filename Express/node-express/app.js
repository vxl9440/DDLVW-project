var express = require('express');
var jwt = require('jsonwebtoken');


const reasonRouter = require('./webapp/route/reason');
const advisorRouter = require('./webapp/route/advisor');
const ldapRouter = require('./webapp/route/ldap');
const bannerRouter = require('./webapp/route/banner');
const registrationRouter = require('./webapp/route/registration');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/reason',reasonRouter);
app.use('/meetingHost',advisorRouter);
app.use('/student',ldapRouter);
app.use('/bannerInfo',bannerRouter);
app.use('/registration',registrationRouter);


// verify JWT
// app.all('*', (req, res, next)=> {
    
// });


app.listen(8080,'localhost',()=>{
    console.log('RUNNING');
});

module.exports = app;