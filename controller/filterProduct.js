const productModel = require("../models/productModel")

const filterController = async (req, res) => {
    try {
        const categoryList = req.body?.category || []
        const minPrice = req.body?.minPrice || 0
        const maxPrice = req.body?.maxPrice || 0

        const product = await productModel.find({
            category: {
                "$in": categoryList
            },
            price: { "$gte": Number(minPrice), "$lte": Number(maxPrice) }
        })
        res.json({
            data: product,
            message: "product",
            success: true,
            error: false
        })
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = filterController