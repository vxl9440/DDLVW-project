const router = require('express').Router();
const reason = require('../entity/reason');

router.get('/', (req,res)=>{
    var p = reason.getAllReasons();
    p.then((value)=>{
       res.json(value);
    });
});


router.post('/',(req,res)=>{
   var p = reason.insertReason(req.body);
   p.then((value)=>{
       res.json(value);
   },(reason)=>{
       res.json(reason);
   });
});

router.put('/:id',(req,res)=>{
   var p = reason.updateReason(req.body,req.params.id);
   p.then((value)=>{
      res.json(value);
   },(reason)=>{
      res.json(reason);
   });
});

router.delete('/:id',(req,res)=>{
   var p = reason.deleteReason(req.params.id);
   p.then((value)=>{
      res.json(value);
   },(reason)=>{
      res.json(reason);
   });
})
   


module.exports = router;