import { Router } from 'express';
import * as banner from '../entity/banner.js';
const router = Router();

// router.get('/',(req, res) => {
//      res.json(banner.getBannerInfo());
// });

// router.post('/', (req,res) => {
//      res.json(banner.insertBannerInfo(req.body));
// });

router.get('/test',(req,res)=>{
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write('<form action="/bannerFile" method="post" enctype="multipart/form-data">');
     res.write('<input type="file" name="bannerFile"><br>');
     res.write('<input type="submit">');
     res.write('</form>');
     return res.end();
});

router.post('/',(req,res)=>{
    res.json(banner.storeFile(req.files));
});


export default router;