const { timeStamp } = require("console");
const express = require("express");
const server = express();
const fs = require("fs");

server.use(
  express.json({
    verify: (request, reponse, buffer, encoding) => {
      try {
        JSON.parse(buffer);
      } catch (e) {
        console.log("Deu merda!!!");
        Response.status(400).send("Invalid JSON");
      }
    },
  })
);

server.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

server.get("/agenda", (request, response) => {
  let database = fs.readFileSync("dados.json", "utf8");
  database = JSON.parse(database);
  console.log("Client Call");
  response.json(database);
});

server.post("/agenda", (request, response) => {
  // console.log(request.body);
  const { timestamp, appt } = request.body; //descontruindo body em duas variaveis
  //lendo database
  let database = fs.readFileSync("dados.json", "utf8");
  database = JSON.parse(database); // tranformando string json em object

  //atualizando database
  database[timestamp] = appt;

  //salvando batabase no json
  fs.writeFileSync("dados.json", JSON.stringify(database));
  response.status(200).json(database);
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
