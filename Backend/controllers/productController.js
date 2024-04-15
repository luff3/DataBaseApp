const Product = require("../models/productModel.js");
const pdfService = require('../services/pdf-service.js');
const pdf = require('html-pdf');
const pdfTemplate = require('../documents');
const path = require('path');
const fs = require('fs');

exports.getAllProducts = async (req, res) => {
    try {
        
        const products = await Product.findAll();

        const responseBody = products.map((product) => ({
            product_id: product.product_id,
            product_name: product.product_name,
            amount: product.amount,
            product_specific_id: product.product_specific_id,
            supplier_id: product.supplier_id
        }));
        
        const jsonContent = JSON.stringify(responseBody, null, 2);

        const filePath = path.join(__dirname, '../documents/products.json');
    
        fs.writeFileSync(filePath, jsonContent);

        res.status(200).json(responseBody);
    } catch (error) {
        console.error('Error:', error);
    
        res.status(500).json({
            body: {
            status: 'error',
            message: 'Internal Server Error',
            },
        });
    }
};



exports.getProductById = async (req, res) => {
    try {
        const productID = req.params.id;
        console.log(`Getting product with ID: ${productID}`);

        if (isNaN(productID)) {
            return res.status(400).json({
                error: 'Invalid product ID. Must be a number.',
            });
        }

        const product = await Product.findByPk(productID);

        if (!product) {
            return res.status(404).json({
                error: 'Product not found.',
            });
        }
        const responseBody = {
            product_id: product.product_id,
            product_name: product.product_name,
            amount: product.amount,
            product_specific_id: product.product_specific_id,
            supplier_id: product.supplier_id
        };

        res.status(200).json(responseBody);
    }catch (error) {

    console.error('Error:', error);
    return res.status(500).json({
        error: 'Internal Server Error',
    });
    }
};

exports.createProduct = async (req, res) => {
    try {
        console.log('Creating a new product');
        
        
        const { product_id } = req.body;
        console.log(product_id);
        const productID = product_id.product_id;
        
        // Розпаковуємо значення product_id
        const { product_name, amount, product_specific_id, supplier_id } = product_id;
        console.log(product_name, amount, product_specific_id, supplier_id);

        if (!product_id || !product_name || !amount || !product_specific_id || !supplier_id) {
            console.log( product_id, product_name, amount, product_specific_id, supplier_id);
            return res.status(400).json({
                error: 'Something is missing',
            });
        }

        const newProduct = await Product.create({
            productID,
            product_name,
            amount,
            product_specific_id,
            supplier_id
        });

        const responseBody = {
            product_id: newProduct.product_id,
            product_name: newProduct.product_name,
            amount: newProduct.amount,
            product_specific_id: newProduct.product_specific_id,
            supplier_id: newProduct.supplier_id
        };

        res.status(201).json(responseBody);

    } catch (error) {
        console.error('Error:', error);

        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const {product_name, amount, product_specific_id, supplier_id} = req.body;


        const product = await Product.findByPk(productId);
        
        product.product_name = product_name;
        product.amount = amount;
        product.product_specific_id = product_specific_id;
        product.supplier_id = supplier_id;

        await product.save();

        return res.status(200).json({
            product_id: product.product_id,
            product_name: product.product_name,
            amount: product.amount,
            product_specific_id: product.product_specific_id,
            supplier_id: product.supplier_id
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findByPk(productId);
    
        await product.destroy();

        return res.status(204).end();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.createPdf = async (req, res) => {
    console.log(1);
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
}


exports.fetchPdf = async (req, res) => {
    const filePath = path.join(__dirname, '../result.pdf');
    res.sendFile(filePath);
}
