const mongoose = require('mongoose');

const User = require('./model/UserSchema');

mongoose.connect('mongodb+srv://Gloomy:c0tt0nc4ndie@cluster1.0v9ll5u.mongodb.net/Users?retryWrites=true&w=majority'
).then (() =>{
    console.log('Database connected!')
}).catch(() =>{
    console.log('Database failed to connect!')
});

const newUser = async(req,res,next) =>{
    
    const newUser = new User({
       id: req.body.id,
        name: req.body.name,
       email: req.body.email,
       password: hashedPassword 
   });
   
   try {
       const result = userdb.collection('Users').save();
    } catch(error) {
        res.json({message: 'could not save user inputs.'})
    }
    
    await newUser.save();

}


const getUser = async(req, res, next) =>{

    try{
        const result = userdb.collection('Users').find().toArray();
    } catch(error) {
        res.json({message: 'could not find required data.'})
    }
}
exports.newUser = newUser;
exports.getUser = getUser