const express = require('express');
const SellerRequest = require('../models/sellerRequest'); // Import the SellerRequest model

const router = express.Router();

// Route to submit a seller request
router.post('/become-seller', async (req, res) => {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newRequest = new SellerRequest({ name, email, phone, address });
        await newRequest.save();
        return res.status(201).json({ message: 'Seller request submitted successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to submit seller request.', error: error.message });
    }
});

// Route for admin to view all requests
router.get('/requests', async (req, res) => {
    try {
        const requests = await SellerRequest.find(); // Fetch all seller requests
        return res.status(200).json(requests);
    } catch (error) {
        console.error(error); // Log error for debugging
        return res.status(500).json({ message: 'Failed to fetch requests.', error: error.message });
    }
});

// Route for admin to approve/reject a request
router.patch('/requests/:id', async (req, res) => {
    const { status } = req.body;

    // Validate status input (optional)
    if (!status || !['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value. Must be "approved" or "rejected".' });
    }

    try {
        const updatedRequest = await SellerRequest.findByIdAndUpdate(
            req.params.id, // Find the seller request by ID
            { status }, // Update the status
            { new: true } // Return the updated document
        );
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Seller request not found.' });
        }
        return res.status(200).json(updatedRequest); // Return the updated request
    } catch (error) {
        console.error(error); // Log error for debugging
        return res.status(500).json({ message: 'Failed to update request status.', error: error.message });
    }
});

module.exports = router;