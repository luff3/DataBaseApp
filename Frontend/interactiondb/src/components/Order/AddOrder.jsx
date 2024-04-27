import React, { useState, useEffect } from 'react';
import '../../styles/updateProductModal.css';
import { addOrder } from '../../services/orderService.js'
import { toast, ToastContainer } from 'react-toastify';

const AddOrder = ({ show, onClose, onAddSuccess }) => {
    const [customer_id, setCustomerId] = useState('');
    const [employee_id, setEmployeeId] = useState('');
    const [total_amount, setTotalAmount] = useState('');
    const [order_date, setOrderDate] = useState('');


    const handleAdd = () => {
        const order = {
            "customer_id": customer_id,
            "employee_id": employee_id,
            "total_amount": total_amount,
            "order_date": order_date,
        }

        addOrder(order).then((data) => {
            if(data) toast.success('Order added successfully'); 
            onAddSuccess();
            onClose();
        }).catch((error) =>{
            console.log(error);
            console.log(error.response.data.message);
            toast.error('Error adding order'); 

            
        })
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-window">
                <span className="close" onClick={onClose}>&times;</span>
                <div className='modal-content'>
                    <a className='head-text text-style'>Add Order</a>
                    <div className='property-section'>
                        <label className='label text-style'>Customer ID:</label>
                        <input className='text-input text-style' type="text" value={customer_id} onChange={e => setCustomerId(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Employee ID:</label>
                        <input  className='text-input text-style' type="text" value={employee_id} onChange={e => setEmployeeId(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Total Amount:</label>
                        <input  className='text-input text-style' type="text" value={total_amount} onChange={e => setTotalAmount(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Order Date:</label>
                        <input  className='text-input text-style' type="text" value={order_date} onChange={e => setOrderDate(e.target.value)} />
                    </div>
                    <button className='button text-style' onClick={handleAdd}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default AddOrder;
