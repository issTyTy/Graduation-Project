var MongoClient = require('mongodb').MongoClient;  
var url = "mongodb+srv://Gloomy:c0tt0nc4ndie@cluster1.0v9ll5u.mongodb.net/test";  
MongoClient.connect(url, function(err, db) {  
if (err) throw err;  
console.log("Database created!");  
db.close();  
});  