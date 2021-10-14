var express = require('express');


const reasonRouter = require('./webapp/route/reason');
const advisorRouter = require('./webapp/route/advisor');
const ldapRouter = require('./webapp/route/ldap');
const bannerRouter = require('./webapp/route/banner');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/reason',reasonRouter);
app.use('/meetingHost',advisorRouter);
app.use('/ldap',ldapRouter);
app.use('/bannerInfo',bannerRouter);

app.listen(8080,'localhost',()=>{
    console.log('RUNNING');
})

module.exports = app;