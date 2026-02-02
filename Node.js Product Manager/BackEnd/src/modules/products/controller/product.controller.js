import mysql from 'mysql2'
import query from '../../../../database/connection.js'
export const getProducts = (req,res)=>{
    query.execute("select * from products",(error,data)=>{
        res.json({message:"success",data})
    })
}



export const addProduct = (req,res)=>{
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

}

export const updateProduct = (req,res)=>{
    let {id,name} = req.body
    query_update = `update products set name = '${name}'where id = '${id}'`
    query.execute(query_update,(err,data)=>{
        if(err){
            res.json({err})
        }else{
            res.json({message : "success",Updateddata : data})

        }
    })
}

export const deleteProduct = (req,res)=>{const { groups: { extension } } = 'file.txt'.match(/\.(?<extension>\w+)/)
    let{id} = req.body;
    delete_query = query.execute(`delete from products where id = "${id}"`,(err,data)=>{
        if(err){
            res.json({message : err})
        }
        else{
            res.json({message : "success",data : data})
        }
    })
}

export default query;