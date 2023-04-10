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
  res.render("index");
});

app.get("/profile", (req, res) => {
  console.log(req.session)

  let user = req.session.user;
  res.render("profile", {user})
});

app.get("/slide-show", (req, res) => {
  res.render("slide-show");
});

app.post("/update-profile", (req, res)=>{
  console.log(req.body);

  req.session.user= req.body;

  res.redirect("/profile")
})

app.get("/terms", (req, res) => {
  res.render("terms");
});