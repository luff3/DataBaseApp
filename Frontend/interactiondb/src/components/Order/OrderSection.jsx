import React, {useState, useEffect} from 'react';
import '../../styles/mainPageStyles.css'; 
import '../../styles/contentSectionStyles.css'
import { FiLogOut } from 'react-icons/fi'; 
import manAvatar from '../../images/man-avatar.png';
import '../../styles/customersTableStyles.css'; 
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash   } from '@fortawesome/free-solid-svg-icons';
import UpdateOrderModal from './UpdateOrderModal.jsx';
import AddOrder from './AddOrder.jsx';
import { getOrderData,  deleteOrder } from '../../services/orderService.js'
import Pagination from '../Pagination.jsx';
import { handleLogout } from '../../services/logOut.js'

const OrderSection = ({ text, icon: Icon, username }) => { 
    const [dataTable, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(100);

    useEffect(()=>{
        getData();
    },[updateSuccess])



    const getData = () => {
        getOrderData()
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
    

    const handleEdit = (orderId) => {
        console.log(orderId);
        setSelectedOrderId(orderId);
        setUpdateSuccess(false)
        console.log("Click icon update", updateSuccess);
        setShowModal(true);
    };

    const handleDelete = (orderId) => {
        console.log('In delete', orderId);
        deleteOrder(orderId)
        .then((data) => {
            toast.success('Order deleted successfully');
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
                <a className='header-text'>Orders</a>
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
                        <a className='button-text'>Add Order</a>
                    </button>
                    <button className='buttons-download'><a className='button-text'>Download</a></button>
                </div>
                <div className='table-section'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th style={{ width: '15%' }}>Order ID</th>
                                <th style={{ width: '15%' }}>Customer ID</th>
                                <th style={{ width: '15%' }}>Employee ID</th>
                                <th style={{ width: '15%' }}>Total Amount</th>
                                <th style={{ width: '25%' }}>Order Date</th>
                                <th style={{ width: '15%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((data, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{data.order_id}</td>
                                    <td>{data.customer_id}</td>
                                    <td>{data.employee_id}</td>
                                    <td>{data.total_amount}</td>
                                    <td>{data.order_date}</td>
                                    <td >
                                        <div className='icons-container'>
                                        <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(data.order_id)}  />
                                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(data.order_id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <UpdateOrderModal 
                        show={showModal} 
                        onClose={handleCloseModal} 
                        onUpdateSuccess={handleUpdateSuccess}
                        orderId={selectedOrderId} 
                    />
                    <AddOrder show={showAddCustomerModal} onClose={() => setShowAddCustomerModal(false)} onAddSuccess={handleAddSuccess}/>
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


export default OrderSection;



