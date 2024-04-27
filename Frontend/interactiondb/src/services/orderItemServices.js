import axios from 'axios';
import { getAccessToken } from './getAccessToken.js';


const API_URL = 'http://localhost:3000/orderItem';
const token = getAccessToken();
const header = {
    headers: {
        Authorization: `Bearer ${token}` 
    }
};

export const getOrderItemData = async () => {
    try {
        const response = await axios.get(API_URL, header);
        return response.data;
} catch (error) {
    console.error('Error fetching orderItem data:', error);
    throw error;
    }
};

export const getOrderItemById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, header);
        return response.data;
    } catch (error) {
        console.error(`Error fetching orderItem with id ${id}:`, error);
        throw error;
    }
}

export const updateOrderItem= async (id, orderItemData) => {
    try {
        const url = `${API_URL}/${id}`;
        await axios.put(url, orderItemData, header);
    } catch (error) {
        console.error(`Error updating orderItem with id ${id}:`, error);
        throw error;
    }
};


export const addOrderItem = async (data) => {


    try {
        const response = await axios.post(API_URL, data, header);
        if (response.status === 201) {
            console.log(response.status);
            return true; 
        }else{
            throw new Error(`Error adding orderItem`);
        }
        
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const deleteOrderItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`,header);
        if (response.status === 204) {
        return true; 
    }
        throw new Error(`Error deleting orderItem with id ${id}`);
    } catch (error) {
        console.error(`Error deleting orderItem with id ${id}:`, error.response.data.message);
        
        throw error;
    }
};