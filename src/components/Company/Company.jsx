import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dots from '../../images/dots_icon.svg'
import { Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';




function Company(args) {

    const user = useSelector((store) => store.user);
    const members = useSelector((store) => store.members);
    const company = useSelector((store) => store.company);
    console.log("company", company)

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const toggle3 = () => setIsOpen2(!isOpen2);
    const dispatch = useDispatch();

    // State for editin company 
    const [companyName, setCompanyName] = useState('');
    const [companyAbout, setCompanyAbout] = useState('');

    const addCompany = event => {
        event.preventDefault();
        dispatch({
            type: 'ADD_COMPANY',
            payload: { companyName: companyName, companyAbout: companyAbout }
        });
        setCompanyName('');
        setCompanyAbout('');
    }
    //  Edit Modal
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);


    const fetchMembers = async () => {
        await axios.get(`/api/company/members/${user.company_id}`)
            .then(res => {
                dispatch({ type: `GET_MEMBERS`, payload: res.data });
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
        console.log(user)
    }, [])

    return (
        <div className='wrapper'>
            <section onSubmit={addCompany}>
                <input type="text" value={companyName} onChange={(event) => setCompanyName(event.target.value)}
                 placeholder='company name' required="" />
                <input  type="text" value={companyAbout} onChange={(event) => setCompanyName(event.target.value)} placeholder='about the company' required="" />
            </section>
            <Button className='create-company'>Create Company</Button>
            <div className="company-name-and-dots">
                <h1 className='companyName'>{members.length > 0 ? members[0].company_name : ''}</h1>
                {/* <h1 className='companyName'>{members.length > 0 ? members[0].about : ''}</h1> */}
                <img className='dots' src={Dots} onClick={() => toggle2()} />
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
                    <label htmlFor='about'>About the company:</label>
                    <input onChange={(e) => setCompanyAbout(e.target.value)} id='project-title' />
                    <br />
                </ModalBody>

                <ModalFooter>
                    <Button onClick={() => {
                        editCompany({
                            companyName: companyName,
                            companyAbout: companyAbout
                        });
                        toggle2();
                        e
                    }
                    }>Confirm</Button>
                </ModalFooter>
            </Modal>

            <h1 className='links'>Documents</h1>
            <h1 onClick={toggle3} className='links'>About</h1>
            <Collapse isOpen={isOpen2} {...args}>
                {
                    members.map((member) => {
                        return (
                            <div className='member'>
                                <h4> {member.about}</h4>
                            </div>
                        )
                    })
                }
            </Collapse>
        </div>
    )
}

export default Company;
