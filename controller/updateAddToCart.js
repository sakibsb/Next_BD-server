const addToCartModel = require("../models/cartProduct")

const updateAddToCart = async(req,res)=>{
    try{
        const currentUserId = req.userId
        const addToCartProductId = req?.body?._id

        const q = req.body.quantity

        const updateProduct = await addToCartModel.updateOne({ _id: addToCartProductId },{
            ...(q && {quantity : q}) 
        })
        res.json({
            message : "Product Update Successful" ,
            data : updateProduct ,
            success : true ,
            error : false 
        })
    }catch(err){
        res.json({
            message : err?.message || err ,
            success : false ,
            error : true 
        })
    }
}

module.exports = updateAddToCart