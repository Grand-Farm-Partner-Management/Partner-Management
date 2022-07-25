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

    const completeTask = async () => {
        await axios.put(`/api/task/${user.id}`, {taskId: task.id})
        fetchTasks();
    }

    const uncompleteTask = async () => {
        console.log('in uncompleteTask')
        await axios.put(`/api/task/uncomplete`, {taskId: task.id})
        fetchTasks();
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
        console.log(task)
    }, [])

    return (
        <>
            <div className='task'>
                {task.completed_by === null ? <Input type="checkbox" onChange={() => completeTask()} />
                    : <Input type="checkbox" checked onChange={() => uncompleteTask()} />}
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
                                <DropdownItem header>Task Settings</DropdownItem>
                                <DropdownItem onClick={() => console.log('add')}>Assign</DropdownItem>
                                <DropdownItem onClick={() => console.log('add')}>Create Sub-Task</DropdownItem>
                                <DropdownItem onClick={() => console.log('add')}>Edit</DropdownItem>
                                <DropdownItem onClick={() => console.log('add')}>Mark as important</DropdownItem>
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
                        <h4 className='task-title'>{task.title}</h4> {task.completed_by ? <h6 className='completed-by'> <i>Completed by {task.completed_by}</i></h6> : ''}
                    </div>
                </Label>
                <h6 className='project-description'>{getFormattedDate(task.due_time)}</h6>
                <h6>{task.description}</h6>
            </div>

        </>
    )
}

export default TaskItem;