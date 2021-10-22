import { Router } from 'express';
import { insertRegistration } from '../entity/registration.js';
import { insertStudentByAdvisorId } from '../entity/queue.js';

const router = Router();

router.post('/checkin', async (req, res) => { 
    try {
        await insertRegistration(req.body);
        insertStudentByAdvisorId(req.body.meetingHost, {
            "studentName": req.body.studentName,
            "studentUsername": req.body.studentUsername,
            "timeIn": req.body.timeIn
        });
        res.json({ "status": "success" });
    } catch(err) {
        res.json(err);
    }
});

export default router;