if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const User = require('./DB/model/UserSchema.js')
const express = require("express");
const { ROLE, user } = require("./data");
const { authUser, authRole } = require("./Auth");
const projectRouter = require("./permissions/project");
const app = express();
const bcrypt = require("bcrypt"); // Importing bcrypt package
const passport = require("passport");
require("./passport-config");
const port = 4000;
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
/*
*/
const users = require("./DB/User.js");
//const users = [
//  {
//    id: "1680832174162",
//    name: "tester",
//    email: "a@a",
//    password: "$2b$10$5xwGupjQ5Uq53gRmSvdqJOxreS2x5Bx2WVWIG1RTSvbkRv1A4KpNe",
//  },
//];
const arr = [users]
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(methodOverride("_method"));
// Configuring the register post functionality
app.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/register",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Configuring the register post functionality
app.post("/register", passport.authenticate('local-signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/register', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}))

function setUser(req, res, next) {

  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
}
// Routes
app.get("/admin", authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.send("test");
});

app.get("/", checkAuthenticated, (req, res) => {
  res.render("index.ejs", { name: req.user.name });
});

app.get("/Completed_Build", checkAuthenticated, (req, res) => {
  res.render("completed builds.ejs", { name: req.user.name });
});

app.get("/Forums", checkAuthenticated, (req, res) => {
  res.render("Forums.ejs", { name: req.user.name });
});

// select end points

app.get("/Select", checkAuthenticated, (req, res) => {
  // Pc
  if (req.query.subject === "PC" &&   req.query.topic === "Gaming" && req.query.chapter === "New"  ) {
    res.render("Pc-g-n.ejs", { name: req.user.name });
  } 
else if(req.query.subject === "PC" &&   req.query.topic === "Gaming" && req.query.chapter === "Used") {
    res.render("Pc-g-u.ejs", { name: req.user.name });
  }
  else if(req.query.subject === "PC" &&   req.query.topic === "Rendering" && req.query.chapter === "Used") {
    res.render("Pc-r-u.ejs", { name: req.user.name });
  }
  else if(req.query.subject === "PC" &&   req.query.topic === "Rendering" && req.query.chapter === "New") {
    res.render("Pc-r-n.ejs", { name: req.user.name });
  }
  else if(req.query.subject === "PC" &&   req.query.topic === "producing" && req.query.chapter === "Used") {
    res.render("Pc-p-u.ejs", { name: req.user.name });
  }
  else if(req.query.subject === "PC" &&   req.query.topic === "producing" && req.query.chapter === "New") {
    res.render("Pc-p-n.ejs", { name: req.user.name });
  }
  // Laptop
  else if (req.query.subject === "laptop" &&   req.query.topic === "Gaming" && req.query.chapter === "New"  ) {
    res.render("laptop-g-n.ejs", { name: req.user.name });
  } 
else if(req.query.subject === "laptop" &&   req.query.topic === "Gaming" && req.query.chapter === "Used") {
    res.render("laptop-g-u.ejs", { name: req.user.name });
  }
  else if(req.query.subject === "laptop" &&   req.query.topic === "Rendering" && req.query.chapter === "Used") {
    res.render("laptop-r-u.ejs", { name: req.user.name });
  }
  else if(req.query.subject === "laptop" &&   req.query.topic === "Rendering" && req.query.chapter === "New") {
    res.render("laptop-r-n.ejs", { name: req.user.name });
  }
  else if(req.query.subject === "laptop" &&   req.query.topic === "producing" && req.query.chapter === "Used") {
    res.render("laptop-p-u.ejs", { name: req.user.name });
  }
  else if(req.query.subject === "laptop" &&   req.query.topic === "producing" && req.query.chapter === "New") {
    res.render("laptop-p-n.ejs", { name: req.user.name });
  }
  
//   console.log(req.query.subject);
//   console.log(req.query.topic);
//   console.log(req.query.chapter);
});


// select end point end

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");

  app.get("/info", checkAuthenticated, (req, res) => {
    res.render("partsinfo.ejs", { name: req.user.name });
  });
});
// app.get("/test", (req, res) => {
//     res.render("test");
// });
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/Build-guide", (req, res) => {
  res.render("Build-Guide.ejs");
});

app.get("/CYPP", (req, res) => {
  res.render("CYPP.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// picker routs
app.get("/CPU", checkAuthenticated, (req, res) => {
  res.render("PY_CPU.ejs", { name: req.user.name });
});

app.get("/Cooler", checkAuthenticated, (req, res) => {
  res.render("PY_COOLER.ejs", { name: req.user.name });
});

app.get("/Motherboard", checkAuthenticated, (req, res) => {
  res.render("PY_MB.ejs", { name: req.user.name });
});

app.get("/Memory", checkAuthenticated, (req, res) => {
  res.render("PY_RAM.ejs", { name: req.user.name });
});

app.get("/Storage", checkAuthenticated, (req, res) => {
  res.render("PY_STORAGE.ejs", { name: req.user.name });
});

app.get("/GPU", checkAuthenticated, (req, res) => {
  res.render("PY_GPU.ejs", { name: req.user.name });
});

app.get("/Case", checkAuthenticated, (req, res) => {
  res.render("PY_CASE.ejs", { name: req.user.name });
});

app.get("/PSU", checkAuthenticated, (req, res) => {
  res.render("PY_PS.ejs", { name: req.user.name });
});

app.get("/Monitor", checkAuthenticated, (req, res) => {
  res.render("PY_MONITOR.ejs", { name: req.user.name });
});

// End Routes

app.delete("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
