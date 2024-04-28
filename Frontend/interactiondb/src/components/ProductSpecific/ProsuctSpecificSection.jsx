import React, {useState, useEffect} from 'react';
import '../../styles/mainPageStyles.css'; 
import '../../styles/contentSectionStyles.css'
import { FiLogOut } from 'react-icons/fi'; 
import manAvatar from '../../images/man-avatar.png';
import '../../styles/customersTableStyles.css'; 
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash   } from '@fortawesome/free-solid-svg-icons';
import UpdateProdSpecModal from './UpdateProdSpecModal.jsx';
import AddProductSpecific from './AddProductSpecific.jsx';
import { getProductSpecData,  deleteProductSpec } from '../../services/productSpecific.js'
import Pagination from '../Pagination.jsx';
import { handleLogout } from '../../services/logOut.js'

const ProductSpecificSection = ({ text, icon: Icon, username }) => { 
    const [dataTable, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProdSpecId, setSelectedProdSpecId] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(100);

    useEffect(()=>{
        getData();
    },[updateSuccess])



    const getData = () => {
        getProductSpecData()
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
    

    const handleEdit = (prodSpecId) => {
        console.log(prodSpecId);
        setSelectedProdSpecId(prodSpecId);
        setUpdateSuccess(false)
        console.log("Click icon update", updateSuccess);
        setShowModal(true);
    };

    const handleDelete = (prodSpecId) => {
        console.log('In delete', prodSpecId);
        deleteProductSpec(prodSpecId)
        .then((data) => {
            toast.success('Product Specific deleted successfully');
            getData(); 
        })
        .catch((error) => {
            console.log(error);
            toast.error( error.response.data.message); 

        });
    };


    const handleUpdateSuccess = (success) => {
        setUpdateSuccess(success);
    };

    const handleAddSuccess = () => { 
        getData();    
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataTable.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);


    
    return(
        <div className='content-container'>
            <ToastContainer/>
            <div className='header-section'>
                <a className='header-text'>Product Specific</a>
                <div className='user-section'>
                    <div className='image-header-container'>
                        <img  src={manAvatar} alt='nike logo' className='user-pic'/> 
                    </div>
                    <div className='text-container'>
                        <a className='user-name'>{username}</a>
                        {/* <a className='user-role'>Admin</a> */}
                    </div>
                    <button className='log-out-button' onClick={handleLogout}>
                        <FiLogOut className='log-out-icon' /> 
                    </button>
                </div>
            </div>
            <div className='main-section'>
                <div className='buttons-section'>
                    <button className='buttons-add' onClick={() => setShowAddCustomerModal(true)}>
                        <a className='button-text'>Add Product Specific</a>
                    </button>
                    <button className='buttons-download'><a className='button-text'>Download</a></button>
                </div>
                <div className='table-section'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>Prod Spec ID</th>
                                <th style={{ width: '20%' }}>Price</th>
                                <th style={{ width: '15%' }}>Color ID</th>
                                <th style={{ width: '15%' }}>Size ID</th>
                                <th style={{ width: '15%' }}>Type ID</th>
                                <th style={{ width: '15%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((data, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{data.product_specific_id}</td>
                                    <td>{data.price}</td>
                                    <td>{data.color_id}</td>
                                    <td>{data.size_id}</td>
                                    <td>{data.type_id}</td>
                                    <td>
                                        <div className='icons-container'>
                                            <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(data.product_specific_id)}  />
                                            <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(data.product_specific_id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <UpdateProdSpecModal 
                        show={showModal} 
                        onClose={handleCloseModal} 
                        onUpdateSuccess={handleUpdateSuccess}
                        prodSpecId={selectedProdSpecId} 
                    />
                    <AddProductSpecific show={showAddCustomerModal} onClose={() => setShowAddCustomerModal(false)} onAddSuccess={handleAddSuccess}/>
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


export default ProductSpecificSection;



