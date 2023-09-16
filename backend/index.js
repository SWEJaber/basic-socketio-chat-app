// 3rd party module from npm
const express = require('express');
const app = express();
const socketIO = require('socket.io');


// How the docs do it
const expressServer = app.listen(8000);
const io = socketIO(expressServer, 
{
    cors: { origin: "http://localhost:3000" }
});


let numConnections = 0;

// This is the entire socket server
io.on('connection', socket =>
{
    numConnections++


    console.log("numConnections: ", numConnections);
    console.log(socket.id, "has connected");

    socket.emit("messageFromServer", { data: "Welcome to the server!" })

    socket.on("clientMessage", dataFromClient =>
    {
        console.log("clientMessage: ", dataFromClient);

        io.emit("newMessageToClients", dataFromClient)
    })

    socket.on("disconnect", (reason) => {
        numConnections--
        console.log("disconnect: ", socket.id, reason);
      });
})
