const productModel = require("../models/productModel")

const getProductPriceRangeController = async (req, res) => {
    try {
        const { category } = req.params;

        const minPriceProduct = await productModel.findOne({ category }).sort({ price: 1 });
        const maxPriceProduct = await productModel.findOne({ category }).sort({ price: -1 });

        res.json({
            message: "All Product",
            success: true,
            error: false,
            data: {
                minPrice: minPriceProduct.price,
                maxPrice: maxPriceProduct.price
            }

        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getProductPriceRangeController