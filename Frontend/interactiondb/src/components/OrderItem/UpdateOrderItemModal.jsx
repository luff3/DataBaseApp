import React, { useState, useEffect } from 'react';
import '../../styles/updateProductModal.css';
import { getOrderItemById, updateOrderItem} from '../../services/orderItemServices.js'
import { toast, ToastContainer } from 'react-toastify';
const UpdateOrderItemModal = ({ show, onClose, orderItemId, onUpdateSuccess }) => {
    const [order_id, setOrderId] = useState('');
    const [product_id, setProductId] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        console.log(orderItemId);
        if (orderItemId) {
            getOrderItemById(orderItemId).then((result) => {
                console.log(result);
                setOrderId(result.order_id)
                setProductId(result.product_id);
            });
        }
    }, [orderItemId]);

    const handleUpdate = () => {
        const updatedOrderItem = {
            "order_id": order_id,
            "product_id": product_id
        };
        updateOrderItem(orderItemId, updatedOrderItem)
        .then(() => {
            setUpdateSuccess(true);
            onUpdateSuccess(true); 
            console.log(updateSuccess);
            toast.success('OrderItem updated successfully'); 
        })
        .catch((error) => {
            console.log(error);
            toast.error('Error updating orderItem'); 
        });
        onClose();
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-window">
                <span className="close" onClick={onClose}>&times;</span>
                <div className='modal-content'>
                    <a className='head-text text-style'>Update OrderItem</a>
                    <div className='property-section'>
                        <label className='label text-style'>Order Id:</label>
                        <input className='text-input text-style' type="text" value={order_id} onChange={e => setOrderId(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Product Id:</label>
                        <input className='text-input text-style'  type="text" value={product_id} onChange={e => setProductId(e.target.value)} />
                    </div>
                    <button className='button text-style' onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrderItemModal;
