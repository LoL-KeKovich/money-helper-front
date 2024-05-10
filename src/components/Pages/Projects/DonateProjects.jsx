import "./Projects.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
export default function DonateProjects() {

    let current_status = "Нет";

    const navigateFromDonate = useNavigate();
    const [projectData, setProjectData] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('token') == null) {
            navigateFromDonate("/login");
        } else {
            axios.get(`http://127.0.0.1:8000/projects`, {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
                .then((response) => {
                    setProjectData(response.data);
                })
        }
    }, [])

    return(
        <>
            <div className='list-wrapper'>
                <div className='projects'>
                    <h1>Окажите поддержку проектам</h1>
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
                                            <div className='project-status'><p>Статус сбора средств: {current_status}</p></div>
                                            <div className='project-button-donate'>
                                                <Link to={"/projects/donate/" + data.id} className='project_link_donate'>Оказать поддержку</Link>
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