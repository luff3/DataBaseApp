import axios from 'axios';
import { getAccessToken } from './getAccessToken.js';
import checkErrorAndNotify from './checkError.js';

const API_URL = 'http://localhost:3000/product';




export const getProductData = async (accessToken) => {
    try {
        const token = getAccessToken();
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response.data;
} catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const token = getAccessToken();
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        console.log('In getProductById', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
    }
}

export const updateProduct= async (id, productData) => {
    try {
        const token = getAccessToken();
        const url = `${API_URL}/${id}`;
        await axios.put(url, productData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
    } catch (error) {
        console.error(`Error updating product with id ${id}:`, error);
        throw error;
    }
};


export const addProduct = async (product_id, product_name, amount, product_specific_id, supplier_id) => {
    const token = getAccessToken();
    const data ={
        "product_id": product_id,
        "product_name": product_name,
        "amount": amount,
        "product_specific_id": product_specific_id,
        "supplier_id": supplier_id
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
            throw new Error(`Error adding product`);
        }
  
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const deleteProduct = async (id) => {
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
        throw new Error(`Error deleting product with id ${id}`);
    } catch (error) {
        console.error(`Error deleting customer with id ${id}:`, error.response.data.message);
        
        throw error;
    }
};