import React, { useState, useEffect } from 'react';
import '../../styles/updateProductModal.css';
import { addEmployee} from '../../services/employeeServices.js'
import { toast, ToastContainer } from 'react-toastify';
const AddCustomer = ({ show, onClose, onAddSuccess }) => {
    const [employee_id, setEmployeeId] = useState('');
    const [first_name, setCustomerName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');

    const handleAdd = () => {
        const employee = {
            "employee_id": employee_id,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "position": position,
            "salary": salary
        }

        addEmployee(employee).then((data) => {
            if(data) toast.success('Employee added successfully'); 
            onAddSuccess();
            onClose();
        }).catch((error) =>{
            console.log(error.response.data.message);
            toast.error('Error adding employee'); 
        })
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-window">
                <span className="close" onClick={onClose}>&times;</span>
                <div className='modal-content'>
                    <a className='head-text text-style'>Add Employee</a>
                    <div className='property-section'>
                        <label className='label text-style'>First Name:</label>
                        <input className='text-input text-style' type="text" value={first_name} onChange={e => setCustomerName(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Last Name:</label>
                        <input className='text-input text-style'  type="text" value={last_name} onChange={e => setLastName(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Email:</label>
                        <input  className='text-input text-style' type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Position:</label>
                        <input  className='text-input text-style' type="text" value={position} onChange={e => setPosition(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Salary:</label>
                        <input  className='text-input text-style' type="number" value={salary} onChange={e => setSalary(e.target.value)} />
                    </div>
                    <button className='button text-style' onClick={handleAdd}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default AddCustomer;
