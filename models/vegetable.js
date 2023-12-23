const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

 const vegetableSchema = new mongoose.Schema({
    name: {type: String, require: true},
    color: {type: String, require: true},
    readyToEat: Boolean
 })

 const Vegetable = mongoose.model('Vegetable', vegetableSchema)

 module.exports = Vegetable