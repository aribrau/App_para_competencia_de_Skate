import express from 'express';
import {createSkater} from '../controller/skaterController.js';

const router = express.Router();

router.post('/crear-skater', createSkater);


export default router;