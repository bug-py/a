const express=require("express")
const app=express()
const http=require("http").createServer(app)
const io=new require("socket.io")(http)
let user=0;
app.use("/public",express.static(__dirname+"/assets"))
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
    
})
io.on("connection",socket=>{
    user++
    nom=user
    console.log("ici")
    socket.on("message",json=>{
        io.emit("message",{
         ms:Date.now()-json.date,
         message:json.message,
         name:`Invité ${user}`,
         date:json.date
        })
    })
    socket.on("diconnect",()=>{
     user--
     console.log("parti")
    })
})
http.listen(10000)