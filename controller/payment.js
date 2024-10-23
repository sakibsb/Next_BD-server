const SSLCommerzPayment = require('sslcommerz-lts')

const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASSWORD
const is_live = false //true for live, false for sandbox

const getPymentLink = async (req, res) => {
    try {
        const info = req.body;

        const data = {
            total_amount: info.amount,
            currency: 'BDT',
            tran_id: crypto.randomUUID(), // use unique tran_id for each api call
            success_url: 'http://localhost:3030/success',
            fail_url: 'http://localhost:3030/fail',
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
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            console.log("apiResponse: ", apiResponse)
            let GatewayPageURL = apiResponse.GatewayPageURL
            console.log('Redirecting to: ', GatewayPageURL)
            return res.status(200).json({ url: GatewayPageURL })
        });

    } catch (error) {
        return res.status(500).json({ message: "Error in payment!" })
    }
}

module.exports = { getPymentLink }