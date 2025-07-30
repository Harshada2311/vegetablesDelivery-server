//const productList = require('../Models/product.json')
const productList = require('../Models/productsvege.js');
const mongoose = require('mongoose');

exports.getAllproducts = async (req, res) => {
    // Fetch all products from the productList
    const products = await productList.find();
    res.status(200).json(products);

}

exports.getAllproductsById = async (req, res) => {
    const productId = req.params.id;
    const products = await productList.findById(productId)

    if (products) {
        res.status(200).json({
            filterId: products
        });
    }
    else {
        res.status(400).json({
            message: "Product Not Found"
        });
    }

}

exports.getProductsByName = async (req, res) => {

    const productName = req.params.name;
    
    try {
        const products = await productList.find({ name: productName });
        if (products.length > 0) {
            res.status(200).json({
                filterProductName: products
            });
        }
        else {
            res.status(400).json({
                message: "product Not Found"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
exports.getProductsByCategory = async (req, res) => {
    const category = req.params.category
    const products = await productList.find({ category: category })

    if (products.length > 0) {
        res.status(200).json({
            filtercategory: products
        });
    }
    else {
        res.status(400).json({
            message: "product category Not found"
        });
    }
}
exports.getProductsByCategoryShop = async (req, res) => {
    const category = req.params.category
    const products = await productList.find({ category: category })

    if (products.length > 0) {
        res.status(200).json({
            filtercategory: products
        });
    }
    else {
        res.status(400).json({
            message: "product category Not found"
        });
    }
}
exports.getProductsByCity = async (req, res) => {
    const city = req.params.city

    const cities = await productList.find({
        city: { $elemMatch: { $regex: new RegExp(`^${city}$`, 'i') } }
        
    });

    //console.log("Cities found:", cities);

    if (cities.length > 0) {
        res.status(200).json({
            filtercity: cities
        });
    }
    else {
        res.status(400).json({
            message: "product city Not found"
        });
    }

}


