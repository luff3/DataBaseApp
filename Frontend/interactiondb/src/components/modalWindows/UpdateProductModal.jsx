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
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Update Product</h2>
                <div>
                    <label>Product Name:</label>
                    <input type="text" value={productName} onChange={e => setProductName(e.target.value)} />
                </div>
                <div>
                    <label>Amount:</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
                <div>
                    <label>IProduct Spec ID:</label>
                    <input type="text" value={productSpecificId} onChange={e => setProductSpecificId(e.target.value)} />
                </div>
                <div>
                    <label>	Supplier ID:</label>
                    <input type="text" value={supplierId} onChange={e => setSupplierId(e.target.value)} />
                </div>
                <button onClick={handleUpdate}>Update</button>
            </div>
        </div>
    );
};

export default UpdateProductModal;
