
const mongoose = require('mongoose');

const User = require('/DB/model/UserSchema');

const express = require ('express');
const UserSchema = require('../DB/model/UserSchema');

mongoose.connect('mongodb+srv://DB:MongoDB1@cluster1.0v9ll5u.mongodb.net/Users'
).then (() => {
    res,json({message: 'Database connected!'})
}).catch(() =>{
    res.json({message: 'Database failed to connect!'})
});

const register = async (req, res, next) => {
    const errors = VaidationResult(req);
    if(!errors.isEmpty()) {
        throw console.log('information is not valid.')
    }
    
    const { name, email, password } = req.body;
    
    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch(error) {
        res.json({message: 'Email already exists, try a different email.'})
    }
    if(existingUser) {
        res.json({message: 'Email already in use'})
    }
    
    try {
      await createdUser.save();
    } catch(error) {
        res.json({message: 'Register was unsuccessful'})
    }
    res.json({ Users: createdUser.toObject({ getters: true })}); //Getters removes the created id granting better accessability
    
    exports.register = register;
    exports.login = login;
}
