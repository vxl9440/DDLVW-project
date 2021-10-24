import { Router } from 'express';
import { insertRegistration } from '../entity/registration.js';
import { insertStudentByAdvisorId } from '../entity/queue.js';

const router = Router();

router.post('/checkin', async (req, res) => { 
    try {
        await insertRegistration(req.body);
        insertStudentByAdvisorId(req.body.meetingHost, req.body);
        res.json({ "status": "success" });
    } catch(err) {
        console.log('error');
        res.json(`{ error: ${ err }`);
    }
});

export default router;