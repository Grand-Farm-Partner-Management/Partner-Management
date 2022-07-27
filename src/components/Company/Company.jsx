import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dots from '../../images/dots_icon.svg'
import { Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';




function Company(args) {

    const user = useSelector((store) => store.user);
    const members = useSelector((store) => store.members);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const dispatch = useDispatch();

    // State for editin company 
    const [companyName, setCompanyName] = useState('');

    //  Edit Modal
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);

    const fetchMembers = async () => {
        await axios.get(`/api/company/members/${user.company_id}`)
            .then(res => {
                dispatch({ type: `SET_MEMBERS`, payload: res.data });
            })
    }

    const editCompany = async (body) => {
        await axios.put(`/api/company/${user.company_id}`, body);
        await fetchMembers();
        toggle2();
    }

    // const createCompany = () => {
    //     await axios.post(`/api/company/members/${user.company_id}`)
    //     .then(res => {
    //         dispatch({ type: `GET_MEMBERS`, payload: res.data });
    //     })
    // }

    useEffect(() => {
        fetchMembers();
        console.log(members)
    }, [])

    return (
        <div className='wrapper'>
            <Button style={{
                            backgroundColor: 'rgb(175, 204, 54)',
                            borderColor: 'rgb(175, 204, 54)'
                        }} className='create-company'>Create Company</Button>
            <div className="company-name-and-dots">
                <h1 className='companyName'>{members.length > 0 ? members[0].company_name : ''}</h1>
                <img className='dots' src={Dots} onClick = {() => toggle2()} />
            </div>
            <h1 onClick={toggle} className='links'>Members</h1>
            <Collapse isOpen={isOpen} {...args}>
                {
                    members.map((member) => {
                        return (
                            <div className='member'>
                                <h4>{member.first_name} {member.last_name}</h4>
                            </div>
                        )
                    })
                }
            </Collapse>

            <Modal isOpen={modal2} toggle={toggle2} {...args}>
                <ModalHeader toggle={toggle2}>Edit Company</ModalHeader>
                <ModalBody>
                    <label htmlFor='project-title'>Company Name:</label>
                    <input onChange={(e) => setCompanyName(e.target.value)} id='project-title' />
                    <br />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => {
                        editCompany({ companyName: companyName });
                        toggle2();
                    }
                    }>Confirm</Button>
                </ModalFooter>
            </Modal>

            <h1 className='links'>Documents</h1>
            <h1 className='links'>About</h1>
        </div>
    )
}

export default Company;
