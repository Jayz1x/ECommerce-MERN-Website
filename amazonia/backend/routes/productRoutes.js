const express = require('express');
const Product = require('../models/productModel');


const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products)
})

productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne( {slug:req.params.slug} );
    if(product) {
        res.send(product)
    } else {
        res.status(404).send({ message: "product not found" })
    }
})

productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.send(product)
    } else {
        res.status(404).send({ message: "product not found" })
    }
})

module.exports = productRouter


