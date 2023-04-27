
const mongoose = require('mongoose');

const User = require('/DB/model/UserSchema');
const newUser = User;
const express = require ('express');
const UserSchema = require('../DB/model/UserSchema');

mongoose.connect('mongodb+srv://TyTy:mody2000@cluster0.hwyb70a.mongodb.net/project'
).then (() => {
    res,json({message: 'Database connected!'})
}).catch(() =>{
    res.json({message: 'Database failed to connect!'})
});

const register = async (req, res, next) => {
    const errors = VaidationResult(req);
    if(!errors.isEmpty()) {
        return next(
            console.log('information is not valid.')
        ); 
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
    const createdUser = new User({
        id,
        name,
        email,
        password,
    });

    try {
      await createdUser.save();
    } catch(error) {
        res.json({message: 'Register was unsuccessful'})
    }
    res.json({ Users: createdUser.toObject({ getters: true })}); //Getters removes the created id granting better accessability
    
}

const login = async (req, res, next) => {
    const {email, password} = req.body
    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch(error) {
        res.json({message: 'Email already exists, try a different email.'})
    }
    if(existingUser) {
        res.json({message: 'Email already in use'})
    }
    if(!existingUser || existingUser.password !== password) {
         res.json({message: 'email or password is incorrect!}'});
        return(next);
    }
}

exports.register = register;
exports.login = login;