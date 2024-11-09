import { Request, Response, NextFunction } from 'express';
import Notification from '../models/notification.model';
import Review, { IReview } from '../models/review.model';
import Property, { IProperty } from '../models/property.model';
import Landlord, { ILandlord } from '../models/landlord.model';
import mongoose, { Types } from 'mongoose';
import User, { IUser } from '../models/user.model';



// Controller function to submit a review
export const submitReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenantId, propertyId, landlordId, ratings, comment } = req.body;

    // Checking if the landlord exists or create a new one
    let landlord = await Landlord.findById(landlordId);
    if (!landlord) {
      landlord = new Landlord({
        _id: landlordId,
        name: "Default Landlord Name", // Use the actual name if available
        contactInfo: "default@example.com" // Required contactInfo field
      });
      await landlord.save();
    }

    // Checking if the property exists or create a new one
    const propertyDetails = req.body.propertyDetails;
    let property = await Property.findOne({ address: propertyDetails.address });
    if (!property) {
      property = new Property({
        address: propertyDetails.address,
        name: propertyDetails.name,
        landlord: landlord._id,
        // Add other property fields as necessary
      });
      await property.save();
    }

    // Create a new review
    const review: IReview = new Review({
      tenant: tenantId,
      property: propertyId,
      landlord: landlord._id,
      ratings: {
        utilities: ratings.utilities,
        landlord: ratings.landlord,
        neighborhood: ratings.neighborhood,
        // Add other rating fields as needed
      },
      comment: comment,
    });

    // Save the review to the database
    await review.save();

    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Flag a review as inappropriate
export const flagReview = async (req: Request, res: Response): Promise<void> => {
  const { reviewId } = req.params;
  const { reason } = req.body;

  try {
    const userId = req.user?.id;
if (!userId) {
  res.status(401).json({ message: 'User not authenticated' });
  return;
}
    // Ensuring user ID is retrieved from `req.user.id`
    const user = await User.findById(userId) as IUser | null;
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: 'Review not found' }) as unknown as void;


    review.flagged = true;
    if (!review.reports) review.reports = []; 
    if (req.user?.id) {
      review.reports.push({ reason, reportedBy: req.user.id as unknown as mongoose.Types.ObjectId });
      req.user = { id: user._id as unknown as mongoose.Types.ObjectId, role: user.role };

    }
    await review.save();

    // Create a notification for the admin
    await Notification.create({
      type: 'flagged_content',
      message: `Review flagged for: ${reason}`,
      user: req.user?.id // The user who flagged the content
    });

    res.status(200).json({ message: 'Review flagged and notification sent to admin' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get reviews for a specific property
export const getPropertyReviews = async (req: Request, res: Response): Promise<void> => {
  const { propertyId } = req.params;

  try {
    // Find all reviews for the specified property
    const reviews = await Review.find({ property: propertyId })
      .populate('tenant', 'name') // Populate tenant details
      .populate('landlord', 'name'); // Populate landlord details

    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
