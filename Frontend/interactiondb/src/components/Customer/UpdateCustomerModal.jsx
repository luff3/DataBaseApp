import React, { useState, useEffect } from 'react';
import '../../styles/updateProductModal.css';
import { getCustomerById, updateCustomer} from '../../services/customerServices.js'
import { toast, ToastContainer } from 'react-toastify';
const UpdateCustomerModal = ({ show, onClose, customerId, onUpdateSuccess }) => {
    const [customerFirstName, setCustomerName] = useState('');
    const [customerLastName, setCustomerLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        console.log(customerId);
        if (customerId) {
            getCustomerById(customerId).then((result) => {
                console.log(result);
                setCustomerName(result.first_name)
                setCustomerLastName(result.last_name);
                setEmail(result.email);
                setPhone(result.phone)
            });
        }
    }, [customerId]);

    const handleUpdate = () => {
        const updatedCustomer = {
            "first_name": customerFirstName,
            "last_name": customerLastName,
            "email": email,
            "suppphonelier_id": phone
        };
        updateCustomer(customerId, updatedCustomer)
        .then(() => {
            setUpdateSuccess(true);
            onUpdateSuccess(true); 
            console.log(updateSuccess);
            toast.success('Customer updated successfully'); 
        })
        .catch((error) => {
            console.log(error);
            toast.error(error.response.data.message); 
        });
        onClose();
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-window">
                <span className="close" onClick={onClose}>&times;</span>
                <div className='modal-content'>
                    <a className='head-text text-style'>Update Customer</a>
                    <div className='property-section'>
                        <label className='label text-style'>First Name:</label>
                        <input className='text-input text-style' type="text" value={customerFirstName} onChange={e => setCustomerName(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Last Name:</label>
                        <input className='text-input text-style'  type="text" value={customerLastName} onChange={e => setCustomerLastName(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Email: </label>
                        <input  className='text-input text-style' type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Phone:</label>
                        <input  className='text-input text-style' type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <button className='button text-style' onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateCustomerModal;
