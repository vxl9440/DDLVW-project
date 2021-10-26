import { Router } from 'express';
import { getAllReasons } from '../entity/reason.js';
import { getAdvisorByWalkInAvailability } from '../entity/advisor.js';
import { getStudentData } from '../util/ldap.js';
import { insertRegistration } from '../entity/registration.js';
import { insertStudentByAdvisorId } from '../entity/queue.js';

const router = Router();

// get all reasons
router.get('/reason', (req, res) => {
    getAllReasons()
      .then(reasons => res.json(reasons))
      .catch(error => res.sendStatus(500));
});

// get all available advisors with their meetingHours
router.get('/meetingHost/available', async (req, res) => {
    getAdvisorByWalkInAvailability()
        .then(advisors => res.json(advisors))
        .catch(err => res.json(err));
});

// get student info from ldap /student
router.get('/student/:id', async (req, res) => {
    const studentData = await getStudentData(req.params.id);

    if (studentData) {
        //const result = await getTodayOutlookCalendar(studentData);
        //res.json(result);
        res.json(studentData);
    } else {
        res.sendStatus(404);
    }
});

// registration/checkin
router.post('/checkin', async (req, res) => { 
    try {
        await insertRegistration(req.body);
        insertStudentByAdvisorId(req.body.meetingHost, req.body);
        res.json({ "status": "success" });
    } catch(err) {
        res.json(`{ error: ${ err }`);
    }
});

export default router;