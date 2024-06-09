import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import "../CreateProject.css";

export default function Edit () {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token') == null) {
            navigate("/login");
        }
    }, [])

    const [needed_sum, setNeededSum] = useState(0);
    const [description, setDescription] = useState('');

    const params = useParams();

    const handleNeededSumChange = event => {
        setNeededSum(event.target.value);
    }

    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    }

    const updateData = () => {
        axios.put(`/semibor/projects/` + params.id, {
            needed_sum,
            description
        }, {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        navigate("/projects");
    }

    return (
        <>
            <div className='project-wrapper'>
                <div className='create-project'>
                    <h1>Измените параметры проекта</h1>
                    <input type='number' placeholder='Укажите нужную сумму' onChange={handleNeededSumChange}/>
                    <textarea placeholder='Описание проекта' onChange={handleDescriptionChange}/>
                    <button onClick={updateData}>Подтвердить</button>
                </div>
            </div>
        </>
    )
}