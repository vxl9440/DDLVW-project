import { Router } from 'express';
import { getAllReasons } from '../entity/reason.js';
import { getAdvisorByWalkInAvailability } from '../entity/advisor.js';

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

// registration/checkin

export default router;