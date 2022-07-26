import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
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
        if(partnerLevel === "SKY"){
            partnerNumber = 1;
        } else if(partnerLevel === "HARVEST"){
            partnerNumber = 2;
        } else if(partnerLevel === "GREEN"){
            partnerNumber = 3;
        } else if(partnerLevel === "SEED"){
            partnerNumber = 4;
        } else 

        console.log("--------",partnerNumber);
        dispatch({type: 'UPDATE_LEVEL_COMPANY', payload: {id: newPartner.id, partnerLevel: partnerNumber}})

        swal({
            title: `${newPartner.company_name} has been set to ${partnerLevel}`,
            buttons: {
              cancel: "OK",
            },
            icon: "success"
          })
          
    }

    function deleteClick(){
        dispatch({type: 'DELETE_COMPANY', payload: {id: company.id}})
    }

    return (
        <div key={newPartner.id}>
            <div>
                <h4> {newPartner.company_name} </h4>
                <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                    <DropdownToggle caret color='primary'>
                        {partnerLevel}
                    </DropdownToggle>
                    <DropdownMenu {...args}>
                        <DropdownItem onClick={()=> setPartnerLevel('SKY')}>SKY</DropdownItem>
                        <DropdownItem onClick={()=> setPartnerLevel('HARVEST')}>HARVEST</DropdownItem>
                        <DropdownItem onClick={()=> setPartnerLevel('GREEN')}>GREEN</DropdownItem>
                        <DropdownItem onClick={()=> setPartnerLevel('SEED')}>SEED</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <button onClick={() => submitClick()}>Submit</button>
                <button onClick={() => deleteClick()}>Delete</button>

            </div>
        </div>
    )
}

export default NewPartnerList;