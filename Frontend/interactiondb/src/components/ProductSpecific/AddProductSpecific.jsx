import React, { useState, useEffect } from 'react';
import '../../styles/updateProductModal.css';
import { addProductSpec } from '../../services/productSpecific'
import { toast, ToastContainer } from 'react-toastify';

const AddProductSpecific = ({ show, onClose, onAddSuccess }) => {
    const [price, setCustomerId] = useState('');
    const [color_id, setEmployeeId] = useState('');
    const [size_id, setTotalAmount] = useState('');
    const [type_id, setOrderDate] = useState('');


    const handleAdd = () => {
        const productSpecific = {
            "price": price,
            "color_id": color_id,
            "size_id": size_id,
            "type_id": type_id
            
        }

        addProductSpec(productSpecific).then((data) => {
            console.log(data);
            if(data) toast.success('Product Specific added successfully'); 
            onAddSuccess();
            onClose();
        }).catch((error) =>{
            console.log(error);
            console.log(error.response.data.message);
            toast.error(error.response.data.message); 

            
        })
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-window">
                <span className="close" onClick={onClose}>&times;</span>
                <div className='modal-content'>
                    <a className='head-text text-style'>Add Product Specific</a>
                    <div className='property-section'>
                        <label className='label text-style'>Price:</label>
                        <input className='text-input text-style' type="text" value={price} onChange={e => setCustomerId(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Color ID:</label>
                        <input  className='text-input text-style' type="text" value={color_id} onChange={e => setEmployeeId(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Size ID:</label>
                        <input  className='text-input text-style' type="text" value={size_id} onChange={e => setTotalAmount(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Type ID:</label>
                        <input  className='text-input text-style' type="text" value={type_id} onChange={e => setOrderDate(e.target.value)} />
                    </div>
                    <button className='button text-style' onClick={handleAdd}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default AddProductSpecific;
