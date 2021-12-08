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

module.exports = model('Film', filmSchema)