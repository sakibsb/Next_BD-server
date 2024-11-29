const mongoose = require('mongoose');

const SellerRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{10,}$/, 'Phone number must be at least 10 digits'],
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('SellerRequest', SellerRequestSchema);