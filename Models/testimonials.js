const mongoose = require('mongoose');
const testimonialsSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }

});

const Testimonials = mongoose.model('Testimonials', testimonialsSchema);
module.exports = Testimonials;
