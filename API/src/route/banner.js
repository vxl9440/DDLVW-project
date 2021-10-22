import { Router } from 'express';
import * as banner from '../entity/banner.js';
const router = Router();

router.get('/',(req, res) => {
     res.json(banner.getBannerInfo());
});

router.put('/', (req,res) => {
     res.json(banner.insertBannerInfo(req.body));
});


export default router;