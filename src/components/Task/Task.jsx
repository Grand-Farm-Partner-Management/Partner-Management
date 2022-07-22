import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse, Button, CardBody, Card, Progress, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Dots from '../../images/dots_icon.svg'
// Material
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// Swal
import swal from 'sweetalert';

function Task({ direction, ...args }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const user = useSelector((store) => store.user);
    const tasks = useSelector((store) => store.tasks);
    const projectDetails = useSelector((store) => store.projects);
    const projectTasks = useSelector((store) => store.projectTasks);

    let projectId = params.projectId;
    let currentProject = projectDetails[0];

    // State and function for modal
    // New Project Modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    // Edit Modal
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);

    // State for drop down
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    // State for edit drop down
    const [dropdown2Open, setDropdown2Open] = useState(false);
    const toggleDropdown2 = () => setDropdown2Open(prevState => !prevState);

    // State for editing a project
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectDueDate, setProjectDueDate] = useState('');
    const [date, setDate] = useState(new Date());

    // Fetching tasks

    const fetchTasks = () => {
        axios.get(`/api/task/projectTasks/${projectId}`)
            .then(res => {
                dispatch({ type: `PROJECT_TASKS`, payload: res.data });
            })
    }

    // Fetching project details

    const fetchProjectDetails = () => {
        axios.get(`/api/project/projectDetails/${projectId}`)
            .then(res => {
                dispatch({ type: `GET_PROJECTS`, payload: res.data });
                console.log('project details', res.data)
            })
    }

    const deleteProject = async () => {
        await axios.delete(`/api/project/${projectId}/delete`)
        history.push('/projects')
    }

    const editProject = async (body) => {
        await axios.put(`/api/project/${projectId}/update`, body)
        fetchProjectDetails();
        toggle2();
    }

    const createTask = async (body) => {
        console.log('current', currentProject)

        if (!body.projectTitle) {
            body.projectTitle === currentProject.title;
        }
        await axios.post(`/api/task`, body)
            .then(async res => {
                fetchTasks();
            })
    }

    function getFormattedDate(date) {
        if (date === null) {
            return
        }
        let t = date.indexOf('T');
        let newDate = date.slice(0, t)
        return newDate;
    }

    useEffect(() => {
        dispatch({
            type: 'PROJECT_ID',
            payload: projectId
        })
        fetchTasks();
        fetchProjectDetails();
    }, [])

    // CATCHING ERRORS / UNLOADED DATA

    if (currentProject === undefined) {
        return 'No tasks yet'
    };

    return (
        <div className='task-flex'>
            <div className='task-wrapper'>
                <div className="dot-and-task">
                    <h1>{currentProject.title}</h1>

                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} direction={direction}>
                        <DropdownToggle style={{
                            backgroundColor: 'transparent',
                            border: 'none'
                        }}>
                            <img className='dots' src={Dots} />
                        </DropdownToggle>
                        <DropdownMenu {...args}>
                            <DropdownItem header>Project Settings</DropdownItem>
                            <DropdownItem onClick={() => toggle2()}>Edit</DropdownItem>

                            {/* EDIT MODAL */}

                            <Modal isOpen={modal2} toggle={toggle2} {...args}>
                                <ModalHeader toggle={toggle2}>Edit Project</ModalHeader>
                                <ModalBody>
                                    <label htmlFor='project-title'>Project Title:</label>
                                    <input defaultValue={currentProject.title} onChange={(e) => setProjectTitle(e.target.value)} id='project-title' />
                                    <br />
                                    <label htmlFor='project-description'>Project Description:</label>
                                    <input defaultValue={currentProject.description} onChange={(e) => setProjectDescription(e.target.value)} id='project-description' />
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
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={() => {
                                        editProject({ title: projectTitle, description: projectDescription, due_time: projectDueDate });
                                        toggle2();
                                    }
                                    }>Confirm</Button>
                                </ModalFooter>
                            </Modal>

                            <DropdownItem onClick={() => console.log('add')}>Add Members</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => {
                                swal({
                                    title: `Are you sure you want to delete ${currentProject.title}?`,
                                    text: "Once deleted, you will not be able to recover this project.",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            swal(`${currentProject.title} has been deleted!`, {
                                                icon: "success",
                                            });
                                            deleteProject();
                                        } else {
                                            swal("Process cancelled.");
                                        }
                                    });
                            }
                            } style={{
                                color: 'red'
                            }}>Delete Project</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                </div>
                <div className="project-details">
                    <h3 className='project-description'>{currentProject.description}</h3>
                    <Button onClick={toggle}>New Task</Button>
                </div>
                <h6 className='project-description'>{getFormattedDate(currentProject.due_time)}</h6>

                {/* MODAL START */}

                <Modal isOpen={modal} toggle={toggle} {...args}>
                    <ModalHeader toggle={toggle}>New Task</ModalHeader>
                    <ModalBody>
                        <label htmlFor='project-title'>Task Title:</label>
                        <input onChange={(e) => setProjectTitle(e.target.value)} id='project-title' />
                        <br />
                        <label htmlFor='project-description'>Task Description:</label>
                        <input onChange={(e) => setProjectDescription(e.target.value)} id='project-description' />
                        <br />
                        <label htmlFor='project-due-date'>Task Due-Date: </label>
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
                            createTask({ title: projectTitle, description: projectDescription, due_time: projectDueDate });
                            toggle();
                        }
                        }>Create</Button>
                    </ModalFooter>
                </Modal>

                {/* MODAL END */}

                <Progress
                    style={{
                        marginTop: '2em'
                    }}
                    value={currentProject.progression}>
                    {currentProject.progression}%
                </Progress>
                <div className="sort-tabs">
                    <h3 className='tab'>All Tasks</h3>
                    <h3 className='tab'>My Tasks</h3>
                    <h3 className='tab'>Completed</h3>
                </div>
                <div className='taskHub'>
                    {
                        projectTasks.length === 0 ? <h1 className='no-tasks'>No Tasks Yet</h1> : projectTasks.map((task) => {
                            return (
                                <div className='task'>
                                    <Input type="checkbox" />
                                    <Label check>
                                        <div className='title-and-dots'>
                                            <Dropdown isOpen={dropdown2Open} toggle={toggleDropdown2} direction={direction}>
                                                <DropdownToggle style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none'
                                                }}>
                                                    <img className='dots' src={Dots} />
                                                </DropdownToggle>
                                                <DropdownMenu {...args}>
                                                    <DropdownItem header>Project Settings</DropdownItem>
                                                    <DropdownItem onClick={() => console.log('add')}>Add Members</DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem onClick={() => {
                                                        swal({
                                                            title: `Are you sure you want to delete ${currentProject.title}?`,
                                                            text: "Once deleted, you will not be able to recover this project.",
                                                            icon: "warning",
                                                            buttons: true,
                                                            dangerMode: true,
                                                        })
                                                            .then((willDelete) => {
                                                                if (willDelete) {
                                                                    swal(`${currentProject.title} has been deleted!`, {
                                                                        icon: "success",
                                                                    });
                                                                    deleteProject();
                                                                } else {
                                                                    swal("Process cancelled.");
                                                                }
                                                            });
                                                    }
                                                    } style={{
                                                        color: 'red'
                                                    }}>Delete Project</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                            <h4>{task.title}</h4>
                                        </div>
                                    </Label>
                                    <h6>{getFormattedDate(task.due_time)}</h6>
                                    <h6>{task.description}</h6>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Task;
