import express from 'express'
import cors from 'cors'
import productRoutes from './src/modules/products/product.routes.js'

const app = express();



// middleware to transfer buffer data to json
app.use(express.json());
app.use(cors())

app.use("/products",productRoutes)



app.listen(3000,()=>{
    console.log("Server is running!!");
    
})