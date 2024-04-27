import React, { useState, useEffect } from 'react';
import '../../styles/updateProductModal.css';
import { getOrderById, updateOrder} from '../../services/orderService.js'
import { toast, ToastContainer } from 'react-toastify';
const UpdateOrderModal = ({ show, onClose, orderId, onUpdateSuccess }) => {
    const [customer_id, setCustomerId] = useState('');
    const [employee_id, setEmployeeId] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [orderDate, setOrderDate] = useState('');

    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        console.log(orderId);
        if (orderId) {
            getOrderById(orderId).then((result) => {
                console.log(result);
                setCustomerId(result.customer_id);
                setEmployeeId(result.employee_id);
                setTotalAmount(result.total_amount);
                setOrderDate(result.order_date);
            });
        }
    }, [orderId]);

    const handleUpdate = () => {
        const updatedOrder = {
            "customer_id": customer_id,
            "employee_id": employee_id,
            "total_amount": totalAmount,
            "order_date": orderDate,
        };
        updateOrder(orderId, updatedOrder)
        .then(() => {
            setUpdateSuccess(true);
            onUpdateSuccess(true); 
            console.log(updateSuccess);
            toast.success('Order updated successfully'); 
        })
        .catch((error) => {
            console.log(error);
            toast.error('Error updating order'); 
        });
        onClose();
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-window">
                <span className="close" onClick={onClose}>&times;</span>
                <div className='modal-content'>
                    <a className='head-text text-style'>Update Order</a>
                    <div className='property-section'>
                        <label className='label text-style'>Customer Id:</label>
                        <input className='text-input text-style' type="text" value={customer_id} onChange={e => setCustomerId(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Employee Id:</label>
                        <input className='text-input text-style'  type="text" value={employee_id} onChange={e => setEmployeeId(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Total Amount:</label>
                        <input className='text-input text-style'  type="text" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Order Date:</label>
                        <input className='text-input text-style'  type="text" value={orderDate} onChange={e => setOrderDate(e.target.value)} />
                    </div>
                    <button className='button text-style' onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrderModal;
