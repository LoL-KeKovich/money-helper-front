import "../CreateProject.css";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
export default function Donate () {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token') == null) {
            navigate("/login");
        }
    }, [])

    const [current_sum, setCurrentSum] = useState(0);

    const handleCurrentSum = event => {
        setCurrentSum(event.target.value);
    }
    const params = useParams();

    const updateData = () => {
        axios.put(`http://127.0.0.1:8000/projects/donate/` + params.id, {
            current_sum
        }, {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        navigate("/projects/all");
    }

    return(
        <>
            <div className='project-wrapper'>
                <div className='create-project'>
                    <h1>Материальная поддержка</h1>
                    <input type='number' placeholder='Укажите сумму' onChange={handleCurrentSum}/>
                    <button onClick={updateData}>Поддержать</button>
                </div>
            </div>
        </>
    )
}