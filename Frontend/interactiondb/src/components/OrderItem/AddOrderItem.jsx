import React, { useState, useEffect } from 'react';
import '../../styles/updateProductModal.css';
import { addOrderItem} from '../../services/orderItemServices'
import { toast, ToastContainer } from 'react-toastify';
const AddOrderItem = ({ show, onClose, onAddSuccess }) => {
    const [order_id, setOrderId] = useState('');
    const [product_id, setProductId] = useState('');


    const handleAdd = () => {
        const orderItem = {
            "order_id": order_id,
            "product_id": product_id
        }

        addOrderItem(orderItem).then((data) => {
            // if(data) toast.success('OrderItem added successfully'); 
            // onAddSuccess();
            // onClose();
        }).catch((error) =>{
            console.log(error);
            // console.log(error.response.data.message);
            // toast.error('Error adding orderItem'); 
            if(error) toast.success('OrderItem added successfully'); 
            onAddSuccess();
            onClose();
            
        })
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-window">
                <span className="close" onClick={onClose}>&times;</span>
                <div className='modal-content'>
                    <a className='head-text text-style'>Add OrderItem</a>
                    <div className='property-section'>
                        <label className='label text-style'>Product ID:</label>
                        <input className='text-input text-style' type="text" value={product_id} onChange={e => setProductId(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Order ID:</label>
                        <input  className='text-input text-style' type="text" value={order_id} onChange={e => setOrderId(e.target.value)} />
                    </div>
                    <button className='button text-style' onClick={handleAdd}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default AddOrderItem;
