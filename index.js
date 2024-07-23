const mongoose = require('mongoose');
const express = require("express");
const path = require("path");
var methodOverride = require('method-override');
const app = express();
const Chat = require("./models/chat.js");
let port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.listen(port, () => {
    console.log("connected");
});

app.get("/", (req, res) => {
    res.send("home page");
});

main().then(() => console.log("success"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
//another method to handle errors in async functions
function asyncwrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((error)=>next(err));
    }
}

app.get("/chats", async (req, res, next) => {
    try {
        let data = await Chat.find({});
        res.render("chat", { data });
    } catch (err) {
        next(err);
    }
});

app.get("/chats/new", (req, res) => {
    res.render("newChat");
});

app.post("/chats",asyncwrap( async (req, res, next) => {
    try {
        const { from, msg, to } = req.body;
        let createdAt = new Date();
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
        next(error);
    }
}));

// Edit
app.get("/chats/:id/edit", async (req, res, next) => {
    try {
        let { id } = req.params;
        console.log(id);
        let data = await Chat.findById(id);
        console.log(data);
        res.render("edit", { data });
    }
    catch (err) {
        next(err);
    }
});

app.put("/chats/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        console.log(id);
        let { msg: newMsg } = req.body;
        console.log(req.body);
        let newChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
        console.log(newChat);
        res.redirect("/chats");
    }
    catch (error) {
        next(error);
    }
});

app.delete("/chats/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        await Chat.findByIdAndDelete(id);
        res.redirect("/chats");
    }
    catch (err) {
        next(err);
    }
});

app.use((err, req, res, next) => {
    let { status = 500, message = "Default Error" } = err;
    res.status(status).send(message);
});
