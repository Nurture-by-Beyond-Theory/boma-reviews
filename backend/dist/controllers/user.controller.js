"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
// New User Registration with Password Confirmation
const registerUser = async (req, res) => {
    const { username, email, password, confirmPassword, role, location } = req.body;
    try {
        // Check if passwords match
        if (password !== confirmPassword) {
            res.status(400).json({ error: 'Passwords do not match' });
            return;
        }
        // Hash the password
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        // Create new user
        const user = new user_model_1.default({
            username,
            email,
            password: hashedPassword,
            role,
            location,
            reviews: [],
            authProvider: 'email',
        });
        console.log("User data to be saved:", user);
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({ error: 'Error registering user' });
    }
};
exports.registerUser = registerUser;
// Existing User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await user_model_1.default.findOne({ email });
        if (!user || !bcryptjs_1.default.compareSync(password, user.password || '')) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.loginUser = loginUser;
// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        const user = req.user;
        // Check if user is authenticated
        if (!user) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }
        const foundUser = await user_model_1.default.findById(user._id);
        if (!foundUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getUserProfile = getUserProfile;
