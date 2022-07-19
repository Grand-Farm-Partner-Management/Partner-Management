import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse, Button, CardBody, Card, Progress } from 'reactstrap';


function Projects(args) {

    const user = useSelector((store) => store.user);
    const projects = useSelector((store) => store.projects);
    const members = useSelector((store) => store.members);

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const dispatch = useDispatch();

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

    useEffect(() => {
        fetchProjects();
        fetchMembers();
    }, [])

    return (
        <div className='projects-wrapper'>
            <div className='projects'>
                <div className="projectHeading">
                    <h1>Projects</h1>
                    <Button>New Project</Button>
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
