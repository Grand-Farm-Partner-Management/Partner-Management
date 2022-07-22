import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse, Button, CardBody, Card } from 'reactstrap';


function Company(args) {

    const user = useSelector((store) => store.user);
    const members = useSelector((store) => store.members);

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const dispatch = useDispatch();

    const fetchMembers = async () => {
        await axios.get(`/api/company/members/${user.company_id}`)
            .then(res => {
                dispatch({ type: `GET_MEMBERS`, payload: res.data });
            })
    }

    useEffect(() => {
        fetchMembers();
        console.log(members)
    }, [])

    return (
        <div className='wrapper'>
        <Button className='create-company'>Create Company</Button>
            <h1 className='companyName'>{members.length > 1 ? members[0].company_name: ''}</h1>
            <h1 onClick={toggle} className='links'>Members</h1>
            <Collapse isOpen={isOpen} {...args}>
            {
                members.map((member) => {
                    return (
                        <dov className='member'>
                            <h4>{member.first_name} {member.last_name}</h4>
                        </dov>
                    )
                })
            }
            </Collapse>
            <h1 className='links'>Documents</h1>
            <h1 className='links'>About</h1>
        </div>
    )
}

export default Company;
