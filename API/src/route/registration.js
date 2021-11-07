import { Router } from 'express';
import { insertRegistration } from '../entity/registration.js';
import { insertStudentByAdvisorId } from '../entity/queue.js';
import { getReasonsByIds } from '../entity/reason.js';

const router = Router();

router.post('/checkin', async (req, res) => { 
    try {
        const reqBody = req.body;
        await insertRegistration(reqBody);
        // get reason names
        let reasons = [];
        if (reqBody.reasons && reqBody.reasons.length) {
            reasons = (await getReasonsByIds(reqBody.reasons)).map(row => row.reason);
        }
        
        const studentQueueRegistration = {
            'studentName': reqBody.studentName,
            'username': reqBody.username,
            'timeIn': reqBody.timeIn,
            'appointment': {}, // TODO: Add appointment functionality
            'reasons': reasons
        };

        insertStudentByAdvisorId(req.body.meetingHost, studentQueueRegistration);
        
        res.sendStatus(201);

    } catch(err) {
        res.status(500).json(err);
    }
});

export default router;