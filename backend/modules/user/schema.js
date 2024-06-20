const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({

    name: {
        type: "String",
        required: true   
    },
    contact: {
        type: "String",
        required: true,
        unique:true,
    },
    gender: {
        type: "String",
        enum: ["male","female","other"],
    },
    email: {
        unique:true,
        type: "String",
        required: true,
    },
    username: {
        type: "String",
        required: true,
        unique:true,
    },
    password: {
        type: "String",
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        required: true,
        enum: ['user', 'admin']
    },
    // profileImage: {
    //     type: "String",
    //     default: '', 
    // },
    
}, { timestamps: true });

module.exports = mongoose.model('User',UserSchema);