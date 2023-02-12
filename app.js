//  to controll ur website

const express = require("express");
const app = express();
const port = 5000;
app.set('view engine', 'ejs')
app.use(express.static('public'))








app.get("/", (req, res) => {
  res.redirect("/alihaasan");
 
});

app.get("/alihaasan", (req, res) => {
  res.send("wellcome ♥ ");
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
