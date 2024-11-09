import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

// New User Registration
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      name,
      email,
      password,
      role,
      reviews: [],
    });
    

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
};

// Existing User Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get User Profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Checking if user is authenticated
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    // Find user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Respond with user data
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
