import axios from 'axios';
import { getAccessToken } from './getAccessToken.js';


const API_URL = 'http://localhost:3000/employee';




export const getEmployeeData = async () => {
    try {
        const token = getAccessToken();
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response.data;
} catch (error) {
    console.error('Error fetching employee data:', error);
    throw error;
    }
};

export const getEmployeeById = async (id) => {
    try {
        const token = getAccessToken();
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching employee with id ${id}:`, error);
        throw error;
    }
}

export const updateEmployee= async (id, employeeData) => {
    try {
        const token = getAccessToken();
        const url = `${API_URL}/${id}`;
        await axios.put(url, employeeData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    } catch (error) {
        console.error(`Error updating employee with id ${id}:`, error);
        throw error;
    }
};


export const addEmployee = async (employee_id, first_name, last_name, email, position, salary ) => {
    const token = getAccessToken();
    const data ={
        "employee_id": employee_id,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "position": position,
        "salary":salary
    }

    try {
        const response = await axios.post(API_URL, data, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        if (response.status === 201) {
            console.log(response.status);
            return true; 
        }else{
            throw new Error(`Error adding employee`);
        }
        
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const deleteEmployee = async (id) => {
    try {
        const token = getAccessToken();
        const response = await axios.delete(`${API_URL}/${id}`,{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        if (response.status === 204) {
        return true; 
    }
        throw new Error(`Error deleting employee with id ${id}`);
    } catch (error) {
        console.error(`Error deleting employee with id ${id}:`, error.response.data.message);
        
        throw error;
    }
};