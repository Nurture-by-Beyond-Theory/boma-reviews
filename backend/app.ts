import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import reviewRoutes from './routes/review.routes'; 
import { protect, admin } from './middleware/auth.middleware';
import adminRoutes from './routes/admin.routes';
import propertyRoutes from './routes/property.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

// Protected /api/reviews routes
app.use('/api/reviews', protect, reviewRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);
// app.use('/api/admin', require('./routes/admin.routes'));

// Example admin protected route
// app.get('/api/admin/data', protect, admin, (req: Request, res: Response) => {
   // res.json({ message: 'This is protected admin data' });
// });

// User and property routes
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

export default app; // Export the app
