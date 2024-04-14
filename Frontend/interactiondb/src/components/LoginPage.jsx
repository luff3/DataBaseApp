import React, { useState } from 'react';
import axios from 'axios'; 
import '../styles/loginPageStyles.css'; 

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
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
        const response = await axios.post('http://localhost:3000/login', formData); // Відправлення POST запиту на шлях '/login' з даними форми
        console.log('Відповідь від сервера:', response.data);
        } catch (error) {
        console.error('Помилка від сервера:', error);
        }
    };

    return (
        <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Увійти</h2>
            <div className='login-input-container'>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="login-input"
                    placeholder="Логін"
                    required
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
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
