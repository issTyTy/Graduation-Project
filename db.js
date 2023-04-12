var MongoClient = require('mongodb').MongoClient;  
var url = "mongodb+srv://TyTy:mody2000@cluster0.hwyb70a.mongodb.net/test";  
MongoClient.connect(url, function(err, db) {  
if (err) throw err;  
console.log("Database created!");  
db.close();  
});  