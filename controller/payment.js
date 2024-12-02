const SSLCommerzPayment = require('sslcommerz-lts');
const crypto = require('crypto');

const store_id = process.env.STORE_ID; // Get from environment variables
const store_passwd = process.env.STORE_PASSWORD; // Get from environment variables
const is_live = false; // Set to true for live, false for sandbox

const getPymentLink = async (req, res) => {
    try {
        const info = req.body;

        const data = {
            total_amount: info.amount,
            currency: 'BDT',
            tran_id: crypto.randomUUID(), // Use a unique tran_id for each API call
            success_url: 'http://localhost:3000/api/payment/success',  // Success URL
            fail_url: 'http://localhost:3000/payment/fail',  // Failure URL
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: info.firstName,
            cus_email: info.email,
            cus_add1: info.address,
            cus_add2: info.address,
            cus_city: info.city,
            cus_state: info.state,
            cus_postcode: info.postal,
            cus_country: info.country,
            cus_phone: info.phone,
            cus_fax: info.phone,
            ship_name: info.firstName,
            ship_add1: info.address,
            ship_add2: info.address,
            ship_city: info.city,
            ship_state: info.state,
            ship_postcode: info.postal,
            ship_country: info.country,
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz.init(data).then(apiResponse => {
            let GatewayPageURL = apiResponse.GatewayPageURL;
            return res.status(200).json({ url: GatewayPageURL });
        });

    } catch (error) {
        return res.status(500).json({ message: "Error in payment!" });
    }
};

module.exports = { getPymentLink };