const Employee = require('../models/employeeModel.js')
const path = require('path');
const fs = require('fs');

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();

        const responseBody = employees.map((employee) => ({
            employee_id: employee.employee_id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            position: employee.position,
            salary: employee.salary
        }));

        const jsonContent = JSON.stringify(responseBody, null, 2);

        const filePath = path.join(__dirname, '../documents/employees.json');
    
        fs.writeFileSync(filePath, jsonContent);
        
        res.status(200).json(employees);
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


exports.getEmployeeById = async (req, res) => {
    try {
        const employeeID = req.params.id;
        console.log(`Getting product with ID: ${employeeID}`);
    
        if (isNaN(employeeID)) {
            return res.status(400).json({
                error: 'Invalid employee ID. Must be a number.',
            });
        }
    
        const employee = await Employee.findByPk(employeeID);
    
        if (!employee) {
            return res.status(404).json({
                error: 'Employee not found.',
            });
        }
        const responseBody = {
            employee_id: employee.employee_id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            position: employee.position,
            salary: employee.salary
        };
    
        
        res.status(200).json(responseBody);
    }catch (error) {
    
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};



exports.createEmployee = async (req, res) => {
    try {
        console.log('Creating a new employee');
        console.log(req.body);
        const { employee_id } = req.body;
        const employeeId = employee_id.employee_id;
        const {first_name, last_name, email, position, salary} = employee_id;
        if (!employee_id || !first_name || !last_name || !email || !position || !salary) {
            return res.status(400).json({
                error: 'Something is missing',
            });
        }
    
        const newEmployee = await Employee.create({
            employeeId,
            first_name,
            last_name,
            email,
            position,
            salary
        },{
            fields: ['employee_id', 'first_name', 'last_name', 'email', 'position', 'salary']
        });
    
        const responseBody = {
            employee_id: newEmployee.employee_id,
            first_name: newEmployee.first_name,
            last_name: newEmployee.last_name,
            email: newEmployee.email,
            position: newEmployee.position,
            salary: newEmployee.salary
        };
    
        res.status(201).json(responseBody);
    
    } catch (error) {
        console.error('Error:', error);
    
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};


exports.deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
    
        const employee = await Employee.findByPk(employeeId);
        
        await employee.destroy();
    
        return res.status(204).json('Successfully deleted');
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.updateEmployee= async (req, res) => {
    try {
        const employeeId = req.params.id;
        const {first_name, last_name, email, position, salary} = req.body;
    
    
        const employee = await Employee.findByPk(employeeId);
        
        employee.first_name = first_name;
        employee.last_name = last_name;
        employee.email = email;
        employee.position = position;
        employee.salary = salary;
    
        await employee.save();
    
        return res.status(200).json({
            employee_id: employee.employee_id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            position: employee.position,
            salary: employee.salary
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};