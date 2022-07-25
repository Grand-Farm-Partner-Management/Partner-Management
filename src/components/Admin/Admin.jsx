import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import UnassignedList from './UnassignedList';
import { Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function AdminPage(args) {
    /* 
    - make a view for freshly created companies to be accepted or deleted
    - make a view of new employees and the ability to reassign them to companies, as wel as adjust levels
    - 
    */
    const dispatch = useDispatch();
    const unassigned = useSelector((store) => store.unassigned);
    const newPartners = useSelector((store) => store.newPartner);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    console.log('unassigned are:', unassigned);
    console.log('new partners are: ', newPartners);

    const fetchUnassigned = async () => {
        await axios.get(`/api/company/unassigned`)
            .then(res => {
                dispatch({ type: `UNASSIGNED`, payload: res.data });
            })
    }

    const fetchNewPartner = async () => {
        await axios.get(`/api/company/newPartner`)
            .then(res => {
                dispatch({ type: `NEW_PARTNER`, payload: res.data });
            })
    }
    if (unassigned.company_id === null || newPartners.partner_level === null) {
        console.log(unassigned, newPartners);
        return;
    }
    useEffect(() => {
        fetchUnassigned();
        fetchNewPartner();
    }, [])

    return (
        <div>
            <h1 onClick={toggle} className='links'>Unassigned Employees</h1>
            <Collapse isOpen={isOpen} {...args} >
                {
                    unassigned.map((unassign) => {
                        return (
                            <UnassignedList unassign={unassign} />
                        )
                    })
                }
            </Collapse>
        </div>
    )
}

export default AdminPage;