import axios from 'axios';
import { getAccessToken } from './getAccessToken.js';


const API_URL = 'http://localhost:3000/productSpecific';
const token = getAccessToken();
const header = {
    headers: {
        Authorization: `Bearer ${token}` 
    }
};

export const getProductSpecData = async () => {
    try {
        const response = await axios.get(API_URL, header);
        return response.data;
} catch (error) {
    console.error('Error fetching product Specific data:', error);
    throw error;
    }
};

export const getProductSpecById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, header);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product Specific with id ${id}:`, error);
        throw error;
    }
}

export const updateProductSpec= async (id, productSpecData) => {
    try {
        const url = `${API_URL}/${id}`;
        await axios.put(url, productSpecData, header);
    } catch (error) {
        console.error(`Error updating product Specific with id ${id}:`, error);
        throw error;
    }
};


export const addProductSpec = async (data) => {


    try {
        const response = await axios.post(API_URL, data, header);
        if (response.status === 201) {
            console.log(response.status);
            return true; 
        }else{
            throw new Error(`Error adding product Specific`);
        }
        
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const deleteProductSpec = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`,header);
        if (response.status === 204) {
        return true; 
    }
        throw new Error(`Error deleting product Specific with id ${id}`);
    } catch (error) {
        console.error(`Error deleting product Specific with id ${id}:`, error.response.data.message);
        
        throw error;
    }
};