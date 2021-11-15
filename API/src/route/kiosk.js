import { Router } from 'express';
import { getAllReasons, getReasonsByIds } from '../entity/reason.js';
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
router.post('/registration/checkin', async (req, res) => { 
    try {
        const reqBody = req.body;
        
        // Inserts data into registration table (database transaction)
        await insertRegistration(reqBody);
        
        // get reason names
        let reasons = [];
        if (reqBody.reasons && reqBody.reasons.length) {
            reasons = (await getReasonsByIds(reqBody.reasons)).map(row => row.reason);
        }

        // TODO: if reqBody has appointment = true, then get the appointment data from Outlook
        let appointment = {};
        
        const studentQueueRegistration = {
            'studentName': reqBody.studentName,
            'username': reqBody.username,
            'timeIn': reqBody.timeIn,
            'appointment': appointment,
            'reasons': reasons
        };

        // Insert data into the queue.json file
        const status = insertStudentByAdvisorId(req.body.meetingHost, studentQueueRegistration);
        
        res.status(status).send();

    } catch(err) {
        res.status(500).send();
    }
});

export default router;