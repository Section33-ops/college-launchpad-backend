import 'dotenv/config';
import express from 'express';
import { getColleges } from '../controller/collegeController.js';

const router = express.Router();

router.get('/colleges', getColleges);

export default router;
