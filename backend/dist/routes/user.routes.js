"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/routes/user.routes.ts
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware"); // Importing the middleware
const router = express_1.default.Router();
// POST /api/users/register
router.post('/register', user_controller_1.registerUser);
// POST /api/users/login
router.post('/login', user_controller_1.loginUser);
// GET /api/users/profile
router.get('/profile', auth_middleware_1.protect, user_controller_1.getUserProfile);
exports.default = router;
