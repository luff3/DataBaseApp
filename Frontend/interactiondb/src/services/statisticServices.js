import axios from 'axios';
import { getAccessToken } from './getAccessToken.js';


const API_URL = 'http://localhost:3000/statistic';
const token = getAccessToken();
const header = {
    headers: {
        Authorization: `Bearer ${token}` 
    }
}


export const getTotalForLastMonth = async () => {
    try {
        const response = await axios.get(`${API_URL}/lastMonth`, header);
        console.log(response);
        return response.data;
} catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getMostPopularClothes = async () => {
    try {
        const response = await axios.get(`${API_URL}/mostPopular`, header);
        console.log(response);
        return response.data;
} catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export const getTopEmployee = async () => {
    try {
        const response = await axios.get(`${API_URL}/employee`, header);
        console.log(response);
        return response.data;
} catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getStatistic = async () => {
    try {
        const response = await axios.get(`${API_URL}`, header);
        console.log(response.data);
        return response.data;
} catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export const getStatisticPerMonth = async () => {
    try {
        const response = await axios.get(`${API_URL}/moneyPerMonth`, header);
        console.log(response.data);
        return response.data;
} catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}