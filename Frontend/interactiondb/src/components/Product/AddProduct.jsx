import React, { useState, useEffect } from 'react';
import '../../styles/updateProductModal.css';
import { addProduct} from '../../services/productServices.js'
import { toast, ToastContainer } from 'react-toastify';
const AddProduct = ({ show, onClose, onAddSuccess }) => {
    const [product_id, setProductId] = useState('');
    const [product_name, setProductName] = useState('');
    const [amount, setAmount] = useState('');
    const [product_specific_id, setProductSpecificId] = useState('');
    const [supplier_id, setSupplierId] = useState('');


    const handleAdd = () => {
        const product = {
            "product_id": product_id,
            "product_name": product_name,
            "amount": amount,
            "product_specific_id": product_specific_id,
            "supplier_id": supplier_id
        }

        addProduct(product).then((data) => {
            if(data) toast.success('Product added successfully'); 
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
                    <a className='head-text text-style'>Add Product</a>
                    <div className='property-section'>
                        <label className='label text-style'>Product Name:</label>
                        <input className='text-input text-style' type="text" value={product_name} onChange={e => setProductName(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Amount:</label>
                        <input className='text-input text-style'  type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>IProduct Spec ID:</label>
                        <input  className='text-input text-style' type="text" value={product_specific_id} onChange={e => setProductSpecificId(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Supplier ID:</label>
                        <input  className='text-input text-style' type="text" value={supplier_id} onChange={e => setSupplierId(e.target.value)} />
                    </div>
                    <button className='button text-style' onClick={handleAdd}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
