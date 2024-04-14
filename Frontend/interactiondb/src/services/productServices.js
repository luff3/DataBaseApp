import axios from 'axios';

const API_URL = 'http://localhost:3000/product';


const getAccessToken = () => {
    const cookies = document.cookie.split(';');
    console.log(document.cookie);
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('accessToken=')) {
            return cookie.substring('accessToken='.length, cookie.length);
        }
    }
    return null; 
};

export const getProductData = async (accessToken) => {
    try {
        const token = getAccessToken();
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}` // Додаємо токен у заголовок запиту
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

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/{id}`);
        if (response.status === 200) {
        return true; 
    }
        throw new Error(`Error deleting customer with id ${id}`);
    } catch (error) {
        console.error(`Error deleting customer with id ${id}:`, error);
        throw error;
    }
};