import express from 'express';
import jwt from 'express-jwt';
import reasonRouter from './src/route/reason.js';
import meetingHostRouter from './src/route/advisor.js';
import studentRouter from './src/route/student.js';
import bannerRouter from './src/route/banner.js';
import registrationRouter from './src/route/registration.js';
import proxy from 'express-http-proxy';

const port = 8080;
const app  = express();

// Add JWT Authorization middleware first
app.use(jwt({ secret: 'ischool', algorithms: ['HS256'] }));
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(err.status).send({ message: err.message });
      return;
    }
    next();
});

// forward request to the PHP script which will redirect to Shib auth
// then it will return a JWT
// Replace this url with Shibboleth authentication request if deploying
app.use('/login', proxy('https://people.rit.edu', {
    https: true,
    proxyReqPathResolver: () => '/~lxp3901/ISTE501/auth.php'
}));

app.use('/logout', proxy('https://people.rit.edu', {
    https: true,
    proxyReqPathResolver: () => '/~lxp3901/ISTE501/logout.php'
}));

app.use(express.json());
app.use('/reason', reasonRouter);
app.use('/meetingHost', meetingHostRouter);
app.use('/student', studentRouter);
app.use('/bannerInfo', bannerRouter);
app.use('/registration', registrationRouter);

app.listen(port, () => {
    console.log('Running on port ', port);
});

export default app;