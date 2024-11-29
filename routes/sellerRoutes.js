// sellerRoutes.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const SellerRequest = require('../models/sellerRequest');


// Create a seller request
router.post(
    '/become-seller',
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('phone').isLength({ min: 10 }).withMessage('Phone number must have at least 10 digits'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone } = req.body;

        try {
            // Check if the email already exists
            const existingRequest = await SellerRequest.findOne({ email });
            if (existingRequest) {
                return res.status(409).json({ message: 'A request with this email already exists' });
            }

            const sellerRequest = new SellerRequest({ name, email, phone });
            await sellerRequest.save();
            res.status(201).json({ message: 'Seller request submitted successfully!' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

// Get all seller requests (admin use)
router.get('/seller-requests', async (req, res) => {
    try {
        const sellerRequests = await SellerRequest.find();
        res.status(200).json(sellerRequests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Approve or reject seller requests
router.patch('/seller-requests/:id', async (req, res) => {
    const { status } = req.body;

    // Validate status
    if (!['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const sellerRequest = await SellerRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!sellerRequest) {
            return res.status(404).json({ message: 'Seller request not found' });
        }

        res.status(200).json({ message: `Request ${status}`, data: sellerRequest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;