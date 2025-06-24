const express = require("express"); // Access
const socket = require("socket.io");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express(); //Initialized and server ready

app.use(express.static("public"));

app.get("/create", (req, res) => {
    const id = uuidv4();
    res.redirect(`/${id}`);
});

app.get("/", (req, res) => {
    res.redirect("/create");
});

app.get("/:board", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});



let port = process.env.PORT || 3000;
let server = app.listen(port, () => {
    console.log("Listening to port" + port);
})

let io = socket(server);

io.on("connection", (socket) => {
    const boardId = socket.handshake.query.boardId;
    if (boardId) {
        socket.join(boardId);
    }
    console.log("Made socket connection");
    // Received data
    socket.on("beginPath", (data) => {
        // data -> data from frontend
        // Now transfer data to all connected clients in the room
        if (boardId) io.to(boardId).emit("beginPath", data);
    })
    socket.on("drawStroke", (data) => {
        if (boardId) io.to(boardId).emit("drawStroke", data);
    })
    socket.on("redoUndo", (data) => {
        if (boardId) io.to(boardId).emit("redoUndo", data);
    })
})


module.exports = server;
