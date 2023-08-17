import express from 'express';
import {createSkater, getAllSkaters, updateSkater, deleteSkater, getSkaterById, skaterLogin} from '../controller/skaterController.js';

const router = express.Router();

router.post('/create-skater', createSkater);
router.get('/get-all-skaters', getAllSkaters);
router.put('/update-skater/:id', updateSkater);
router.delete('/delete-skater/:id', deleteSkater);
router.get('/get-skater/:id', getSkaterById)
router.post('/login', skaterLogin)


export default router;