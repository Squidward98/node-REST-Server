const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let roleValues = {

    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} it is not a valid role...',

}
let Schema = mongoose.Schema;
let userSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roleValues
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

userSchema.plugin(uniqueValidator, {message: '{PATH} must be unique...'});

module.exports = mongoose.model('User', userSchema);
