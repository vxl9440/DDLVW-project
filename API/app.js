import express, { json, urlencoded } from 'express';
import reasonRouter from './webapp/route/reason';
import advisorRouter from './webapp/route/advisor';
import studentRouter from './webapp/route/student';
import bannerRouter from './webapp/route/banner';
const jwt = require('express-jwt');

const port = 8080;
const app  = express();

// Add JWT Authorization middleware first
// app.use(jwt({ secret: 'ischool' }));
// app.use((err, req, res, next) => {
//     if (err.name === 'UnauthorizedError') {
//       res.status(err.status).send({ message: err.message });
//       return;
//     }
//     next();
// });

app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/reason', reasonRouter);
app.use('/meetingHost', advisorRouter);
app.use('/student', studentRouter);
app.use('/bannerInfo', bannerRouter);

app.listen(port, () => {
    console.log('Running on port ', port);
});

export default app;
