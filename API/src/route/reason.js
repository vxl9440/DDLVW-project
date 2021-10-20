import { Router } from 'express';
import { getAllReasons, insertReason, updateReason, deleteReason } from '../entity/reason.js';

const router = Router();

router.get('/', (req, res) => {
   getAllReasons()
      .then(reasons => res.json(reasons))
      .catch(error => res.sendStatus(500).json(error));
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