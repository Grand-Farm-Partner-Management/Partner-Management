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
    const documents = useSelector((store) => store.documents);
    

    // Collapse for members
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpenCompany, setIsOpenCompany] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const toggle3 = () => setIsOpen2(!isOpen2);
    const toggleCompany1 = () => setIsOpenCompany(!isOpenCompany);
    const dispatch = useDispatch();
    

    // Collapse for documents
    const [isOpenDoc, setIsOpenDoc] = useState(false);
    const toggleDoc = () => setIsOpenDoc(!isOpenDoc);

    // State for editing company 
    const [companyName, setCompanyName] = useState('');
    const [companyAbout, setCompanyAbout] = useState('');

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
    const [modalCompany, setModalCompany] = useState(false);
    const toggle2 = () => setModal2(!modal2);
    const toggleCompany = () => setModalCompany(!modalCompany);


    //  Add to Docs Modal
    const [modalDocAdd, setModalDocAdd] = useState(false);
    const toggleDocAdd = () => setModalDocAdd(!modalDocAdd);

    //  State for adding to docs
    const [link, setLink] = useState('');
    const [linkTitle, setLinkTitle] = useState('');

    const fetchMembers = async () => {
        await axios.get(`/api/company/members/${user.company_id}`)
            .then(res => {
                dispatch({ type: `SET_MEMBERS`, payload: res.data });
            })
    }

    const fetchDocuments = async () => {
        await axios.get(`/api/document/${user.company_id}`)
            .then(res => {
                dispatch({ type: `SET_DOCUMENTS`, payload: res.data });
            })
    }

    const editCompany = async (body) => {
        await axios.put(`/api/company/${user.company_id}`, body);
        await fetchMembers();
        toggle2();
        toggleCompany();
    }


    useEffect(() => {
        dispatch({ type: 'FETCH_COMPANY', payload: user.user_id })
    const addDocument = (body) => {
        axios.post(`/api/document/${user.company_id}`, body).then(res => fetchDocuments())
        console.log(documents)
    }

    // const createCompany = () => {
    //     await axios.post(`/api/company/members/${user.company_id}`)
    //     .then(res => {
    //         dispatch({ type: `GET_MEMBERS`, payload: res.data });
    //     })
    // }

    useEffect(() => {
        fetchMembers();
        fetchDocuments();
    }, [])

    return (
        <div className='wrapper'>
            <section>

                <form onSubmit={addCompany}>
                    <input type="text" value={companyName} onChange={(event) => setCompanyName(event.target.value)}
                        placeholder='company name' required="" />


                    <input type="text" value={companyAbout} onChange={(event) => setCompanyAbout(event.target.value)}
                        placeholder='about the company' required="" />
                    <button type="submit" >submit</button>
                </form>
            </section>
            <Button className='create-company'>Create Company</Button>
                <Modal isOpenCompany={modalCompany} toggle={toggleCompany}>
                    <ModalBody toggle={toggleCompany}>Create company</ModalBody>
                    <ModalBody>
                        <label htmlFor='project-title'>company Name:</label>
                        <form onSubmit={addCompany}>
                            <input type="text" value={companyName} onChange={(event) => setCompanyName(event.target.value)} id='project-title'
                                placeholder='company name' required="" />

                            <label htmlFor='about'>About the company:</label>
                                <input type="text" value={companyAbout} onChange={(event) => setCompanyAbout(event.target.value)}
                                placeholder='about the company' required="" />
                            <button type="submit" >submit</button>
                        </form>

                    </ModalBody>
                </Modal>


            
            <Button style={{
                backgroundColor: 'rgb(175, 204, 54)',
                borderColor: 'rgb(175, 204, 54)'
            }} className='create-company'>Create Company</Button>
            <div className="company-name-and-dots">
                <h1 className='companyName'>{members.length > 0 ? members[0].company_name : ''}</h1>
                <img className='dots' src={Dots} onClick={() => toggle2()} />
            </div>
            <h1 onClick={() => {
                toggle();
                setIsOpenDoc(false);
            }
            } className='links'>Members</h1>
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

            <h1 onClick={() => {
                toggleDoc();
                setIsOpen(false);
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
                                        axios.delete(`/api/document/${document.id}`)
                                        fetchDocuments();
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
                        addDocument({ link: link, linkTitle: linkTitle });
                        toggleDocAdd();
                    }
                    }>Confirm</Button>
                </ModalFooter>
            </Modal>

            <h1 className='links'>About</h1>
        </div>
    )
})
}

export default Company;
