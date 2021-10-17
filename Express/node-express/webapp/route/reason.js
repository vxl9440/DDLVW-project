const router = require('express').Router();
import { getAllReasons, insertReason, updateReason, deleteReason } from '../entity/reason';

router.get('/', (req, res) => {
   getAllReasons()
      .then(reasons => res.json(reasons))
      .catch(error => res.send(500).json(error));
});

router.post('/', (req, res) => {
   insertReason(req.body)
      .then(success => res.json(success))
      .catch(error => res.json(error));
});

router.put('/:id',(req,res)=>{
   updateReason(req.body, req.params.id)
      .then(success => res.json(success))
      .catch(error => res.json(error));
});

router.delete('/:id',(req,res)=>{
   deleteReason(req.params.id)
      .then(success => res.json(success))
      .catch(error => res.json(reason))
});
   

export default router;