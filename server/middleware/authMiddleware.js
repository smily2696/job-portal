import jwt from "jsonwebtoken";
import Company from "../models/company.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized. Please log in again." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const company = await Company.findById(decoded.id).select("-password");
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found." });
        }

        req.company = company;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};
