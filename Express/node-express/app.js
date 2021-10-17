import express, { json, urlencoded } from 'express';
import reasonRouter from './webapp/route/reason';
import advisorRouter from './webapp/route/advisor';
import studentRouter from './webapp/route/student';
import bannerRouter from './webapp/route/banner';

const port = 8080;
const app  = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/reason', reasonRouter);
app.use('/meetingHost', advisorRouter);
app.use('/student', studentRouter);
app.use('/bannerInfo', bannerRouter);

app.listen(port, () => {
    console.log('Running on port ', port);
})

export default app;