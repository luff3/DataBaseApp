const Customer = require('../models/customerModel.js')


exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();

        const responseBody = customers.map((customer) => ({
            customer_id: customer.customer_id,
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            phone: customer.phone
        }));
        
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


exports.getCustomerById = async (req, res) => {
    try {
        const customer_id = req.params.id;
        console.log(`Getting product with ID: ${customer_id}`);
    
        if (isNaN(customer_id)) {
            return res.status(400).json({
                error: 'Invalid customer ID. Must be a number.',
            });
        }
    
        const customer = await Customer.findByPk(customer_id);
    
        if (!customer) {
            return res.status(404).json({
                error: 'Customer not found.',
            });
        }
        const responseBody = {
            customer_id: customer.customer_id,
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            phone: customer.phone
        };
    
        
        res.status(200).json(responseBody);
    }catch (error) {
    
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};



exports.createCustomer = async (req, res) => {
    try {
        console.log('Creating a new customer');
        const { customer_id } = req.body;
        const customerID = customer_id.customer_id;
        const { first_name, last_name, email, phone} = customer_id;
        if (!customer_id || !first_name || !last_name || !email || !phone) {
            return res.status(400).json({
                error: 'Something is missing',
            });
        }
    
        const newCustomer = await Customer.create({
            customerID,
            first_name,
            last_name,
            email,
            phone
        },{
            fields: ['customer_id', 'first_name', 'last_name', 'email', 'phone']
        });
    
        const responseBody = {
            customer_id: newCustomer.customer_id,
            first_name: newCustomer.first_name,
            last_name: newCustomer.last_name,
            email: newCustomer.email,
            phone: newCustomer.phone
        };
    
        res.status(201).json(responseBody);
    
    } catch (error) {
        console.error('Error:', error);
    
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};


exports.deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
    
        const customer = await Customer.findByPk(customerId);
        
        await customer.destroy();
    
        return res.status(204).json('Successfully deleted');
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.updateCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const {first_name, last_name, email, phone} = req.body;
    
    
        const customer = await Customer.findByPk(customerId);
        
        customer.first_name = first_name;
        customer.last_name = last_name;
        customer.email = email;
        customer.phone = phone;
    
        await customer.save();
    
        return res.status(200).json({
            customer_id: customer.customer_id,
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            phone: customer.phone
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};