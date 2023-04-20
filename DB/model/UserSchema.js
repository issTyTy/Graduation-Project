import mongoose from "mongoose";

const uniqueValidator = require('mongoose-unique-validator')

const mongoose = require(mongoose);

mongoose.connect('mongodb+srv://Gloomy:c0tt0nc4ndie@cluster1.0v9ll5u.mongodb.net/test'
).then(() => {
    console.log('Data Schema connected!')
}).catch(() => {
    console.log('Data Schema did not connect!')
})

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Users', UserSchema);