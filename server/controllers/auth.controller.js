import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({Error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePicture: user.profilePicture,
        });

    } catch (error) {
        console.error("Error in login controller : " + error);
        res.status(500).json({Error: "Internal server error"});
    }
}

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        // Check the password and confirm password
        if (password !== confirmPassword){
            return res.status(400).json({Error: "Passwords do not match"});
        }

        // Check if the user already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({Error: "User already exists"});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Get profile picture
        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create the user
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePicture: gender === "Male" ? boyProfilePicture : girlProfilePicture
        });

        if (newUser){
            // Generate a jwt token
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                message: "User created successfully",
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                gender: newUser.gender,
                profilePicture: newUser.profilePicture
            });
        }


    } catch (error) {
        console.error("Error in signup controller : " + error);
        res.status(500).json({Error: "Internal server error"});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.error("Error in logout controller : " + error);
        res.status(500).json({Error: "Internal server error"});
    }
}

