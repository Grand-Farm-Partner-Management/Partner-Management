import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse, Button, CardBody, Card, Progress, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// Material
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Projects(args) {

    const user = useSelector((store) => store.user);
    const projects = useSelector((store) => store.projects);
    const members = useSelector((store) => store.members);
    const dispatch = useDispatch();
    const history = useHistory();

    // State and function for modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    // State for creating a new project
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectDueDate, setProjectDueDate] = useState('');
    const [date, setDate] = useState(new Date());

    const fetchProjects = async () => {
        await axios.get(`/api/project/${user.company_id}`)
            .then(res => {
                dispatch({ type: `GET_PROJECTS`, payload: res.data });
                console.log(res.data)
            })
    }

    const fetchMembers = () => {
        axios.get(`/api/company/members/${user.company_id}`)
            .then(res => {
                dispatch({ type: `GET_MEMBERS`, payload: res.data });
            })
    }

    const createProject = (body) => {
        axios.post(`/api/project/${user.company_id}`, body)
            .then(async res => {
                fetchProjects();
            })
        fetchProjects();
    }

    function getFormattedDate(date) {
        if (date === null) {
            return
        }
        let t = date.indexOf('T');
        let newDate = date.slice(0, t)
        return newDate;
    }

    const projectTasks = (project) => {
        dispatch({
            type: 'PROJECT_ID',
            payload: project.id
        })
        history.push(`/tasks/${project.id}`);
    }

    useEffect(() => {
        fetchProjects();
        fetchMembers();
    }, [])

    return (
        <div className='projects-wrapper'>
            <div className='projects'>
                <div className="projectHeading">
                    <h1>Projects</h1>
                    <Button onClick={toggle}>New Project</Button>
                    <Modal isOpen={modal} toggle={toggle} {...args}>
                        <ModalHeader toggle={toggle}>New Project</ModalHeader>
                        <ModalBody>
                            <label htmlFor='project-title'>Project Title:</label>
                            <input onChange={(e) => setProjectTitle(e.target.value)} id='project-title' />
                            <br />
                            <label htmlFor='project-description'>Project Description:</label>
                            <input onChange={(e) => setProjectDescription(e.target.value)} id='project-description' />
                            <br />
                            <label htmlFor='project-due-date'>Project Due-Date: </label>
                            <br />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id='project-due-date'
                                    value={date}
                                    onChange={(newDate) => {
                                        setProjectDueDate(newDate);
                                        setDate(newDate);
                                        console.log(newDate);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => {
                                createProject({ title: projectTitle, description: projectDescription, due_time: projectDueDate });
                                fetchProjects();
                                toggle();
                            }
                            }>Create</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <h4 className='project_company_name'>{members.length > 1 ? members[0].company_name : ''}</h4>
                {projects.length < 1 ? <h1 className='nothingYet'>Nothing yet</h1> : ''}
                {
                    projects.map((project) => {
                        return (
                            <div onClick={() => projectTasks(project)} className='project'>
                                <div className="title-and-date">
                                    <h4>{project.title}</h4>
                                    <h6>{getFormattedDate(project.due_time)}</h6>
                                </div>
                                <h6 className='project-description'>{project.description}</h6>
                                <Progress
                                    value={project.progression}>
                                    {project.progression}%
                                </Progress>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Projects;
