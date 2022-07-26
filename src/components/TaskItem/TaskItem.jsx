import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse, Button, CardBody, Card, Progress, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Dots from '../../images/dots_icon.svg'
import Back from '../../images/back_icon.svg'
// Material
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// Swal
import swal from 'sweetalert';

function TaskItem(props, { direction, ...args }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const user = useSelector((store) => store.user);
    const tasks = useSelector((store) => store.tasks);
    const projectDetails = useSelector((store) => store.projects);
    const projectTasks = useSelector((store) => store.projectTasks);

    let projectId = params.projectId;
    let currentProject = projectDetails[0];
    let task = props.task;

    // State for drop down
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    // State for edit drop down
    const [dropdown2Open, setDropdown2Open] = useState(false);
    const toggleDropdown2 = () => setDropdown2Open(prevState => !prevState);

    const fetchTasks = () => {
        axios.get(`/api/task/projectTasks/${projectId}`)
            .then(res => {
                dispatch({ type: `PROJECT_TASKS`, payload: res.data });
                console.log(res.data)
            })
    }

    const deleteTask = async () => {
        await axios.delete(`/api/task/${task.id}`)
        fetchTasks();
    }

    const calculateProgression = async () => {

        if (!projectTasks || !currentProject) {
            return
        }

        let totalTasks = projectTasks.length;
        let completed = 0;
        let uncompleted = 0;
        for (const i of projectTasks) {
            if (i.completed_by === null) {
                uncompleted++;
            } else if (i.completed_by !== null) {
                completed++;
            }
        }
        let progression = ((completed / totalTasks) * 100).toFixed(0)
        console.log('UNCOMPLETED TI', uncompleted)
        console.log('COMPLETED TI', completed)
        console.log('TOTAL TASKS TI', totalTasks)
        console.log('PROGRESSION TI', progression)
        console.log('CURRENT PROJECT', currentProject)
        axios.put(`/api/project/${currentProject.id}/progress/`, { progress: progression });
        fetchTasks();
        fetchProjectDetails();
    }

    const fetchProjectDetails = async () => {
        axios.get(`/api/project/projectDetails/${projectId}`)
            .then(res => {
                dispatch({ type: `GET_PROJECTS`, payload: res.data });
                console.log('project details', res.data)
            })
    }

    const completeTask = async () => {
        if (checked === false) {
            console.log('complete')
            await axios.put(`/api/task/${user.first_name}`, { taskId: task.id })
            setChecked(true)
            calculateProgression();
        } else {
            console.log('uncomplete')
            await axios.put(`/api/task/uncomplete/${task.id}`)
            setChecked(false)
            calculateProgression();
        }
    };

    function getFormattedDate(date) {
        if (date === null) {
            return
        }
        let t = date.indexOf('T');
        let newDate = date.slice(0, t)
        return newDate;
    }

    const [checked, setChecked] = useState(task.completed_by === null ? false : true);

    useEffect(() => {
        console.log(task)
    }, [])

    return (
        <>
            <div className='task'>
                <Input type="checkbox" checked={checked} onChange={() => completeTask()} />
                <Label check>

                    <div className='title-and-dots'>
                        <h4 className='task-title'>{task.title}</h4> {task.completed_by ? <h6 className='completed-by'> <i>Completed by {task.completed_by}</i></h6> : ''}
                        <Dropdown isOpen={dropdown2Open} toggle={toggleDropdown2} direction={direction}>
                            <DropdownToggle style={{
                                backgroundColor: 'transparent',
                                border: 'none'
                            }}>
                                <img className='dots' src={Dots} />
                            </DropdownToggle>
                            <DropdownMenu {...args}>
                                <DropdownItem header>Task Settings</DropdownItem>
                                <DropdownItem onClick={() => console.log('add')}>Assign</DropdownItem>
                                <DropdownItem onClick={() => console.log('sub task')}>Create Sub-Task</DropdownItem>
                                <DropdownItem onClick={() => console.log('edit')}>Edit</DropdownItem>
                                <DropdownItem onClick={() => console.log('mark')}>Mark as important</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => {
                                    swal({
                                        title: `Are you sure you want to delete ${task.title}?`,
                                        text: "Once deleted, you will not be able to recover this task.",
                                        icon: "warning",
                                        buttons: true,
                                        dangerMode: true,
                                    })
                                        .then((willDelete) => {
                                            if (willDelete) {
                                                swal(`${task.title} has been deleted!`, {
                                                    icon: "success",
                                                });
                                                deleteTask();
                                            } else {
                                                swal("Process cancelled.");
                                            }
                                        });
                                }
                                } style={{
                                    color: 'red'
                                }}>Delete Task</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Label>
                <h6 className='project-description'>{getFormattedDate(task.due_time)}</h6>
                <h6>{task.description}</h6>
            </div>

        </>
    )
}

export default TaskItem;