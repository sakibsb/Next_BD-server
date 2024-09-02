const addToCartModel = require("./cartProduct")

const deleteAddToCartProduct = async(req,res)=>{
    try{
        const currentUserId = req.userId
        const addToCartProductId = req.body._id

        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId } )
        res.json({
            data: deleteProduct ,
            message : "Product Delete !" ,
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

module.exports = deleteAddToCartProduct