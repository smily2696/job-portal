import express from 'express';
import { getJobById, getJobs } from '../controllers/jobController.js';

const router = express.Router();

// Get all jobs data
router.get('/', getJobs);

// Get a single job by ID
router.get('/:id', getJobById);

export default router;
