import axios from 'axios';
import { getAccessToken } from './getAccessToken.js';


const API_URL = 'http://localhost:3000/order';
const token = getAccessToken();
const header = {
    headers: {
        Authorization: `Bearer ${token}` 
    }
};

export const getOrderData = async () => {
    try {
        const response = await axios.get(API_URL, header);
        return response.data;
} catch (error) {
    console.error('Error fetching order data:', error);
    throw error;
    }
};

export const getOrderById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, header);
        return response.data;
    } catch (error) {
        console.error(`Error fetching order with id ${id}:`, error);
        throw error;
    }
}

export const updateOrder= async (id, orderData) => {
    try {
        const url = `${API_URL}/${id}`;
        await axios.put(url, orderData, header);
    } catch (error) {
        console.error(`Error updating order with id ${id}:`, error);
        throw error;
    }
};


export const addOrder = async (data) => {


    try {
        const response = await axios.post(API_URL, data, header);
        if (response.status === 201) {
            console.log(response.status);
            return true; 
        }else{
            throw new Error(`Error adding order`);
        }
        
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const deleteOrder = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`,header);
        if (response.status === 204) {
        return true; 
    }
        throw new Error(`Error deleting order with id ${id}`);
    } catch (error) {
        console.error(`Error deleting order with id ${id}:`, error.response.data.message);
        
        throw error;
    }
};