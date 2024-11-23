// This will be our application entry. We'll setup our server here.
import http from "http";
import app from "../app.js";

const port = +process.env.PORT || 8000;
app.set("port", port);
console.log("\n... running on port ", port, " 🔥 \n");

const server = http.createServer(app);
server.listen(port);

