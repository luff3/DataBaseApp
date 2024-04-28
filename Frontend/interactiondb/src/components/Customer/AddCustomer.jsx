import React, { useState, useEffect } from 'react';
import '../../styles/updateProductModal.css';
import { addCustomer} from '../../services/customerServices.js'
import { toast, ToastContainer } from 'react-toastify';
const AddEmployee = ({ show, onClose, onAddSuccess }) => {
    const [customer_id, setCustomerId] = useState('');
    const [first_name, setCustomerName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');


    const handleAdd = () => {
        const customer = {
            "customer_id": customer_id,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "phone": phone
        }

        addCustomer(customer).then((data) => {
            if(data) toast.success('Customer added successfully'); 
            onAddSuccess();
            onClose();
        }).catch((error) =>{
            console.log(error.response.data.message);
            toast.error(error.response.data.message); 
        })
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-window">
                <span className="close" onClick={onClose}>&times;</span>
                <div className='modal-content'>
                    <a className='head-text text-style'>Add Customer</a>
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
                        <label className='label text-style'>Phone:</label>
                        <input  className='text-input text-style' type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <button className='button text-style' onClick={handleAdd}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;
