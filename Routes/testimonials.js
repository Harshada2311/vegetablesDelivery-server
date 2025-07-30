const express = require('express')

const router = express.Router();

const testimonialsController = require('../Controllers/testimonials');

router.get('/testimonials',testimonialsController.getAllTestimonials);

router.get('/testimonials/:id',testimonialsController.getTestimonialsById);


module.exports = router;