import React, { useState, useEffect } from 'react';
import '../../styles/updateProductModal.css';
import { getProductById, updateProduct} from '../../services/productServices.js'
import { toast, ToastContainer } from 'react-toastify';
const UpdateProductModal = ({ show, onClose, productId, onUpdateSuccess }) => {
    const [productName, setProductName] = useState('');
    const [amount, setAmount] = useState('');
    const [productSpecificId, setProductSpecificId] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        console.log(productId);
        if (productId) {
            getProductById(productId).then((result) => {
                console.log(result);
                setProductName(result.product_name)
                setAmount(result.amount);
                setProductSpecificId(result.product_specific_id);
                setSupplierId(result.supplier_id)
            });
        }
    }, [productId]);

    const handleUpdate = () => {
        const updatedProduct = {
            "product_name": productName,
            "amount": amount,
            "product_specific_id": productSpecificId,
            "supplier_id": supplierId
        };
        updateProduct(productId, updatedProduct)
        .then(() => {
            setUpdateSuccess(true);
            onUpdateSuccess(true); 
            console.log(updateSuccess);
            toast.success('Product updated successfully'); 
        })
        .catch((error) => {
            console.log(error);
            toast.error('Error updating product'); 
        });
        onClose();
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-window">
                <span className="close" onClick={onClose}>&times;</span>
                <div className='modal-content'>
                    <a className='head-text text-style'>Update Product</a>
                    <div className='property-section'>
                        <label className='label text-style'>Product Name:</label>
                        <input className='text-input text-style' type="text" value={productName} onChange={e => setProductName(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Amount:</label>
                        <input className='text-input text-style'  type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>IProduct Spec ID:</label>
                        <input  className='text-input text-style' type="text" value={productSpecificId} onChange={e => setProductSpecificId(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>	Supplier ID:</label>
                        <input  className='text-input text-style' type="text" value={supplierId} onChange={e => setSupplierId(e.target.value)} />
                    </div>
                    <button className='button text-style' onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductModal;
