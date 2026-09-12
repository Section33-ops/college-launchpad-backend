import 'dotenv/config';
import express from 'express';

const router = express.Router();

router.get('/colleges', getColleges);

export default router;
