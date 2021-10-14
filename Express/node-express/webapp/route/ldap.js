const router = require('express').Router();
const ldap = require('../entity/ldap');
const outlook = require('../entity/outlook');


router.get('/:studentUid',(req,res)=>{
     var p = ldap.getStudentData(req.params.studentUid);
     p.then((value)=>{
         var p2 = outlook.getTodayOutlookCalendar(value);
         p2.then((value)=>{
            res.json(value);
         })
     });
});

module.exports = router;