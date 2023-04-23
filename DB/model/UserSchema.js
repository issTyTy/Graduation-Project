const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, bcrypt: true },
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Users', UserSchema);