const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foodSchema = new Schema({
    name:String,
    type:String,
    quantity:String,
    flavour:String,

},{timestamps:true});

const Food = mongoose.model('Pizza',foodSchema);
module.exports=Food;