const mongoose = require('mongoose');
const { authUser } = require('../Auth');

mongoose.connect('mongodb+srv://Gloomy:c0tt0nc4ndie@cluster1.0v9ll5u.mongodb.net/test'
).then (() =>{
    console.log('Database connected!')
}).catch(() =>{
    console.log('Database failed to connect!')
});

const newUser = async(req,res,next) =>{
    
    const authUser = newUser();
    const newUser = new arr({
       name: req.body.name,
       email: req.body.email,
       password: req.body.password    
   });

    const result = await newUser.save();


res.json(newUser);

}


const getUser = async(req, res, next) =>{

    try{
        const result = userdb.collection('users').find().toArray();
    } catch(error) {
        res.json({message: 'could not find required data.'})
    }
}
exports.newUser = newUser;
exports.getUser = getUser