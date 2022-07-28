import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import swal from 'sweetalert';


function NewPartnerList({ newPartner }, args) {
    //console.log('in unassigned list', unassign);
    const dispatch = useDispatch();
    const [partnerLevel, setPartnerLevel] = useState("Partner Level")

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState)
    console.log("new partner is:", newPartner);


    function submitClick() {
        let partnerNumber = 4
        if (partnerLevel === "SKY") {
            partnerNumber = 1;
        } else if (partnerLevel === "HARVEST") {
            partnerNumber = 2;
        } else if (partnerLevel === "GREEN") {
            partnerNumber = 3;
        } else if (partnerLevel === "SEED") {
            partnerNumber = 4;
        } else

            console.log("--------", partnerNumber);
        dispatch({ type: 'UPDATE_LEVEL_COMPANY', payload: { id: newPartner.id, partnerLevel: partnerNumber } })

        swal({
            title: `${newPartner.company_name} has been set to ${partnerLevel}`,
            buttons: {
                cancel: "OK",
            },
            icon: "success"
        })

    }

    function deleteClick() {
        dispatch({ type: 'DELETE_COMPANY', payload: { id: company.id } })
    }

    return (
        <tr key={newPartner.id}>
            <td><p> {newPartner.company_name} </p></td>
            <td>
                <Dropdown
                    isOpen={dropdownOpen} toggle={toggle} >
                    <DropdownToggle caret color='primary'>
                        {partnerLevel}
                    </DropdownToggle>
                    <DropdownMenu style={{
                        zIndex: 3
                    }} {...args}>
                        <DropdownItem onClick={() => setPartnerLevel('SKY')}>SKY</DropdownItem>
                        <DropdownItem onClick={() => setPartnerLevel('HARVEST')}>HARVEST</DropdownItem>
                        <DropdownItem onClick={() => setPartnerLevel('GREEN')}>GREEN</DropdownItem>
                        <DropdownItem onClick={() => setPartnerLevel('SEED')}>SEED</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button style={{
                    backgroundColor: 'rgb(175, 204, 54)',
                    borderColor: 'rgb(175, 204, 54)',
                    marginTop: '.5em'
                }} onClick={() => submitClick()}>Submit</Button>
            </td>
            <td>
                <Button color='danger' onClick={() => deleteClick()}>Delete</Button>
            </td>

        </tr>
    )
}

export default NewPartnerList;