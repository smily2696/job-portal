import express from 'express';
import upload from '../config/multer.js';
import {
    changeJobApplicationsStatus,
    changeVisibility,
    getCompanyData,
    getCompanyPostedJobs,
    loginCompany,
    postJob,
    registerCompany,
    getCompanyJobApplicants
} from '../controllers/companyController.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; // ✅ corrected path

const router = express.Router();

// Company registration
router.post('/register', upload.single('image'), registerCompany);

// Company login
router.post('/login', loginCompany);

// Get company details
router.get('/company', authMiddleware, getCompanyData);

// Post a new job
router.post('/post-job', authMiddleware, postJob);

// Get applicants data of company
router.get('/applicants', authMiddleware, getCompanyJobApplicants);

// Get company job list
router.get('/list-jobs', authMiddleware, getCompanyPostedJobs);

// Change application status
router.post('/change-status', authMiddleware, changeJobApplicationsStatus);

// Change applications visibility
router.post('/change-visibility', authMiddleware, changeVisibility); // ✅ spelling fixed

export default router;
