import React, { useState, useEffect } from 'react';
import '../../styles/updateProductModal.css';
import { getEmployeeById, updateEmployee} from '../../services/employeeServices.js'
import { toast, ToastContainer } from 'react-toastify';
const UpdateEmployeeModal = ({ show, onClose, employeeId, onUpdateSuccess }) => {
    const [employeeFirstName, setEmployeeName] = useState('');
    const [employeeLastName, setEmployeeLastName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        console.log(employeeId);
        if (employeeId) {
            getEmployeeById(employeeId).then((result) => {
                console.log(result);
                setEmployeeName(result.first_name)
                setEmployeeLastName(result.last_name);
                setEmail(result.email);
                setSalary(result.salary);
                setPosition(result.position)
            });
        }
    }, [employeeId]);

    const handleUpdate = () => {
        const updatedEmployee = {
            "first_name": employeeFirstName,
            "last_name": employeeLastName,
            "email": email,
            "position": position,
            "salary": salary
        };
        updateEmployee(employeeId, updatedEmployee)
        .then(() => {
            setUpdateSuccess(true);
            onUpdateSuccess(true); 
            console.log(updateSuccess);
            toast.success('Employee updated successfully'); 
        })
        .catch((error) => {
            console.log(error);
            toast.error('Error updating employee'); 
        });
        onClose();
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-window">
                <span className="close" onClick={onClose}>&times;</span>
                <div className='modal-content'>
                    <a className='head-text text-style'>Update Employee</a>
                    <div className='property-section'>
                        <label className='label text-style'>First Name:</label>
                        <input className='text-input text-style' type="text" value={employeeFirstName} onChange={e => setEmployeeName(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Last Name:</label>
                        <input className='text-input text-style'  type="text" value={employeeLastName} onChange={e => setEmployeeLastName(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Email: </label>
                        <input  className='text-input text-style' type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Position:</label>
                        <input  className='text-input text-style' type="text" value={position} onChange={e => setPosition(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Salary:</label>
                        <input  className='text-input text-style' type="text" value={salary} onChange={e => setSalary(e.target.value)} />
                    </div>
                    <button className='button text-style' onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateEmployeeModal;
