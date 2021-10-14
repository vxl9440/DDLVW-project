const router = require('express').Router();
const advisor = require('../entity/advisor');
const queue = require('../entity/queue');
const walkInHour = require('../entity/walkInHour');


router.get('/available',(req,res)=>{
    var p  = advisor.getAdvisorByWalkInAvailability();
    p.then((value)=>{
        res.json(value);
    });
});


router.get('/:id/walkInHours',(req,res)=>{
    var p = walkInHour.getWorkInHoursByAdvisorId(req.params.id);
    p.then((value)=>{
        res.json(value);
    });
});

router.get('/queue',(req,res)=>{
    res.json(queue.getAdvisorQueueByIds(req.body))
});

router.post('/:id/queue',(req,res)=>{
    res.json(queue.insertStudentByAdvisorId(req.params.id,req.body));
});

router.put('/:id/queue',(req,res)=>{
    res.json(queue.adjustStudentPositionByAdvisorId(req.params.id,req.body)); 
}); 

router.delete('/:id/queue',(req,res)=>{
    res.json(queue.deleteStudentByAdvisorId(req.params.id,req.body)); 
}); 

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