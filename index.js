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
    user+=1
    nom=user
    console.log("ici")
    socket.on("message",json=>{
        io.emit("message",{
         ms:Date.now()-json.date,
         message:json.message,
         name:`Invité ${nom}`,
         date:json.date
        })
    })
    socket.on("diconnect",()=>{
     user-=1
     console.log("parti")
    })
})
http.listen(10000)