import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app)
console.log(process.env.SOCKET_CORS_ORIGIN)

const io = new Server(server,{
    cors:{
        origin:[process.env.SOCKET_CORS_ORIGIN,"http://192.168.28.140:3000"],
        methods:["GET","POST"]
    }
})

export function getReceiverSocketId(recieverId){
    return userSocketMap[recieverId]
}

const userSocketMap={} // {userId:socketId}

io.on("connection",(socket)=>{
    // console.log("a user is connected",socket.id);
    const userId = socket.handshake.query.userId

    if (userId !== undefined){
        userSocketMap[userId]= socket.id
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        // console.log("user disconnected",socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
       
    })
})

export {app,io,server}