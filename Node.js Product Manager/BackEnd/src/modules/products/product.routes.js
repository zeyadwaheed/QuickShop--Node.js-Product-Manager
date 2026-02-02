import express from 'express'
const router = express.Router();

import { getProducts, addProduct, updateProduct, deleteProduct } from './controller/product.controller.js';

router.get("/",getProducts)

// add Product API

router.post("/addProduct",addProduct)
// update user

router.put("/updateProduct",updateProduct)

// delete user
router.delete("/deleteProduct",deleteProduct)


export default router;
