import React, {useState, useEffect} from 'react';
import '../../styles/mainPageStyles.css'; 
import '../../styles/contentSectionStyles.css'
import { FiLogOut } from 'react-icons/fi'; 
import manAvatar from '../../images/man-avatar.png';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash   } from '@fortawesome/free-solid-svg-icons';
import UpdateCustomerModal from './UpdateCustomerModal.jsx';
import AddEmployee from './AddCustomer.jsx';
import { getCustomerData,  deleteCustomer } from '../../services/customerServices.js'
import Pagination from '../Pagination.jsx';
import { handleLogout } from '../../services/logOut.js'


const ContentSection = ({ text, icon: Icon }) => { 
    const [dataTable, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(100);    

    useEffect(()=>{
        getData();
    },[updateSuccess])


    const getData = () => {
        getCustomerData()
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
    

    const handleEdit = (customerId) => {
        console.log(customerId);
        setSelectedCustomerId(customerId);
        //handleUpdateSuccess(false);
        setUpdateSuccess(false)
        console.log("Click icon update", updateSuccess);
        setShowModal(true);
    };

    const handleDelete = (customerId) => {
        console.log('In delete', customerId);
        deleteCustomer(customerId)
        .then((data) => {
            toast.success('Customer deleted successfully');
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
            <ToastContainer />
            <div className='header-section'>
                <a className='header-text'>Customers</a>
                <div className='user-section'>
                    <div className='image-header-container'>
                        <img  src={manAvatar} alt='nike logo' className='user-pic'/> 
                    </div>
                    <div className='text-container'>
                        <a className='user-name'>Vasylko Peleshko</a>
                        <a className='user-role'>Admin</a>
                    </div>
                    <button className='log-out-button'  onClick={handleLogout}>
                        <FiLogOut className='log-out-icon' /> {/* Замінюємо іконку на FiLogOut */}
                    </button>
                </div>
            </div>
            <div className='main-section'>
                <div className='buttons-section'>
                    <button className='buttons-add' onClick={() => setShowAddCustomerModal(true)}>
                        <a className='button-text'>Add Customer</a>
                    </button>
                    <button className='buttons-download'><a className='button-text'>Download</a></button>
                </div>
                <div className='table-section'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}>Customer ID</th>
                                <th style={{ width: '23.5%' }}>First Name</th>
                                <th style={{ width: '23.5%' }}>Last Name</th>
                                <th style={{ width: '23.5%' }}>Email</th>
                                <th style={{ width: '15.5%' }}>Phone</th>
                                <th style={{ width: '10%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((data, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{data.customer_id}</td>
                                    <td>{data.first_name}</td>
                                    <td>{data.last_name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.phone}</td>
                                    <td>
                                        <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(data.customer_id)}  />
                                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(data.customer_id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <UpdateCustomerModal 
                        show={showModal} 
                        onClose={handleCloseModal} 
                        onUpdateSuccess={handleUpdateSuccess}
                        customerId={selectedCustomerId} 
                    />
                    <AddEmployee show={showAddCustomerModal} onClose={() => setShowAddCustomerModal(false)} onAddSuccess={handleAddSuccess}/>
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


export default ContentSection;



