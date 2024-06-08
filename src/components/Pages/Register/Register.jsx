import './Register.css';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Register() {

    const navigate = useNavigate()
    let role

    useEffect(() => {
        if(localStorage.getItem('token') !== null) {
            navigate("/projects");
        }
    }, [])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [initials, setInitials] = useState('');

    const handleEmailChange = event => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }

    const handleInitialsChange = event => {
        setInitials(event.target.value);
    }

    const handleAdminChange = event => {
        event.target.checked ? role = 'admin' : role = 'user';
    }

    const postData = () => {
        axios.post(`/semibor/user/create`, {
            email,
            password,
            initials,
            role
        })
    }

    return(
        <>
            <div className='reg-wrapper'>
                <div className='reg'>
                    <h1>Зарегистрируйтесь</h1>
                    <div className='reg-input-wrapper'>
                        <label htmlFor="email">Ваш email</label>
                        <input type='email' id='email' placeholder='Введите ваш email' onChange={handleEmailChange}/>
                        <label htmlFor="password">Ваш пароль</label>
                        <input type='password' id='password' placeholder='Введите пароль' onChange={handlePasswordChange}/>
                        <label htmlFor='text'>Ваши инициалы</label>
                        <input type='text' id='text' placeholder='Введите инициалы' onChange={handleInitialsChange}/>
                        <label htmlFor='checkbox'>Я администратор</label>
                        <input type='checkbox' onChange={handleAdminChange}/>
                        <button onClick={postData}>Зарегистрироваться</button>
                    </div>
                </div>
            </div>
        </>
    )
}