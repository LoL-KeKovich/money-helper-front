import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
export default function Login() {

    useEffect(() => {
        if(localStorage.getItem('token') !== null) {
            navigate("/projects");
        }
    }, [])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleEmailChange = event => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }

    const postData = () => {
        axios.post(`http://127.0.0.1:8000/auth/login`, {
            email,
            password
        }).then((response) => {
            localStorage.setItem('token',response.data.access_token);
            navigate("/projects");
        })
    }

    return(
        <>
            <div class='wrapper'>
                <div className='auth'>
                    <h1>Авторизуйтесь</h1>
                    <div className='input-wrapper'>
                        <label htmlFor="email">Ваша почта</label>
                        <input type='email' id='email' placeholder='Введите ваш email' onChange={handleEmailChange}/>
                        <label htmlFor="password">Ваш пароль</label>
                        <input type='password' id='password' placeholder='Введите пароль' onChange={handlePasswordChange}/>
                        <button onClick={postData}>Авторизоваться</button>
                        <div className='reset-link-wrapper'>
                            <Link to="/reset" className='reset-link'>Забыли пароль?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}