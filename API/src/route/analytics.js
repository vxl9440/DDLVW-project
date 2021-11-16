import { Router } from 'express';
import * as analytics from '../entity/analytics.js';
const router = Router();


router.get('/download', (req, res) => {
    console.log(req.query);
    analytics.constructFile(req.query.from, req.query.to)
        .then((file) => {
            console.log("Sending file for download", file);
            res.download(file, 'report.csv', function (err) {
                if (err) {
                    res.status(404);
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
}); 


router.get('/avgWaitingTime', (req, res) => {
    analytics.getAvgWaitingTime(req.query.from, req.query.to)
        .then(value => res.json(value))
        .catch(err => res.json(err));
}); 

router.get('/avgStudentPerDay', (req, res) => {
    analytics.getAvgStudentPerDay(req.query.from, req.query.to)
        .then(value => res.json(value))
        .catch(err => res.json(err));
}); 

router.get('/mostCommonReason', (req, res) => {
    analytics.getMostCommonReason(req.query.from, req.query.to)
        .then(value => res.json(value))
        .catch(err => res.json(err));
}); 


export default router;