import { Router } from 'express';
import * as advisor from '../entity/advisor.js';
import * as queue from '../entity/queue.js';
import { getWalkInHoursByAdvisorId } from '../entity/walkInHour.js';

const router = Router();

router.get('/available', (req, res) => {
    advisor.getAdvisorByWalkInAvailability()
        .then(advisors => res.json(advisors));
});


router.get('/:id/walkInHours', (req, res) => {
    getWalkInHoursByAdvisorId(req.params.id)
        .then(hours => res.json(hours));
});


router.get('/queue', (req, res) => {
    res.json(queue.getAdvisorQueueByIds(req.body))
});


router.post('/:id/queue', (req, res) => {
    res.json(queue.insertStudentByAdvisorId(req.params.id,req.body));
});


router.put('/:id/queue', (req, res) => {
    res.json(queue.adjustStudentPositionByAdvisorId(req.params.id,req.body)); 
}); 


router.delete('/:id/queue', (req, res) => {
    res.json(queue.deleteStudentByAdvisorId(req.params.id,req.body)); 
}); 


//select all advisors
router.get('/', (req, res) => {
    advisor.getAllAdvisors()
        .then(advisors => res.json(advisors));
});


//select advisor by Id
router.get('/:id', (req, res) => {
    advisor.getAdvisorById(req.params.id)
        .then(success => res.json(success[0]));
});


//insert advisor
router.post('/', (req, res) => {
    advisor.insertAdvisor(req.body)
        .then(success => res.json(success))
        .catch(error => res.json(error));
});

//update advisor
router.put('/:id', (req, res) => {
    advisor.updateAdvisor(req.body, req.params.id)
        .then(success => res.json(success))
        .catch(error => res.json(error));
});

//delete advisor
router.delete('/:id', (req, res) => {
    advisor.deleteAdvisor(req.params.id)
        .then(success => res.json(success))
        .catch(error => res.json(error));
});

export default router;