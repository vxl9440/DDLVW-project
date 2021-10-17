const router = require('express').Router();
import { getStudentData } from '../util/ldap';
import { getTodayOutlookCalendar } from '../entity/outlook';


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