const ProductSpecific = require('../models/productSpecificModel.js')


exports.getAllProdSpec = async (req, res) => {
    try {
        const prodSpec = await ProductSpecific.findAll();
        
        res.status(200).json(prodSpec);
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


exports.getProdSpecById = async (req, res) => {
    try {
        const prodSpecID = req.params.id;
        console.log(`Getting prodSpec with ID: ${prodSpecID}`);
    
        if (isNaN(prodSpecID)) {
            return res.status(400).json({
                error: 'Invalid productSpecID. Must be a number.',
            });
        }
    
        const productSpec = await ProductSpecific.findByPk(prodSpecID);
    
        if (!productSpec) {
            return res.status(404).json({
                error: 'Product Specific not found.',
            });
        }        
        res.status(200).json(productSpec);
    }catch (error) {
    
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};



exports.createProdSpec = async (req, res) => {
    try {
        console.log('Creating a new productSpec');
        console.log(req.body);
        const { price, color_id, size_id, type_id} = req.body;
        if (!price || !color_id || !size_id || !type_id) {
            return res.status(400).json({
                error: 'Something is missing',
            });
        }
    
        const newProdSpec = await ProductSpecific.create({
            price,
            color_id,
            size_id,
            type_id,
        },{
            fields: [ 'price', 'color_id', 'size_id', 'type_id']
        });
    
        const responseBody = {
            product_specific_id: newProdSpec.product_specific_id,
            price: newProdSpec.price,
            color_id: newProdSpec.color_id,
            size_id: newProdSpec.size_id,
            type_id: newProdSpec.type_id,
        };
    
        res.status(201).json(responseBody);
    
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};


exports.deleteProdSpec= async (req, res) => {
    try {
        const prodSpecId = req.params.id;
        const prodSpec = await ProductSpecific.findByPk(prodSpecId);
        if (!prodSpec) {
            return res.status(404).json('Product Specific not found');
        }
        await prodSpec.destroy();
        return res.status(204).json('Successfully deleted');
    } catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json('Internal Server Error');
    }
    
};


exports.updateProdSpec = async (req, res) => {
    try {
        const prodSpecId = req.params.id;
        const { price, color_id, size_id, type_id} = req.body;
    
    
        const prodSpec = await ProductSpecific.findByPk(prodSpecId);
        
        prodSpec.price = price;
        prodSpec.color_id = color_id;
        prodSpec.size_id = size_id;
        prodSpec.type_id = type_id;
    
        await prodSpec.save();
    
        return res.status(200).json({
            price: prodSpec.price,
            color_id: prodSpec.color_id,
            size_id: prodSpec.size_id,
            type_id: prodSpec.type_id,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};