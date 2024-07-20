const mongoose = require('mongoose');
const express=require("express");
const path=require("path");
var methodOverride = require('method-override');
const app=express();
const Chat=require("./models/chat.js");
let port=8080;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.listen(port,()=>{
    console.log("connected");
})
app.get("/",(req,res)=>{
    res.send("home page");
})


main().then(()=>console.log("success"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
app.get("/chats",async (req,res)=>{
     let data= await Chat.find({});
    res.render("chat",{data});
})
app.get("/chats/new",(req,res)=>{
    res.render("newChat");
})
app.post("/chats",async (req,res)=>{
    try {
        const { from, msg, to } = req.body;
        let createdAt=new Date();
        const newChat = new Chat({
            from,
            msg,
            to,
            createdAt
        });
        await newChat.save();

        console.log('Chat saved:', newChat);
        res.redirect('/chats'); 
    } catch (error) {
        console.error('Error saving chat:', error);
        res.status(500).send('Internal Server Error');
    }
})
//EDit
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    console.log(id);
    let data= await Chat.findById(id);
    console.log(data);
    res.render("edit",{data});
});
app.put("/chats/:id", async (req,res)=>{
    let {id}=req.params;
    console.log(id);
    let {msg:newMsg}=req.body;
    console.log(req.body);
    let newChat= await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
     console.log(newChat);
  res.redirect("/chats");
})
app.delete("/chats/:id",async (req,res)=>{
    let{id}=req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");

})