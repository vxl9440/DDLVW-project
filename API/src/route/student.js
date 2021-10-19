import { Router } from 'express';
import { getStudentData } from '../util/ldap.js';
import { getTodayOutlookCalendar } from '../entity/outlook.js';

const router = Router();

router.get('/:studentUid', async (req, res) => {
    const studentData = await getStudentData(req.params.studentUid);

    if (studentData) {
        const result = await getTodayOutlookCalendar(studentData);

        res.json(result);
    } else {
        res.send(404);
    }
});

export default router;