import React, { useState, useEffect } from 'react';
import '../../styles/mainPageStyles.css'; 
import '../../styles/contentSectionStyles.css'
import { FiLogOut } from 'react-icons/fi'; 
import manAvatar from '../../images/man-avatar.png';
import '../../styles/customersTableStyles.css'; 
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash   } from '@fortawesome/free-solid-svg-icons';
import UpdateProductModal from './UpdateProductModal.jsx';
import AddProduct from './AddProduct.jsx';
import { getProductData, deleteProduct, createAndDownloadPdf} from '../../services/productServices.js'
import Pagination from '../Pagination.jsx';
import { handleLogout } from '../../services/logOut.js'


const ProductSection = ({ text, icon: Icon, username }) => { 
    const [dataTable, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(170);    

    useEffect(()=>{
        getData();
    },[updateSuccess])

    
    const getData = () => {
        getProductData()
        .then((data) => {
            setData(data);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };
    

    const handleEdit = (productId) => {
        setSelectedProductId(productId);
        //handleUpdateSuccess(false);
        setUpdateSuccess(false)
        console.log("Click icon update", updateSuccess);
        setShowModal(true);
    };

    const handleDelete = (productId) => {
        console.log('In delete', productId);
        deleteProduct(productId)
        .then((data) => {
            console.log(1);
            toast.success('Product deleted successfully');
            getData(); 
        })
        .catch((error) => {
            console.log(error);
            toast.error( error.response.data.message); 

        });
    };


    const handleUpdateSuccess = (success) => {
        //toast.success('Product updated successfully');
        setUpdateSuccess(success);
    };

    const handleAddSuccess = () => {
        
        getData(); 
        //setShowAddProductModal(false); 
        
    };
    

    const handleDownload = async () => {
        try {
            const limitedData = dataTable.slice(0, 1000);
            await createAndDownloadPdf(limitedData);
            toast.success("Products downloaded successfully");
        } catch (error) {
            console.error('Error downloading PDF:', error);
            toast.error(error.response?.data?.message || "Error downloading PDF");
        }
    };        

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataTable.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return(
        <div className='content-container'>
            <ToastContainer />
            <div className='header-section'>
                <a className='header-text'>Products</a>
                <div className='user-section'>
                    <div className='image-header-container'>
                        <img  src={manAvatar} alt='nike logo' className='user-pic'/> 
                    </div>
                    <div className='text-container'>
                        <a className='user-name'>{username}</a>
                        {/* <a className='user-role'>Admin</a> */}
                    </div>
                    <button className='log-out-button' onClick={handleLogout}>
                        <FiLogOut className='log-out-icon' /> {/* Замінюємо іконку на FiLogOut */}
                    </button>
                </div>
            </div>
            <div className='main-section'>
                <div className='buttons-section'>
                    <button className='buttons-add' onClick={() => setShowAddProductModal(true)}>
                        <a className='button-text'>Add Product</a>
                    </button>
                    <button className='buttons-download'><a className='button-text' onClick={() => handleDownload()}>Download</a></button>
                </div>
                <div className='table-section'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}>Product ID</th>
                                <th style={{ width: '15.5%' }}>Product Name</th>
                                <th style={{ width: '15.5%' }}>Amount</th>
                                <th style={{ width: '23.5%' }}>Product Spec ID</th>
                                <th style={{ width: '15.5%' }}>Supplier ID</th>
                                <th style={{ width: '10%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((data, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{data.product_id}</td>
                                    <td>{data.product_name}</td>
                                    <td>{data.amount}</td>
                                    <td>{data.product_specific_id}</td>
                                    <td>{data.supplier_id}</td>
                                    <td>
                                        <div className='icons-container'>
                                            <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(data.product_id)}  />
                                            <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(data.product_id)}/>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <UpdateProductModal 
                        show={showModal} 
                        onClose={handleCloseModal} 
                        onUpdateSuccess={handleUpdateSuccess}
                        productId={selectedProductId} 
                    />
                    <AddProduct show={showAddProductModal} onClose={() => setShowAddProductModal(false)} onAddSuccess={handleAddSuccess}/>
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={dataTable.length}
                        paginate={paginate}
                    />
                </div>
            </div>
        </div>
    )
}


export default ProductSection;



