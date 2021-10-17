const router = require('express').Router();
const banner = require('../entity/banner');

router.get('/',(req,res)=>{
     res.json(banner.getBannerInfo());
});

router.post('/',(req,res)=>{
     res.json(banner.InsertBannerInfo(req.body));
});

router.put('/',(req,res)=>{
     res.json(banner.updateBannerInfo(req.body));
});

router.delete('/',(req,res)=>{
     res.json(banner.deleteBannerInfo());
});

export default router;