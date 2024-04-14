import React, { useState } from 'react';
import axios from 'axios'; 
import { toast, ToastContainer } from 'react-toastify';
import '../styles/loginPageStyles.css'; 
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        user: '', // залишили як user
        pwd: '' // залишили як pwd
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth', formData); // Відправлення POST запиту на шлях '/login' з даними форми
            onLogin(true);
            console.log('Відповідь від сервера:', response.data.accessToken);
            document.cookie = `accessToken=${response.data.accessToken}; path=/;`
        } catch (error) {
            console.error('Помилка від сервера:', error);
            onLogin(false);
            toast.error('Неправильний пароль або логін'); // Показуємо помилку з використанням react-toastify

        }
    };




    return (
        <div className="login-container">
            <ToastContainer /> 
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Увійти</h2>
                <div>
                    <input
                        type="text"
                        id="username"
                        name="user" // залишили як user
                        value={formData.user} // залишили як user
                        onChange={handleChange}
                        className="login-input"
                        placeholder="Логін"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="pwd" // залишили як pwd
                        value={formData.pwd} // залишили як pwd
                        onChange={handleChange}
                        className="login-input"
                        placeholder="Пароль"
                        required
                    />
                </div>
                <button type="submit" className="login-button">Увійти</button>
            </form>
        </div>
    );
};

export default LoginPage;
