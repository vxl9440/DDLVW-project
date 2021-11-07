import { Router } from 'express';
import * as analytics from '../entity/analytics.js';
const router = Router();

// This API for testing
router.get('/downloadTest/:from/:to', (req, res) => {
    const data = {
        'from': req.params.from,
        'to': req.params.to
    }
    analytics.constructFile(data)
        .then((file) => {
            if(file['status'] === -1){
                res.json({'message': 'Server error'});
            } else {
                res.download(file['fileLocation']);
            }
        })
        .catch(err => res.json(err));
}); 

// real one
router.get('/download', (req, res) => {
    analytics.constructFile(req.body)
        .then((file) => {
            if (file['status'] === -1) {
                res.json({'message': 'Server error'});
            } else {
                res.download(file['fileLocation']);
            }
        })
        .catch(err => res.json(err));
}); 


export default router;