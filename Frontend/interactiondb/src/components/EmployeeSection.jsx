import React from 'react';
import '../styles/mainPageStyles.css'; 
import '../styles/contentSectionStyles.css'
import { FiLogOut } from 'react-icons/fi'; 
import manAvatar from '../images/man-avatar.png';
import '../styles/customersTableStyles.css'; 


const EmployeeSection = ({ text, icon: Icon }) => { 
    const dataTable = [
        { employee_id: 1, first_name: 'Nike', last_name: '50', email: '1', position: '2', salary: "6000"  },
        { employee_id: 1, first_name: 'Nike', last_name: '50', email: '1', position: '2', salary: "6000"  },
        { employee_id: 1, first_name: 'Nike', last_name: '50', email: '1', position: '2', salary: "6000"  },

    ];
    
    return(
        <div className='content-container'>
            <div className='header-section'>
                <a className='header-text'>Employyes</a>
                <div className='user-section'>
                    <div className='image-header-container'>
                        <img  src={manAvatar} alt='nike logo' className='user-pic'/> 
                    </div>
                    <div className='text-container'>
                        <a className='user-name'>Vasylko Peleshko</a>
                        <a className='user-role'>Admin</a>
                    </div>
                    <button className='log-out-button'>
                        <FiLogOut className='log-out-icon' /> {/* Замінюємо іконку на FiLogOut */}
                    </button>
                </div>
            </div>
            <div className='main-section'>
                <div className='buttons-section'>
                    <button className='buttons-add'><a className='button-text'>Add Employee</a></button>
                    <button className='buttons-download'><a className='button-text'>Download</a></button>
                </div>
                <div className='table-section'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}>Employee ID</th>
                                <th style={{ width: '15%' }}>First Name</th>
                                <th style={{ width: '15%' }}>Last Name</th>
                                <th style={{ width: '25%' }}>Email</th>
                                <th style={{ width: '20%' }}>Position</th>
                                <th style={{ width: '15%' }}>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataTable.map((data, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{data.employee_id}</td>
                                    <td>{data.first_name}</td>
                                    <td>{data.last_name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.position}</td>
                                    <td>{data.salary}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default EmployeeSection;



