import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        // Get the token from the cookies
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Check if the token is valid
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Check if the user exists in the database
        const user = await User.findById(decodedToken.userId).select("-password");
        if(!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default protectRoute;