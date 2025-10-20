 const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
 
const app = express();
app.use(cors());
app.use(express.json());
 







 const url = 'mongodb+srv://dattatreyagokhale_db_user:MAkO0xrpeCxp3FP2@cluster0.ixnbsd0.mongodb.net/datta?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);
let users; // ✅ declare here

async function connectDB() {
  await client.connect();
  const db = client.db("datta");
  users = db.collection("users");
  console.log("✅ Connected to MongoDB");
}

app.post("/add", async (req, res) => {
  const name = (req.body.first ) // ✅ sanitize
  const note=(req.body.first1 ) 

 const data = await users.findOne({ title:name });

  if (data) {
    res.json({ success: false, text: "title already exists" });
  } else {
    await users.insertOne({ title:name,note:note });
    res.json({ success: true, text: "title added " });
  }
});


app.get("/get", async (req, res) => {

let data=await users.find({}).toArray();
res.json(data)


});

app.delete("/remove", async (req, res) => {

 const id=(req.body.id )
const { ObjectId } = require("mongodb");


 await users.deleteOne({_id:new ObjectId(id)});
 res.json({success:true,msg:" 1 item deleted "})

});


app.post("/getupdate", async (req, res) => {
let title=(req.body.update);


let data=await users.find({title:title}).toArray();
  if (data.length === 0) {
  res.json({ success: false });
} else {
  res.json({ success: true, data });
}


});


app.put('/update',async(req,res)=>{
const otitle=(req.body.update)
const ntitle=(req.body.tosetinput)
const nnote=(req.body.tosetarea)


let data=await users.updateOne({title:otitle},{$set:{ title: ntitle, note: nnote }})
 if (data.matchedCount > 0) {
  res.json({ success: true });
} else {
  res.json({ success: false });
}




})






const PORT = 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
