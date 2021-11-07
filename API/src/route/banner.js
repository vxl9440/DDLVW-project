import { Router } from 'express';
import * as banner from '../entity/banner.js';
const router = Router();

router.post('/', (req,res) => {
    res.json(banner.storeFile(req.files));
});


export default router;