const mongoose = require('mongoose');

const sellerRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: 'pending' }, // Optional field
});

module.exports = mongoose.model('SellerRequest', sellerRequestSchema);
