import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse, Button, CardBody, Card, Progress, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function Projects(args) {

    const user = useSelector((store) => store.user);
    const projects = useSelector((store) => store.projects);
    const members = useSelector((store) => store.members);
    const dispatch = useDispatch();

    // State and function for modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    console.log(projectTitle);

    // State for creating a new project
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectDueDate, setProjectDueDate] = useState('');

    const fetchProjects = async () => {
        await axios.get(`/api/project/${user.company_id}`)
            .then(res => {
                dispatch({ type: `GET_PROJECTS`, payload: res.data });
                console.log(res.data)
            })
    }

    const fetchMembers = async () => {
        await axios.get(`/api/company/members/${user.company_id}`)
            .then(res => {
                dispatch({ type: `GET_MEMBERS`, payload: res.data });
            })
    }

    const createProject = async (body) => {
        await axios.post(`/api/project/${user.company_id}`, body)
            .then(res => {
                fetchProjects();
            })
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
                            <label htmlFor = 'project-title'>Project Title:</label>
                            <input onChange={(e) => setProjectTitle(e.target.value)} id='project-title'/>
                            <br/>
                            <label htmlFor = 'project-description'>Project Description:</label>
                            <input onChange={(e) => setProjectDescription(e.target.value)} id ='project-description'/>
                            <br/>
                            <label htmlFor = 'project-due-date'>Project Due Date:</label>
                            <input onChange={(e) => setProjectDueDate(e.target.value)} id ='project-due-date'/>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => {
                                createProject({title: projectTitle, description: projectDescription, due_time: projectDueDate})
                                fetchProjects()
                                toggle()
                            }
                                }>Create</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <h4 className='project_company_name'>{members.length > 1 ? members[0].company_name : ''}</h4>
                {
                    projects.map((project) => {
                        return (
                            <div className='project'>
                                <h4>{project.title}</h4>
                                <h6>{project.description}</h6>
                                <Progress animated
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
