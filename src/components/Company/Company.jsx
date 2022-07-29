import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dots from '../../images/dots_icon.svg'
import { Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody, ModalFooter, Label, Form, FormGroup } from 'reactstrap';




function Company(args) {

    const user = useSelector((store) => store.user);
    const members = useSelector((store) => store.members);
    const company = useSelector((store) => store.company);

    console.log("company", company)
    console.log("members", members)
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpenCompany, setIsOpenCompany] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const toggle3 = () => setIsOpen2(!isOpen2);
    const dispatch = useDispatch();

    // State for editin company 
    const [companyName, setCompanyName] = useState('');
    const [companyAbout, setCompanyAbout] = useState('');
    const [companyAboutCreate, setCompanyAboutCreate] = useState('');
    const [companyNameCreate, setCompanyNameCreate] = useState('');

    const addCompany = event => {
        event.preventDefault();
        dispatch({
            type: 'ADD_COMPANY',
            payload: { companyNameCreate: companyNameCreate, companyAboutCreate: companyAboutCreate }
        });
        setCompanyNameCreate('');
        setCompanyAboutCreate('');
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


    useEffect(() => {
        dispatch({ type: 'FETCH_COMPANY' })
        dispatch({
            type: 'FETCH_MEMBERS',
            payload: user.company_id
        })
        fetchMembers();
    }, [])

    return (
        <div className='wrapper'>
            <section>
                <h1>Create a Company</h1>
                <Form inline onSubmit={addCompany}>
                    <FormGroup>
                        <Label for="company name"
                            hidden
                        >
                            Company name
                        </Label>
                        <input type="text" value={companyNameCreate} onChange={(event) => setCompanyNameCreate(event.target.value)}
                            placeholder='company name' required="" />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="about company"
                            hidden
                        >
                            About company
                        </Label>
                        <input type="text" value={companyAboutCreate} onChange={(event) => setCompanyAboutCreate(event.target.value)}
                            placeholder='about the company' required="" />
                    </FormGroup>
                    {' '}
                    <Button>Submit</Button>
                </Form>
            </section>
            { company.company_name && (<div className="company-name-and-dots">
                <h1 className='companyName'>{company.company_name}</h1>
                {/* <h1 className='companyName'>{members.length > 0 ? members[0].about : ''}</h1> */}
                <img className='dots' src={Dots} onClick={() => toggle2()} />
            </div>)}
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
                        
                    }
                    }>Confirm</Button>
                </ModalFooter>
            </Modal>

            <h1 className='links'>Documents</h1>
            
            <h1 onClick={toggle3} className='links'>About</h1>
            <Collapse isOpen={isOpen2} {...args}>
            
                            <div className='member'>
                                <h4> {company.about}</h4>
                            </div>
                        
                   
                
            </Collapse>
        </div>
    )
}

export default Company;
