const express = require('express')
const app = express()

const mysql = require('mysql2')

const cors = require('cors')


const query = mysql.createConnection({
    host : "localhost",
    user: 'root',
    database: 'shopping',

})

// middleware to transfer buffer data to json
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    query.execute("select * from products",(error,data)=>{
        res.json({message:"success",data})
    })
})

// add Product API

app.post("/addProduct",(req,res)=>{
    let {name,description,price} = req.body; 
    console.log(req.body);
    
    query.execute(`insert into products (name,description, price) values ("${name}","${description}","${price}")`,(err,data)=>{
        if (err){
            res.json({err})
        } else {
            console.log(data);
            if(data.affectedRows){
                res.json({message:"success"})
            }else{
                res.json({message:"User not added "})
            }
        }
    });

})
// update user

app.put("/updateProduct",(req,res)=>{
    let {id,name} = req.body
    query_update = `update products set name = '${name}'where id = '${id}'`
    query.execute(query_update,(err,data)=>{
        if(err){
            res.json({err})
        }else{
            res.json({message : "success",Updateddata : data})

        }
    })
})

// delete user
app.delete("/deleteProduct",(req,res)=>{const { groups: { extension } } = 'file.txt'.match(/\.(?<extension>\w+)/)
    let{id} = req.body;
    delete_query = query.execute(`delete from products where id = "${id}"`,(err,data)=>{
        if(err){
            res.json({message : err})
        }
        else{
            res.json({message : "success",data : data})
        }
    })
})



// // get users starts with a and age less than 30 

// app.get("/getUser",(req,res)=>{
//     // url for running query http://localhost:3000/getUser?name=a&&age=30
//     let {name,age} = req.query;
//     query_get = `select * from users where name like '${name}%' and age < ${age}`
//     query.execute(query_get,(err,data)=>{
//         if(err){
//             res.json({message : err})
//         }
//         else{
//             res.json({data})
//         }
//     })

// })

// // get list of users using ids by using IN

// app.get("/getUser2",(req,res)=>{
//     let {id} = req.query;
//     query_get = `select * from users where id in (${id})`
//     query.execute(query_get,(err,data)=>{
//         if(err){
//             res.json({message : err})
//         }
//         else{
//             res.json({data})
//         }
// })
// })

// // get user with its product using inner join (intersection)

// app.get("/getUser3",(req,res)=>{
//     query_get = `select * from users inner join products on users.id = products.userId`
//     query.execute(query_get,(err,data)=>{
//         if(err){
//             res.json({message : err})
//         }
//         else{
//             res.json({data})
//         }
// })
// })

// // update products owner only

// app.put("/updatePro",(req,res)=>{
//     let {id,userId,product_name} = req.body;
//     query_update = `update products set product_name = '${product_name}' where id = ${id} and userId = ${userId}`
//     query.execute(query_update,(err,data)=>{
//         if(err){
//             res.json({message : err})
//         }
//         else{
//             if(data.affectedRows){
//                 res.json({message : "Updated Succesfully",data}) 
//             }else{
//                 res.json({message : "Can't be accessed"});
//             }
//         }
// })
// })

app.listen(3000,()=>{
    console.log("Server is running!!");
    
})