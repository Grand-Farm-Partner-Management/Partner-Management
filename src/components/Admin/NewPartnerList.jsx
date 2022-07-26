import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function NewPartnerList({newPartner}) {
    //console.log('in unassigned list', unassign);
    const [partnerLevel, setPartnerLevel] = useState(newPartner.partnerLevel)
    
    return (
        <div key={newPartner.id}>
            <h4> {newPartner.company_name} </h4>
            <button>Add</button>
        </div>
    )
}

export default NewPartnerList;