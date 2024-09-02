const express = require('express')

const router = express.Router()

const userSignInController = require('../controller/userSignIn')
const userSignUpController = require('../controller/userSignUp')
const userDetailsController = require('../controller/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/userLogout')
const allUsers = require('../controller/allUsers')
const updateUser = require('../controller/updateUser')
const UploadProductController = require('../controller/uploadProduct')
const getProductController = require('../controller/getProduct')
const updateProductController = require('../controller/updateProduct')
const getCategoryProduct = require('../controller/getCategoryProduct')
const getCategoryWiseProduct = require('../controller/getCategoryWiseProduct')
const getProductDetails = require('../controller/getProductDetails')
const addToCartController = require('../controller/addToCartController')
const countAddToCart = require('../controller/countAddToCart')
const addToCartViewProduct = require('../controller/addToCartViewProduct')
const updateAddToCart = require('../controller/updateAddToCart')
const deleteAddToCartProduct = require('../models/delAddToCartPdt')
const searchProduct = require('../controller/searchProduct')
const filterController = require('../controller/filterProduct')




router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout)

//admin-panel
router.get("/all-user", authToken, allUsers)
router.post("/update-user", authToken, updateUser)

//upload product
router.post("/upload-product", authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)

//categorywise upload in user end
router.post("/category-Product", getCategoryWiseProduct)
//product detail
router.post("/product-details", getProductDetails)

//Add To Cart

router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCart", authToken, countAddToCart)
router.get("/cart-product-view", authToken, addToCartViewProduct)

//Update add to cart product
router.post("/update", authToken , updateAddToCart)
// Delete from cart 
router.post("/delete", authToken, deleteAddToCartProduct)
//Search Product
router.get("/search", searchProduct)
//Filter Product 
router.post("/filter-product", filterController)




module.exports = router