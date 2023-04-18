const express = require("express");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const expressSession = require("express-session")

const app = express();

//Sets our view engine to load files ending in .ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;

app.use(expressSession({
  secret:"secret key"
}))

app.listen(PORT, () => {
  console.log("App listening on port ", PORT);
});

app.get("/", (req, res) => {
  //res.sendFile(path.resolve(__dirname + "/views/", "index.html"));
  console.log(req.session)

  let beans = req.session.beans;
  res.render("index", {beans})
});

app.post("/update-index", (req, res)=>{
  console.log(req.body);

  req.session.beans = req.body;

  res.redirect("/index")
})

app.get("/profile", (req, res) => {
  console.log(req.session)

  let user = req.session.user;
  res.render("profile", {user})
});

app.post("/update-profile", (req, res)=>{
  console.log(req.body);

  req.session.user= req.body;

  res.redirect("/profile")
})

app.get("/slide-show", (req, res) => {
  res.render("slide-show");
});

app.get("/terms", (req, res) => {
  res.render("terms");
});

app.get("/snake", (req, res) => {
  res.render("snake");
});

