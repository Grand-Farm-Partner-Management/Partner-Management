import React, { useEffect, useState } from 'react';
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

    const calculateProgression = (tasks) => {
        let completed = 0;
        let totalTasks = tasks.length;
        if (tasks.length === 0) {
            return 0
        } else {
            for (let task of tasks) {
                if (task.completed_by) {
                    completed++;
                }
            }
            return ((completed / totalTasks) * 100).toFixed(0);
        }
    }

    useEffect(() => {
        dispatch({ type: '/CLEAR_PROJECT_TASKS' });
        dispatch({ type: 'FETCH_PROJECT', payload: user.company_id })
        dispatch({
            type: 'FETCH_MEMBERS',
            payload: user.company_id
        })
        console.log(projects)
    }, [])

    return (
        <div className='projects-wrapper'>
            <div className='projects'>
                <h1>Projects</h1>
                <div className="projectHeading">
                    <h4 className='project_company_name'>{members.length > 1 ? members[0].company_name : ''}</h4>

                    <Button style={{
                        backgroundColor: 'rgb(175, 204, 54)',
                        borderColor: 'rgb(175, 204, 54)'
                    }} onClick={toggle}>New Project</Button>
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
                            <Button style={{
                                            backgroundColor: 'rgb(175, 204, 54)',
                                            borderColor: 'rgb(175, 204, 54)'
                                        }} onClick={() => {
                                if (projectTitle && projectDescription && projectDueDate) {
                                    dispatch({
                                        type: 'NEW_PROJECT',
                                        payload: {
                                            title: projectTitle,
                                            description: projectDescription,
                                            due_time: projectDueDate,
                                            user_id: user.company_id
                                        }
                                    });
                                    setProjectTitle('');
                                    setProjectDescription('');
                                    setProjectDueDate('');
                                    toggle();
                                } else {
                                    alert ('Please enter a title, description and date.')
                                }
                            }
                            }>Create</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                {projects.length < 1 ? <h1 className='nothingYet'>Nothing yet</h1> : ''}
                {
                    projects.map((project) => {
                        return (
                            <div key={project.id} onClick={() => projectTasks(project)} className='project'>
                                <div className="title-and-date">
                                    <h4>{project.title}</h4>
                                    <h6>{getFormattedDate(project.due_time)}</h6>
                                </div>
                                <h6 className='project-description'>{project.description}</h6>
                                <Progress
                                    value={calculateProgression(project.tasks)}>
                                    {calculateProgression(project.tasks)}%
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
