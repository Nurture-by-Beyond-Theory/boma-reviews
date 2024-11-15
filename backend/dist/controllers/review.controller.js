"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropertyReviews = exports.flagReview = exports.submitReview = void 0;
const notification_model_1 = __importDefault(require("../models/notification.model"));
const review_model_1 = __importDefault(require("../models/review.model"));
const property_model_1 = __importDefault(require("../models/property.model"));
const landlord_model_1 = __importDefault(require("../models/landlord.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
// Controller function to submit a review
const submitReview = async (req, res) => {
    try {
        const { tenantId, propertyId, landlordId, ratings, comment } = req.body;
        // Checking if the landlord exists or create a new one
        let landlord = await landlord_model_1.default.findById(landlordId);
        if (!landlord) {
            landlord = new landlord_model_1.default({
                _id: landlordId,
                name: "Default Landlord Name", // Use the actual name if available
                contactInfo: "default@example.com" // Required contactInfo field
            });
            await landlord.save();
        }
        // Checking if the property exists or create a new one
        const propertyDetails = req.body.propertyDetails;
        let property = await property_model_1.default.findOne({ address: propertyDetails.address });
        if (!property) {
            property = new property_model_1.default({
                address: propertyDetails.address,
                name: propertyDetails.name,
                landlord: landlord._id,
                // Add other property fields as necessary
            });
            await property.save();
        }
        // Create a new review
        const review = new review_model_1.default({
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
    }
    catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.submitReview = submitReview;
// Flag a review as inappropriate
const flagReview = async (req, res) => {
    const { reviewId } = req.params;
    const { reason } = req.body;
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }
        // Ensuring user ID is retrieved from `req.user.id`
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const review = await review_model_1.default.findById(reviewId);
        if (!review)
            return res.status(404).json({ error: 'Review not found' });
        review.flagged = true;
        if (!review.reports)
            review.reports = [];
        if (req.user?._id) {
            review.reports.push({ reason, reportedBy: req.user._id });
            req.user = { id: user._id, role: user.role };
        }
        await review.save();
        // Create a notification for the admin
        await notification_model_1.default.create({
            type: 'flagged_content',
            message: `Review flagged for: ${reason}`,
            user: req.user?._id // The user who flagged the content
        });
        res.status(200).json({ message: 'Review flagged and notification sent to admin' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.flagReview = flagReview;
// Get reviews for a specific property
const getPropertyReviews = async (req, res) => {
    const { propertyId } = req.params;
    try {
        // Find all reviews for the specified property
        const reviews = await review_model_1.default.find({ property: propertyId })
            .populate('tenant', 'username') // Populate tenant details
            .populate('landlord', 'username'); // Populate landlord details
        res.status(200).json({ reviews });
    }
    catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getPropertyReviews = getPropertyReviews;
