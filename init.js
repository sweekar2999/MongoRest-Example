const mongoose = require('mongoose');
const Chat=require("./models/chat.js");
main().then(()=>console.log("success"))
.catch(err => console.log(err));


const chatData = [
    {
        from: "Alice",
        msg: "Hello, how are you?",
        to: "Bob",
        createdAt: new Date("2024-07-20T10:00:00Z")
    },
    {
        from: "Bob",
        msg: "I'm good, thanks! How about you?",
        to: "Alice",
        createdAt: new Date("2024-07-20T10:01:00Z")
    },
    {
        from: "Charlie",
        msg: "Did you finish the project?",
        to: "David",
        createdAt: new Date("2024-07-20T10:02:00Z")
    },
    {
        from: "David",
        msg: "Yes, I did. I'll send it to you.",
        to: "Charlie",
        createdAt: new Date("2024-07-20T10:03:00Z")
    },
    {
        from: "Alice",
        msg: "Do you want to meet up later?",
        to: "Charlie",
        createdAt: new Date("2024-07-20T10:04:00Z")
    },
    {
        from: "Charlie",
        msg: "Sure, what time?",
        to: "Alice",
        createdAt: new Date("2024-07-20T10:05:00Z")
    },
    {
        from: "Bob",
        msg: "Don't forget the meeting tomorrow.",
        to: "Alice",
        createdAt: new Date("2024-07-20T10:06:00Z")
    },
    {
        from: "Alice",
        msg: "Thanks for the reminder!",
        to: "Bob",
        createdAt: new Date("2024-07-20T10:07:00Z")
    },
    {
        from: "David",
        msg: "Can you help me with this issue?",
        to: "Charlie",
        createdAt: new Date("2024-07-20T10:08:00Z")
    },
    {
        from: "Charlie",
        msg: "Sure, I'll take a look.",
        to: "David",
        createdAt: new Date("2024-07-20T10:09:00Z")
    }
];
Chat.insertMany(chatData).then((res)=>console.log(res));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
