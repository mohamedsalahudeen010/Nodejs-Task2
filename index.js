import express from "express"
import {MongoClient} from "mongodb"
import obj from "mongodb"

const objectId=obj.ObjectId;



import dotenv from "dotenv"
dotenv.config()

const URL=process.env.MONGO_URL
const app=express();
app.use(express.json())
async function createConnection(){
const client=new MongoClient(URL)
client.connect()
console.log("cliient connected")
return client
}

const client=await createConnection();



const PORT=process.env.PORT;

console.log(PORT)

app.listen(PORT,()=>{console.log(`1.port ${PORT} is Running`)})

//Get rooms from data
app.get("/room",async(req,res)=>{
    let query=req.query;
    if(req.query.capacity){
        req.query.capacity=+req.query.capacity
    }else if(req.query.roomNo){
        req.query.roomNo=+req.query.roomNo
    }else if(req.query.booked){
        const {booked}=req.query
        console.log(booked)
        query={"booked":true}
        console.log(query)
    }
    console.log(query)
    const room=await client
    .db("ROOM")
    .collection("room")
    .find(query)
    .toArray()

    res.status(200).send(room)
})

//add rooms
app.post("/room",async(req,res)=>{
    const data=req.body
    const room=await client
    .db("ROOM")
    .collection("room")
    .insertOne(data)

    res.send(room)
})

//add Many rooms
app.post("/room/many",async(req,res)=>{
    const data=req.body
    const room=await client
    .db("ROOM")
    .collection("room")
    .insertMany(data)
    res.send(room)
})

//Update Room
app.put("/room/:id",async(req,res)=>{
const {id}=req.params;
const data=req.body;
const room=await client
.db("ROOM")
.collection("room")
.updateOne({_id:new objectId(id)},{$set:data})
res.send(room)
})

//Delete room
app.delete("/room/:id",async(req,res)=>{
    const {id}=req.params;
    const room=await client
    .db("ROOM")
    .collection("room")
    .deleteOne({_id:new objectId(id)})
    res.send(room)
    })

    //Delete All
app.delete("/room",async(req,res)=>{
        const {id}=req.params;
        const query=req.query;
        if(req.query.capacity){
            req.query.capacity=+req.query.capacity
        }
        const room=await client
        .db("ROOM")
        .collection("room")
        .deleteMany(query)
        res.send(room)
        })

//Get Customers
app.get("/room/cus",async(req,res)=>{
    
    console.log("customer")
    const query={"booked":true}
    const room=await client
    .db("ROOM")
    .collection("room")
    .find(query).toArray()
    res.status(200).send(room)     
})



// .forEach(function(customer){
//     print(`Name : ${customer.customerName},
//     Room No : ${customer.roomNo},
//     Date : ${customer.Date},
//     Start Time : ${customer.start_time},
//     End Time : ${customer.end_time}
//     `)})

// //add a Customer
// app.post("/customers",async(req,res)=>{
//     const data=req.body
//     const cus=await client
//     .db("ROOM")
//     .collection("customers")
//     .insertOne(data)

//     res.send(cus)
// })

// //add Many Customers
// app.post("/customers/many",async(req,res)=>{
//     const data=req.body
//     const cus=await client
//     .db("ROOM")
//     .collection("customers")
//     .insertMany(data)
//     res.send(cus)
// })


// //Update Customer
// app.put("/customers/:id",async(req,res)=>{
//     const {id}=req.params;
//     const data=req.body;
//     const cus=await client
//     .db("ROOM")
//     .collection("customers")
//     .updateOne({_id:new objectId(id)},{$set:data})
//     res.send(cus)
//     })
    
//     //Delete Customer
//     app.delete("/customers/:id",async(req,res)=>{
//         const {id}=req.params;
//         const cus=await client
//         .db("ROOM")
//         .collection("customers")
//         .deleteOne({_id:new objectId(id)})
//         res.send(cus)
//         })