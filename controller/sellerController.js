// controllers/sellerController.js
const SellerRequest = require('../models/sellerRequest');

// Handle creating a new seller request
exports.createSellerRequest = async (req, res) => {
    const { name, email, phone, address } = req.body;
    try {
        const newRequest = new SellerRequest({ name, email, phone, address });
        await newRequest.save();
        res.status(201).json({ success: true, message: 'Seller request submitted successfully.' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to submit seller request.', error });
    }
};

// Fetch all seller requests for the admin
exports.getAllSellerRequests = async (req, res) => {
    try {
        const requests = await SellerRequest.find();
        res.status(200).json({ success: true, requests });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch requests.', error });
    }
};

// Update the status of a seller request (approve/reject)
exports.updateSellerRequestStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const updatedRequest = await SellerRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updatedRequest) {
            return res.status(404).json({ success: false, message: 'Request not found.' });
        }
        res.status(200).json({ success: true, message: 'Request status updated.', updatedRequest });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to update request status.', error });
    }
};
