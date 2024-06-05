import './Projects.css';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
export default function Projects() {

    let current_status = "Нет";

    const navigate = useNavigate();
    const [projectData, setProjectData] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('token') == null) {
            navigate("/login");
        } else {
            axios.get(`/semibor/projects`, {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
                .then((response) => {
                    setProjectData(response.data);
            })
        }
    }, [])

    return(
        <>
            <div className='list-wrapper'>
                <div className='projects'>
                    <h1>Ваши проекты</h1> <br/>
                    <div className='link-wrapper'>
                        <Link to="/projects/create" className='project_link'>Создать новый</Link>
                    </div>
                    <div className='project-items'>
                        {projectData.map((data)=> {
                            {current_status = data.current_status == 0 ? "Сбор продолжается" : "Сбор закрыт"}
                            return (
                                <>
                                    <div className='project-items-wrapper'>
                                        <div className='project-top'><p>Проект</p></div>
                                        <div className='projects-card'>
                                            <div className='project-description'><p>Описание проекта: {data.description}</p></div>
                                            <div className='project-author'><p>Автор проекта: {data.author}</p></div>
                                            <div className='progress-bar'>
                                                <p>Прогресс сбора</p>
                                                <progress className="graph" value={data.current_sum} max={data.needed_sum}></progress>
                                            </div>
                                            <div className='project-picture'>

                                            </div>
                                            <div className='project-status'><p>Статус сбора средств: {current_status}</p></div>
                                            <div className='project-button'>
                                                <button>Редактировать проект</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}