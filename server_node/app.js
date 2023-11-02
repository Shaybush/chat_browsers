// express library with all abilities
const express = require("express");
// can manipulates with urls
const path = require("path");
// aloud us to create service
const http = require("http");

const { routesInit } = require("./routes/configRoutes");
const { createSocket } = require("./sockets/appSocket");

const app = express();

app.use(express.json());
// configure public to be public
app.use(express.static(path.join(__dirname, "public")));
// function that responsible to set all needed route
routesInit(app);

const server = http.createServer(app);

const port = process.env.PORT || 3001;
server.listen(port);
createSocket(server);
