if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}


// Importing Libraies that we installed using npm
const express = require("express")
const app = express()
const bcrypt = require("bcrypt") // Importing bcrypt package
const passport = require("passport")
const initializePassport = require("./passport-config")
const port = 4000;
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
``;

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )



const users = []

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize()) 
app.use(passport.session())
app.use(methodOverride("_method"))

// Configuring the register post functionality
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

// Configuring the register post functionality
app.post("/register", checkNotAuthenticated, async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(), 
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        console.log(users); // Display newly registered in the console
        res.redirect("/login")
        
    } catch (e) {
        console.log(e);
        res.redirect("/register")
    }
})
// Routes
app.get('/', checkAuthenticated, (req, res) => {
    res.render("index.ejs", {name: req.user.name})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs")
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")

app.get('/info', checkAuthenticated, (req, res) => {
        res.render("partsinfo.ejs", {name: req.user.name})
    })
})
app.get("/test", (req, res) => {
    res.render("ok");
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
// app.get("/info", (req, res) => {
//     res.render("partsinfo.ejs");
// });

  // End Routes


// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
//   })

app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});