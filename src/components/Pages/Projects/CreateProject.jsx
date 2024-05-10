import './CreateProject.css';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from "react";
export default function CreateProject() {

    useEffect(() => {
        if(localStorage.getItem('token') == null) {
            navigate("/login");
        }
    }, [])

    const [author, setAuthor] = useState('');
    const [needed_sum, setNeededSum] = useState(0);
    const [description, setDescription] = useState('');

    const handleAuthorChange = event => {
        setAuthor(event.target.value);
    }

    const handleNeededSumChange = event => {
        setNeededSum(event.target.value);
    }

    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    }

    const navigate = useNavigate();
    const postData = () => {
        axios.post(`http://127.0.0.1:8000/projects`, {
            author,
            needed_sum,
            description,
        }, {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        navigate("/projects");
    }
    return(
        <div className='project-wrapper'>
            <div className='create-project'>
                <h1>Создайте проект</h1>
                <input type='text' placeholder='Ваша почта (автор проекта)' onChange={handleAuthorChange}/>
                <input type='number' placeholder='Необходимая сумма' onChange={handleNeededSumChange}/>
                <textarea placeholder='Описание проекта' onChange={handleDescriptionChange}/>
                <button onClick={postData}>Создать</button>
            </div>
        </div>
    )
}