import { Router } from 'express';
import { insertRegistration, updateMeetingStartTime } from '../entity/registration.js';
import { insertStudentByAdvisorId } from '../entity/queue.js';
import { getReasonsByIds } from '../entity/reason.js';

const router = Router();

router.post('/checkin', async (req, res) => { 
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
        res.status(500).json(err);
    }
});

// to update meeting start time
router.put('/startMeeting',(req,res)=>{
    updateMeetingStartTime(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});


export default router;