import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import Job from "../models/Job.js";
import { v2 as cloudinary } from "cloudinary";

// ✅ Get user data
export const getUserData = async (req, res) => {
    const userId = req.auth.userId; // Clerk user id (string)

    try {
        let user = await User.findById(userId);

        // If not found, auto-create user from Clerk data (useful during first login)
        if (!user) {
            const { firstName, lastName, imageUrl, emailAddress } = req.auth.user || {};
            user = await User.create({
                _id: userId,
                name: `${firstName || ""} ${lastName || ""}`.trim() || "Unnamed User",
                email: emailAddress || "unknown@user.com",
                image: imageUrl,
            });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ✅ Apply for a job
export const applyForJob = async (req, res) => {
    const { jobId } = req.body;
    const userId = req.auth.userId;

    try {
        const jobData = await Job.findById(jobId);
        if (!jobData) return res.json({ success: false, message: "Job not found" });

        // Check if already applied
        const existing = await JobApplication.findOne({ jobId, userId });
        if (existing)
            return res.json({ success: false, message: "Already applied" });

        await JobApplication.create({
            companyId: jobData.companyId,
            userId, // Clerk ID as string
            jobId,
            date: Date.now(),
        });

        res.json({ success: true, message: "Applied successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ✅ Get user's applied jobs
export const getUserJobApplications = async (req, res) => {
    const userId = req.auth.userId;

    try {
        const applications = await JobApplication.find({ userId })
            .populate("companyId", "name email image")
            .populate("jobId", "title description location category level salary")
            .exec();

        // Return empty array instead of false message
        res.json({ success: true, applications });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ✅ Update user resume
export const updateUserResume = async (req, res) => {
    const userId = req.auth.userId;
    const resumeFile = req.file;

    try {
        const user = await User.findById(userId);
        if (!user) return res.json({ success: false, message: "User not found" });

        if (resumeFile) {
            const upload = await cloudinary.uploader.upload(resumeFile.path);
            user.resume = upload.secure_url;
            await user.save();
        }

        res.json({ success: true, message: "Resume updated successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
