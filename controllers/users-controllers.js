
const mongoose = require('mongoose');

const Users = require('../DB/model/UserSchema');

const express = require ('express');
const { name } = require('ejs');


const register = async (req, res, next) => {
    const errors = VaidationResult(req);
    if(!errors.isEmpty()) {
        throw console.log('information is not valid.')
    }
    
    const { name, email, password } = req.body;
    
    let existingUser
    try {
        existingUser = await Users.findOne({ email: email })
    } catch(error) {
        console.log('Email already exists, try a different email.')
    }
    if(existingUser) {
        console.log('Email is in use')
    }
    
    const createdUser = new Users({
        name,
        email,
        password,
    });
    
    try {
      await createdUser.save();
    } catch(error) {
        console.log('register was unsuccessful')

    }
    res.status(201).json({ Users: createdUser.toObject({ getters: true })}); //Getters removes the underscore in front of the created id
    
}
