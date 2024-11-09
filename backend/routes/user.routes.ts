// backend/routes/user.routes.ts
import express, { Router } from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware'; // Importing the middleware

const router: Router = express.Router();

// POST /api/users/register
router.post('/register', registerUser);

// POST /api/users/login
router.post('/login', loginUser); 

// GET /api/users/profile
router.get('/profile', protect, getUserProfile); 

export default router;
