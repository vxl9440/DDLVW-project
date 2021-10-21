const router = require('express').Router();
const registration = require('../entity/registration')


router.post('/checkin',(req,res)=>{ 
    var p = registration.insertRegistration(req.body);
    p.then((value)=>{
       res.json(value);
    });
});

module.exports = router;