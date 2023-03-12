// Importing Libraies installed using npm

const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport-config");
const port = 4000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());``
app.use(express.static(path.join('public')));


const users = [];

app.use(express.urlencoded({ extended: false }));

app.get("/test", (req, res) => {
  res.json("ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log(req.body.password);
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    });
    // res.redirect("/login")
    console.log(users);
  } catch (e) {
    res.redirect("/register");
  }
  res.json("ok");
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
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://TyTy:mody2000@cluster0.hwyb70a.mongodb.net/all-data?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

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
