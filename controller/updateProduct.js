const uploadProductPermission = require('../helpers/permission')
const productModel = require('../models/productModel')

async function updateProductController(req, res) {
    try {
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied");
        }
        const productId = req?.id

        const { _id, ...resBody } = req.body
        const updaeProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.json({
            message: "Product Update Successfully",
            data: updaeProduct,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateProductController