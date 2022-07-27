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
    const allUsers = useSelector((store) => store.allUser);
    const companyUser = useSelector((store) => store.members);

    console.log("company user:", user);

    const [assignedId, setAssignedId] = useState(0);
    const [assignedName, setAssignedName] = useState("Company Members");


    let projectId = params.projectId;
    let currentProject = projectDetails[0];
    let task = props.task;

    //assign user to task
    const [modal1, setModal1] = useState(false);
    const toggle1 = () => setModal1(!modal1);

    // State for drop down
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    // State for edit drop down
    const [dropdown2Open, setDropdown2Open] = useState(false);
    const toggleDropdown2 = () => setDropdown2Open(prevState => !prevState);

    //state for assigning users to task drop down
    const [dropdown3Open, setDropdown3Open] = useState(false);
    const toggleDropdown3 = () => setDropdown3Open(prevState => !prevState);

    const completeTask = async () => {
        if (!task.completed_by) {
            console.log('complete')
            dispatch({
                type: 'COMPLETE_TASK',
                payload: {
                    completedBy: user.first_name,
                    taskId: task.id,
                    projectId: projectId
                }
            })
        } else {
            console.log('uncomplete')
            dispatch({
                type: 'UNCOMPLETE_TASK',
                payload: {
                    taskId: task.id,
                    projectId: projectId
                }
            })
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

    useEffect(() => {
        console.log("task is:", task)
        dispatch({type: 'FETCH_MEMBERS', payload: user.company_id});
    }, [])

    return (
        <>
            <div className='task'>
                <Input type="checkbox" checked={task.completed_by === null ? false : true} onChange={() => completeTask()} />
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
                                <DropdownItem onClick={() => toggle1()}>Assign</DropdownItem>

                                {/* start assign modal */}

                                <Modal isOpen={modal1} toggle={toggle1} {...args}>
                                    <ModalHeader toggle={toggle1}>Assign A User</ModalHeader>
                                    <ModalBody>
                                        <label htmlFor='project-title'>Assign User to Task:</label>

                                            {/* start dropdown */}

                                        <Dropdown isOpen={dropdown3Open} toggle={toggleDropdown3} >
                                            <DropdownToggle caret color='primary'>
                                                {assignedName}
                                            </DropdownToggle>
                                            <DropdownMenu {...args}>
                                                {companyUser.map((member) => {
                                                    console.log("mapping: ", member);
                                                    return (
                                                        <DropdownItem key={member.id} onClick={() => {
                                                        setAssignedId(member.id);
                                                        setAssignedName(member.first_name +" "+ member.last_name)
                                                        }}>
                                                            {member.first_name} {member.last_name}
                                                        </DropdownItem>
                                                    )
                                                })}
                                            </DropdownMenu>
                                        </Dropdown>

                                                {/* end dropdown */}

                                        <br />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button style={{
                                            backgroundColor: 'rgb(175, 204, 54)',
                                            borderColor: 'rgb(175, 204, 54)'
                                        }} onClick={() => {
                                            editProject({});
                                            toggle1();
                                        }
                                        }>Confirm</Button>
                                    </ModalFooter>
                                </Modal>

                                {/* end assign modal */}

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
                                                dispatch({ type: 'DELETE_TASK', payload: { taskId: task.id, projectId: projectId } })
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