import React, {useState, useEffect} from 'react';
import '../../styles/mainPageStyles.css'; 
import '../../styles/contentSectionStyles.css'
import { FiLogOut } from 'react-icons/fi'; 
import manAvatar from '../../images/man-avatar.png';
import '../../styles/customersTableStyles.css'; 
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash   } from '@fortawesome/free-solid-svg-icons';
import UpdateEmployeeModal from './UpdateEmployeeModal.jsx';
import AddEmployee from './AddEmployee.jsx';
import { getEmployeeData,  deleteEmployee } from '../../services/employeeServices.js'
import Pagination from '../Pagination.jsx';
import { handleLogout } from '../../services/logOut.js'

const EmployeeSection = ({ text, icon: Icon, username}) => { 
    const [dataTable, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(100);

    useEffect(()=>{
        getData();
    },[updateSuccess])



    const getData = () => {
        getEmployeeData()
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
    

    const handleEdit = (employeeId) => {
        console.log(employeeId);
        setSelectedEmployeeId(employeeId);
        setUpdateSuccess(false)
        console.log("Click icon update", updateSuccess);
        setShowModal(true);
    };

    const handleDelete = (employeeId) => {
        console.log('In delete', employeeId);
        deleteEmployee(employeeId)
        .then((data) => {
            toast.success('Employee deleted successfully');
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
                <a className='header-text'>Employees</a>
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
                        <a className='button-text'>Add Employee</a>
                    </button>
                    <button className='buttons-download'><a className='button-text'>Download</a></button>
                </div>
                <div className='table-section'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th style={{ width: '7.5%' }}>Employee ID</th>
                                <th style={{ width: '15%' }}>First Name</th>
                                <th style={{ width: '15%' }}>Last Name</th>
                                <th style={{ width: '22.5%' }}>Email</th>
                                <th style={{ width: '17.5%' }}>Position</th>
                                <th style={{ width: '12.5%' }}>Salary</th>
                                <th style={{ width: '10%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((data, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{data.employee_id}</td>
                                    <td>{data.first_name}</td>
                                    <td>{data.last_name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.position}</td>
                                    <td>{data.salary}</td>
                                    <td>
                                        <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(data.employee_id)}  />
                                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(data.employee_id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <UpdateEmployeeModal 
                        show={showModal} 
                        onClose={handleCloseModal} 
                        onUpdateSuccess={handleUpdateSuccess}
                        employeeId={selectedEmployeeId} 
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


export default EmployeeSection;



