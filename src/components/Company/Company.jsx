import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dots from '../../images/dots_icon.svg'
import Delete from '../../images/delete_icon.svg'
import { Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';




function Company(args) {

    const user = useSelector((store) => store.user);
    const members = useSelector((store) => store.members);
    const company = useSelector((store) => store.company);
    const documents = useSelector((store) => store.documents);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpenCompany, setIsOpenCompany] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const toggle3 = () => setIsOpen2(!isOpen2);
    const toggleCompany1 = () => setIsOpenCompany(!isOpenCompany);
    const dispatch = useDispatch();

    // State for editing company 
    const [companyName, setCompanyName] = useState('');
    const [companyAbout, setCompanyAbout] = useState('');

    // Collapse for documents
    const [isOpenDoc, setIsOpenDoc] = useState(false);
    const toggleDoc = () => setIsOpenDoc(!isOpenDoc);

    // State for creating a company
    const [modalCompany, setmodalCompany] = useState(false);
    const toggleModalCompany = () => setmodalCompany(!modalCompany);

    //  Add to Docs Modal
    const [modalDocAdd, setModalDocAdd] = useState(false);
    const toggleDocAdd = () => setModalDocAdd(!modalDocAdd);

    //  State for adding to docs
    const [link, setLink] = useState('');
    const [linkTitle, setLinkTitle] = useState('');

    const addCompany = event => {
        // event.preventDefault();
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

    const editCompany =  (body) => {
        axios.put(`/api/company/${user.company_id}`, body);
        dispatch({ type: 'FETCH_COMPANY', payload: user.company_id })
        toggle2();
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_COMPANY', payload: user.company_id })
        dispatch({ type: 'FETCH_MEMBERS', payload: user.company_id })
        dispatch({ type: 'FETCH_DOCUMENTS', payload: user.company_id })
    }, [])

    return (

        <div className='wrapper'>
            <Button style={{
                backgroundColor: 'rgb(175, 204, 54)',
                borderColor: 'rgb(175, 204, 54)'
            }} className='create-company' onClick={() => toggleModalCompany()}>Create Company</Button>

            {/* COMPANY MODAL */}

            <Modal isOpen={modalCompany} toggle={toggleModalCompany} {...args}>
                <ModalHeader toggle={toggleModalCompany}>Create Company</ModalHeader>
                <ModalBody>
                    <label htmlFor='company-name'>Company Name:</label>
                    <input id='company-name' value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
                    <br></br>
                    <label htmlFor='company-about'>About:</label>
                    <input id='company-about' value={companyAbout} onChange={(event) => setCompanyAbout(event.target.value)} />
                </ModalBody>

                <ModalFooter>
                    <Button style={{
                        backgroundColor: 'rgb(175, 204, 54)',
                        borderColor: 'rgb(175, 204, 54)'
                    }} onClick={() => {
                        editCompany({
                            companyName: companyName,
                            companyAbout: companyAbout
                        });
                        dispatch({ type: 'FETCH_COMPANY', payload: user.company_id })
                        toggle2();
                    }
                    }>Confirm</Button>
                </ModalFooter>
            </Modal>


            <div className="company-name-and-dots">
                <h1 className='companyName'>{members.length > 0 ? members[0].company_name : ''}</h1>
                <img className='dots' src={Dots} onClick={() => toggle2()} />
            </div>
            <h1 onClick={() => {
                toggle()
                setIsOpen2(false);
                setIsOpenDoc();
            }} className='links'>Members</h1>
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
                    <textarea onChange={(e) => setCompanyAbout(e.target.value)} id='project-title' />
                    <br />
                </ModalBody>

                <ModalFooter>
                    <Button style={{
                        backgroundColor: 'rgb(175, 204, 54)',
                        borderColor: 'rgb(175, 204, 54)'
                    }} onClick={() => {
                        editCompany({
                            companyName: companyName,
                            companyAbout: companyAbout
                        });
                        toggle2();
                    }
                    }>Confirm</Button>
                </ModalFooter>
            </Modal>

            <h1 onClick={() => {
                toggleDoc();
                setIsOpen(false);
                setIsOpen2(false);
            }
            } className='links'>Documents</h1>

            <Collapse isOpen={isOpenDoc} {...args}>
                <div className='docs'>
                    <div className="button-and-desc">
                        <Button style={{
                            backgroundColor: 'rgb(175, 204, 54)',
                            borderColor: 'rgb(175, 204, 54)'
                        }} onClick={() => toggleDocAdd()}>Add Link</Button>
                        <p>Here is where external links to documents relevent to this company can be kept.</p>
                    </div>
                    <br></br>
                    {
                        documents.map((document) => {
                            return (
                                <div className='doc-list'>
                                    <a href={document.link} target='_blank'><h2>{document.link_title}</h2></a>
                                    <img src={Delete} className='delete' onClick={() => {
                                        dispatch({ type: 'DELETE_DOCUMENT', payload: document.id })
                                    }} />
                                </div>
                            )
                        })
                    }
                </div>
            </Collapse>
            <Modal isOpen={modalDocAdd} toggle={toggleDocAdd} {...args}>
                <ModalHeader toggle={toggleDocAdd}>Add Link</ModalHeader>
                <ModalBody>
                    <label htmlFor='link'>Link: </label>
                    <input style={{
                        width: '60%'
                    }} placeholder="ex: https://www.google.com/" onChange={(e) => setLink(e.target.value)} id='link' />
                    <br />
                    <label htmlFor='link-title'>Link Title: </label>
                    <input style={{
                        width: '60%'
                    }} placeholder="ex: Google" onChange={(e) => setLinkTitle(e.target.value)} id='link-title' />
                </ModalBody>
                <ModalFooter>
                    <Button style={{
                        backgroundColor: 'rgb(175, 204, 54)',
                        borderColor: 'rgb(175, 204, 54)'
                    }} onClick={() => {
                        // addDocument({ link: link, linkTitle: linkTitle });
                        dispatch({ type: 'CREATE_DOCUMENT', payload: { companyId: user.company_id, body: { link: link, linkTitle: linkTitle } } })
                        toggleDocAdd();
                    }
                    }>Confirm</Button>
                </ModalFooter>
            </Modal>
            <h1 onClick={() => {
                toggle3();
                setIsOpen(false);
                setIsOpenDoc(false);
            }} className='links'>About</h1>
            <Collapse isOpen={isOpen2} {...args}>
                <div className='about-section'>
                <h4 className='about'>{company.length > 0 ? company[0].about : ''}</h4>
                </div>
            </Collapse>
        </div>
    )
}

export default Company;
