const express = require("express");
const basicAuth = require("basic-auth");
const PendaftarRoute = require("./routes/pendaftar.routes");
const SkpdRoute = require("./routes/skpd.routes");
const UserRoute = require("./routes/user.routes");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
// const http = require("http");
// const socketIO = require("socket.io");
// const server = http.createServer(app);
// const io = socketIO(server);

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */
// Handle socket connections
// const io = socketIO(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     credentials: true, // Allow credentials such as cookies or authorization headers
//   },
// });
// Handle socket connections

// Middleware to parse Basic Authentication credentials
const authenticate = (req, res, next) => {
  const user = basicAuth(req);
  const username = "developer"; // Replace with your desired username
  const password = "Rezky@2023"; // Replace with your desired password

  if (!user || user.name !== username || user.pass !== password) {
    res.set("WWW-Authenticate", "Basic realm=Authorization Required");
    return res.status(401).send("Unauthorized");
  }

  next();
};

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});
app.use("/uploads", express.static("uploads"));
app.use("/api/pendaftar", authenticate, PendaftarRoute);
app.use("/api/skpd", authenticate, SkpdRoute);
app.use("/api/user", authenticate, UserRoute);

// Handle socket connections
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("message", (message) => {
//     console.log(`Received message: ${message}`);
//     socket.emit("message", `Server says: ${message}`);
//   });
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// set port, listen for requests
const PORT = process.env.PORT || 8054;
const server = app.listen(PORT, () => {
  console.log(`[*] Server is running on port ${PORT}.`);
});

var io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    // credentials: true,
  },
  path: "/ws",
});

io.on("connection", (socket) => {
  console.log("[+] A user connected with id: " + socket.id);
  if (socket.auth) {
    console.log(socket.auth);
  }
  // const messageFromServer = "Hello from the server!";
  // io.emit("message", messageFromServer);
  socket.on("data_logger", (data) => {
    io.emit("data_logger", data);
    console.log("[>] 'data_logger' broadcasted");
  });

  socket.on("data_logkeluar", (data) => {
    io.emit("data_logkeluar", data);
    console.log("[>] 'data_logkeluar' broadcasted");
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("[-] A user disconnected with id: " + socket.id);
  });
});

// io.use(function (socket, next) {
//   const { token } = socket.handshake.auth;
//   if (token) {
//     try {
//       var decoded = jwt.verify(token, 'mysecretkey123');
//       console.log("[v] Authentication success with username: "+ decoded.name);
//       next();
//     } catch (err) {
//       console.log("[X] authentication failed");
//       next(new Error('Authentication error'));
//     }
//   } else {
//     console.log("[X] authentication failed");
//     next(new Error('Authentication error'));
//   }
// }).on("connection", (socket) => {
//   console.log("[+] A user connected with id: " + socket.id);
//   if (socket.auth) {
//     console.log(socket.auth);
//   }
//   // const messageFromServer = "Hello from the server!";
//   // io.emit("message", messageFromServer);
//   socket.on("data_logger", (data) => {
//     io.emit("data_logger", data);
//     console.log("[>] 'data_logger' broadcasted");
//   })

//   // Handle disconnections
//   socket.on("disconnect", () => {
//     console.log("[-] A user disconnected with id: " + socket.id);
//   });
// });
