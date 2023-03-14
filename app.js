if(process.env.NODE_ENV !== "production") {
require("dotenv").config()
}

// Importing Libraies installed using npm

const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport-config");
const port = 4000;
const flash = (require("express-flash"))
const session = (require("express-session"))

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
``;
app.use(express.static(path.join("public")));

initializePassport(
  passport,
  email => users.find(user => user.email ===  email),
  id => users.find(user =>user.if === id)
  )

const users = [];

app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
  secret: process.env.SECCRET_KEY,
  resave: false, //we wont resave the session variable if nothig is changed
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


app.get("/test", (req, res) => {
  res.json("ok");
});

//configuring the register post functionaltiy
app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}))
//configuring the register post functionaltiy

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    });
    console.log(users);
    res.redirect("/login");
  } catch (err) {
    res.redirect("/register");
  }
});

//for auto refresh
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// mongoose connection
// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(
//     "mongodb+srv://TyTy:mody2000@cluster0.hwyb70a.mongodb.net/all-data?retryWrites=true&w=majority"
//   )
//   .then((result) => {
//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// HTTP routing

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/products/cpu/", (req, res) => {
  res.render("Cpu");
});

app.get("/products/cpu-cooler/", (req, res) => {
  res.render("Cpu Cooler");
});

app.get("/products/motherboard/", (req, res) => {
  res.render("Motherboards");
});

app.get("/products/memory/", (req, res) => {
  res.render("Memory");
});

app.get("/products/internal-hard-drive/", (req, res) => {
  res.render("Storage");
});

app.get("/products/video-card/", (req, res) => {
  res.render("Video Card");
});

app.get("/products/case/", (req, res) => {
  res.render("Cases");
});

app.get("/products/power-supply/", (req, res) => {
  res.render("Power Supply");
});

app.get("/products/os/", (req, res) => {
  res.render("Operating System");
});

app.get("/products/monitor/", (req, res) => {
  res.render("Monitor");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/info", (req, res) => {
  res.render("partsinfo.ejs");
});

//  404 Erorr
app.use((req, res) => {
  res.status(404).send("Whoops cant find that!");
});

// End Routes

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
