const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: {
     type:String, 
     required: true
   },
  description: {
     type: String,
     required: true
   },
  img: {
     type:String,
     required: true
   },
  price: {
     type: String,
     required: true
   },
  category: {
     type: String,
     required: true
   },
  city: {
    type: Array,
      default: [],
      required: true
   },
  reviews: {
      type: Array,
      default: [],
      required: true
   }
});
module.exports = mongoose.model('ProductVege', productSchema);
