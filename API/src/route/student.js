import { Router } from 'express';
import { getStudentData } from '../util/ldap.js';
import { getTodayOutlookCalendar } from '../entity/outlook.js';

const router = Router();

router.get('/:studentUid', async (req, res) => {
    
    const studentData = await getStudentData(req.params.studentUid);

    if (studentData) {
        //const result = await getTodayOutlookCalendar(studentData);
        //res.json(result);
        res.json(studentData);
    } else {
        res.sendStatus(404);
    }
});

export default router;