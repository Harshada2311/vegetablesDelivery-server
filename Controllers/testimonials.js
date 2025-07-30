//const testimonialsList = require('../Models/testimonials.json')
const testimonialsList = require('../Models/testimonials');
const mongoose = require('mongoose');

exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await testimonialsList.find();
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getTestimonialsById = async (req,res)=>{
  const testimonialsId = req.params.id

  const testimonials = await testimonialsList.findById(testimonialsId)

  if(testimonials){
    res.status(200).json({
        filterData: testimonials
    });
  }
  else{
    res.status(400).json({
        message:"data not found"
    });
  }
}