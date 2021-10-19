import { Router } from 'express';
import * as banner from '../entity/banner.js';
const router = Router();

router.get('/',(req,res)=>{
     res.json(banner.getBannerInfo());
});

router.post('/',(req,res)=>{
     res.json(banner.insertBannerInfo(req.body));
});

router.put('/',(req,res)=>{
     res.json(banner.updateBannerInfo(req.body));
});

router.delete('/',(req,res)=>{
     res.json(banner.deleteBannerInfo());
});

export default router;