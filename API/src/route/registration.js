import { Router } from 'express';
import { insertRegistration } from '../entity/registration';

const router = Router();

router.post('/checkin',(req,res) => { 
    insertRegistration(req.body)
        .then(result => res.json(result));
});

export default router;