const { Schema, model } = require('mongoose')

const filmSchema = new Schema({
    id: String,
    name: String,
    img: String,
    desctiption: String,
    tag: Array
}, {
    timestamps: true,
    versionKey: false
})

const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true  
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255    
    },
    mobile: {
        type:  String,
        required: true,
        minlength: 5,
        maxlength: 20  
    },
    age: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 3 
    } ,
    password: {type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}, {collection: 'users'})

const User= model('users', userSchema);
const Film= model('Film', filmSchema)

module.exports={User, Film};

