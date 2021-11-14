import { Router } from 'express';
import { getStudentData } from '../util/ldap.js';
import { getTodayOutlookCalendar } from '../entity/outlook.js';

const router = Router();

/**
 * Returns data about a student provided their RIT UID.
 * Uses LDAP and Outlook connections.
 */
router.get('/:studentUid', async (req, res) => {
    
    const studentData = await getStudentData(req.params.studentUid);
    
    if (studentData) {

        /**
         * !!! Outlook connection has not been fully implemented. !!!
         * 
         * During ISTE501, we were not able to access an advisor's Outlook data
         * through the shared ischoolcheckin outlook account.
         * 
         * getTodayOutlookCalendar is expected to return appointment data for 
         * a student, if there is any.
         * 
         * It should then append that data to the `studentData` object 
         * before returning to client.
         */
        //const result = await getTodayOutlookCalendar(studentData);
        studentData['hasAppt'] = false;
        res.json(studentData);
    } else {
        res.status(404).json({ 'error': 'Could not find student data with provided UID.' });
    }
});

export default router;