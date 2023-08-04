import express from 'express';
import {createSkater, getAllSkaters, updateSkater} from '../controller/skaterController.js';

const router = express.Router();

router.post('/create-skater', createSkater);
router.get('/get-all-skaters', getAllSkaters);
router.put('/update-skater/:id', updateSkater);


export default router;