const jsonServer = require("json-server");
// const express = require("express");
const server = jsonServer.create()
const router = jsonServer.router("./db.json");
// const bodyParser = require("body-parser");
const middlewares = jsonServer.defaults();
// const server = express();

// server.use(bodyParser.urlencoded());
server.use(middlewares);

/* server.use("/user", (req, res) => {
  console.log(req.query);
}); */

/* router.render = (req, res) => {
  console.log(res.locals.data)
  if (
    res.locals.data.name == req.query.name &&
    res.locals.data.pwd == req.query.pwd
  ) {
    res.json({
      code: 200
    });
  } else {
    res.json({
      code: 400
    });
  }
}; */

server.use(router);
server.listen(8081, () => {
  console.log("JSON Server is running at localhost:8081");
});
