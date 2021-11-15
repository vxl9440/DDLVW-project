import { Router } from 'express';
import * as advisor from '../entity/advisor.js';
import * as queue from '../entity/queue.js';
import * as walkInHour from '../entity/walkInHour.js';

const router = Router();

router.get('/available', (req, res) => {
    advisor.getAdvisorByWalkInAvailability()
        .then(advisors => res.json(advisors))
        .catch(err => res.json(err));
});


router.get('/:id/walkInHours', (req, res) => {
    walkInHour.getWalkInHoursByAdvisorId(req.params.id)
        .then(hours => res.json(hours))
        .catch(err => res.json(err));
});


router.delete('/:id/walkInHours/', (req, res) => {
    walkInHour.deleteWalkInHours(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


router.post('/:id/walkInHours', (req, res) => {
    walkInHour.addWalkInHours(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


router.put('/:id/walkInHours/', (req, res) => {
    walkInHour.updateWalkInHours(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


router.get('/queue', (req, res) => {
    res.json(queue.getAllQueue());
});


router.put('/:id/queue', (req, res) => {
    res.status(queue.adjustStudentPositionByAdvisorId(req.params.id,req.body)).send(); 
}); 


router.delete('/:id/queue/:username', async (req, res) => {
    res.status(await queue.deleteStudentByAdvisorId(req.params.id, req.params.username)).send();
}); 


//select all advisors
router.get('/', (req, res) => {
    const user = req.query.user;
    if (user) {
        advisor.getAdvisorByEmail(user)
            .then(advisor => res.json(advisor[0]))
            .catch(err => res.json(err));
    } else {
        advisor.getAllAdvisors()
            .then(advisors => res.json(advisors))
            .catch(err => res.json(err));
    } 
});


//select advisor by Id
router.get('/:id', (req, res) => {
    advisor.getAdvisorById(req.params.id)
        .then(success => res.json(success[0]))
        .catch(err => res.json(err));
});


//insert advisor
router.post('/', (req, res) => {
    advisor.insertAdvisor(req.body)
        .then(success => res.json(success))
        .catch(error => res.json(error.error.sqlMessage));
});

//update advisor
router.put('/:id', (req, res) => {
    advisor.updateAdvisor(req.body, req.params.id)
        .then(success => res.json(success))
        .catch(error => res.json(error));
});

//toggle advisor enabled status
router.put('/:id/toggleStatus', (req, res) => {
    advisor.toggleStatus(req.params.id)
        .then(success => res.json(success))
        .catch(error => res.json(error));
});

export default router;