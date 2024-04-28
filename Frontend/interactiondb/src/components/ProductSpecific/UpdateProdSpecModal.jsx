import React, { useState, useEffect } from 'react';
import '../../styles/updateProductModal.css';
import { getProductSpecById, updateProductSpec} from '../../services/productSpecific'
import { toast, ToastContainer } from 'react-toastify';
const UpdateProdSpecModal = ({ show, onClose, prodSpecId, onUpdateSuccess }) => {
    const [price, setPrice] = useState('');
    const [color_id, setColorId] = useState('');
    const [size_id, setSizeId] = useState('');
    const [type_id, setTypeId] = useState('');

    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        console.log(prodSpecId);
        if (prodSpecId) {
            getProductSpecById(prodSpecId).then((result) => {
                console.log(result);
                setPrice(result.price);
                setColorId(result.color_id);
                setSizeId(result.size_id);
                setTypeId(result.type_id);
            });
        }
    }, [prodSpecId]);

    const handleUpdate = () => {
        const updatedProdSpec = {
            "price": price,
            "color_id": color_id,
            "size_id": size_id,
            "type_id": type_id
        };
        updateProductSpec(prodSpecId, updatedProdSpec)
        .then(() => {
            setUpdateSuccess(true);
            onUpdateSuccess(true); 
            console.log(updateSuccess);
            toast.success('Product Specific updated successfully'); 
        })
        .catch((error) => {
            console.log(error);
            toast.error('Error updating Product Specific'); 
        });
        onClose();
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-window">
                <span className="close" onClick={onClose}>&times;</span>
                <div className='modal-content'>
                    <a className='head-text text-style'>Update Product Spec</a>
                    <div className='property-section'>
                        <label className='label text-style'>Price:</label>
                        <input className='text-input text-style' type="text" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Color Id:</label>
                        <input className='text-input text-style'  type="text" value={color_id} onChange={e => setColorId(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Size Id:</label>
                        <input className='text-input text-style'  type="text" value={size_id} onChange={e => setSizeId(e.target.value)} />
                    </div>
                    <div className='property-section'>
                        <label className='label text-style'>Type Id:</label>
                        <input className='text-input text-style'  type="text" value={type_id} onChange={e => setTypeId(e.target.value)} />
                    </div>
                    <button className='button text-style' onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProdSpecModal;
