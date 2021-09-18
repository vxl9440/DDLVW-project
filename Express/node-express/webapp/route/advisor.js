const router = require('express').Router();
const advisor = require('../entity/advisor');


//select all advisors
router.get('/',(req,res)=>{
    var p = advisor.getAllAdvisors();
    p.then((value)=>{
        res.json(value);
    });
});


//select advisor by Id
router.get('/:id',(req,res)=>{
    var p = advisor.getAdvisorById(req.params.id);
    p.then((value)=>{
        res.json(value[0]);
    });
}); 

//insert advisor
router.post('/',(req,res)=>{
    var p = advisor.insertAdvisor(req.body);
    p.then((value)=>{
        res.json(value);
    },(reason)=>{
        res.json(reason);
    });
});

//update advisor
router.put('/:id',(req,res)=>{
    var p = advisor.updateAdvisor(req.body,req.params.id);
    p.then((value)=>{
        res.json(value);
    },(reason)=>{
        res.json(reason);
    });
});

//delete advisor
router.delete('/:id',(req,res)=>{
    var p = advisor.deleteAdvisor(req.params.id);
    p.then((value)=>{
        res.json(value);
    },(reason)=>{
        res.json(reason);
    });
});

module.exports = router;