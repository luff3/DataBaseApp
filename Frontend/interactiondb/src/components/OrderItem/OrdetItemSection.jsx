import React, {useState, useEffect} from 'react';
import '../../styles/mainPageStyles.css'; 
import '../../styles/contentSectionStyles.css'
import { FiLogOut } from 'react-icons/fi'; 
import manAvatar from '../../images/man-avatar.png';
import '../../styles/customersTableStyles.css'; 
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash   } from '@fortawesome/free-solid-svg-icons';
import UpdateOrderItemModal from './UpdateOrderItemModal.jsx';
import AddOrderItem from './AddOrderItem.jsx';
import { getOrderItemData,  deleteOrderItem } from '../../services/orderItemServices.js'
import Pagination from '../Pagination.jsx';
import { handleLogout } from '../../services/logOut.js'

const OrderItemSection = ({ text, icon: Icon, username }) => { 
    const [dataTable, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrderItemId, setSelectedOrderItemId] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(100);

    useEffect(()=>{
        getData();
    },[updateSuccess])



    const getData = () => {
        getOrderItemData()
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
    

    const handleEdit = (orderItemId) => {
        console.log(orderItemId);
        setSelectedOrderItemId(orderItemId);
        setUpdateSuccess(false)
        console.log("Click icon update", updateSuccess);
        setShowModal(true);
    };

    const handleDelete = (orderItemId) => {
        console.log('In delete', orderItemId);
        deleteOrderItem(orderItemId)
        .then((data) => {
            toast.success('OrderItem deleted successfully');
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
                <a className='header-text'>OrderItems</a>
                <div className='user-section'>
                    <div className='image-header-container'>
                        <img  src={manAvatar} alt='nike logo' className='user-pic'/> 
                    </div>
                    <div className='text-container'>
                        <a className='user-name'>{username}</a>
                    </div>
                    <button className='log-out-button' onClick={handleLogout}>
                        <FiLogOut className='log-out-icon' /> 
                    </button>
                </div>
            </div>
            <div className='main-section'>
                <div className='buttons-section'>
                    <button className='buttons-add' onClick={() => setShowAddCustomerModal(true)}>
                        <a className='button-text'>Add OrderItem</a>
                    </button>
                    <button className='buttons-download'><a className='button-text'>Download</a></button>
                </div>
                <div className='table-section'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th style={{ width: '25%' }}>OrderItem ID</th>
                                <th style={{ width: '25%' }}>Order ID</th>
                                <th style={{ width: '25%' }}>Product ID</th>
                                <th style={{ width: '25%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((data, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{data.order_item_id}</td>
                                    <td>{data.order_id}</td>
                                    <td>{data.product_id}</td>
                                    <td>
                                        <div className='icons-container'>
                                            <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(data.order_item_id)}  />
                                            <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(data.order_item_id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <UpdateOrderItemModal 
                        show={showModal} 
                        onClose={handleCloseModal} 
                        onUpdateSuccess={handleUpdateSuccess}
                        orderItemId={selectedOrderItemId} 
                    />
                    <AddOrderItem show={showAddCustomerModal} onClose={() => setShowAddCustomerModal(false)} onAddSuccess={handleAddSuccess}/>
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


export default OrderItemSection;



