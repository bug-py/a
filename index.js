const express=require("express")
const app=express()
const http=require("http").createServer(app)
const io=new require("socket.io")(http)
app.use("/public",express.static(__dirname+"/assets"))
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
    
})
io.on("connection",socket=>{
    console.log("ici")
    socket.on("message",json=>{
        io.emit("message",{
         ms:Date.now()-json.date,
         message:json.message,
         name:"ok",
         date:json.date
        })
    })
    socket.on("diconnect",()=>{
     console.log("parti")
    })
})
http.listen(10000)