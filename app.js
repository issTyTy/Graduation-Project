//  to controll ur website

const express = require("express");
const app = express();
const port = 5000;
app.set('view engine', 'ejs')
app.use(express.static('public'))

//for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); 


// mongoose connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
 mongoose.connect("mongodb+srv://TyTy:mody2000@cluster0.hwyb70a.mongodb.net/all-data?retryWrites=true&w=majority")
  .then( result => {
    app.listen(3000);
  })
  .catch( err => {
    console.log(err);
  }); 



//HTTP routing
app.get("/", (req, res) => {
  res.redirect("/builds");
 
});

app.get("/builds", (req, res) => {
  res.send("welcome ♥ ");

});


app.get("/html", (req, res) => {
  res.render("index")
});


//  404 
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
