import axios from 'axios';
import { getAccessToken } from './getAccessToken.js';


const API_URL = 'http://localhost:3000/customer';




export const getCustomerData = async () => {
    try {
        const token = getAccessToken();
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response.data;
} catch (error) {
    console.error('Error fetching custmer data:', error);
    throw error;
    }
};

export const getCustomerById = async (id) => {
    try {
        const token = getAccessToken();
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching customer with id ${id}:`, error);
        throw error;
    }
}

export const updateCustomer= async (id, productData) => {
    try {
        const token = getAccessToken();
        const url = `${API_URL}/${id}`;
        await axios.put(url, productData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    } catch (error) {
        console.error(`Error updating customer with id ${id}:`, error);
        throw error;
    }
};


export const addCustomer = async (customer_id, first_name, last_name, email, phone) => {
    const token = getAccessToken();
    const data ={
        "customer_id": customer_id,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "phone": phone
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
            throw new Error(`Error adding customer`);
        }
  
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const deleteCustomer = async (id) => {
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
        throw new Error(`Error deleting customer with id ${id}`);
    } catch (error) {
        console.error(`Error deleting customer with id ${id}:`, error.response.data.message);
        
        throw error;
    }
};