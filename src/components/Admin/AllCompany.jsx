import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import swal from 'sweetalert';

function AllCompanies({company}, ...args){
    console.log("all companies, company: ", company);

    const dispatch = useDispatch();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState)

    if (company.partner_level === 0){
        company.level_name = "GRAND FARM"
    }else if (company.partner_level === 1){
        company.level_name = "SKY"
    }else if (company.partner_level === 2){
        company.level_name = "HARVEST"
    }else if (company.partner_level === 3){
        company.level_name = "GREEN"
    }else if (company.partner_level === 4){
        company.level_name = "SEED"
    }else {
        company.level_name = "Company has not been accepted"
    }

    function submitClick() {
        let partnerNumber = 4
        if(newPartnerLevel === "SKY"){
            partnerNumber = 1;
        } else if(newPartnerLevel === "HARVEST"){
            partnerNumber = 2;
        } else if(newPartnerLevel === "GREEN"){
            partnerNumber = 3;
        } else if(newPartnerLevel === "SEED"){
            partnerNumber = 4;
        } else 

        console.log("--------",partnerNumber);
        dispatch({type: 'UPDATE_LEVEL_COMPANY', payload: {id: company.id, partnerLevel: partnerNumber}})

        swal({
            title: `${company.company_name} has been set to ${newPartnerLevel}`,
            buttons: {
              cancel: "OK",
            },
            icon: "success"
          })
          
    }

    function deleteClick(){
        dispatch({type: 'DELETE_COMPANY', payload: {id: company.id}})
    }

    const [newPartnerLevel, setNewPartnerLevel] = useState(company.level_name)

    return(
        <div key={company.id}>
            <h4>{company.company_name} is partner level {company.level_name} </h4>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                    <DropdownToggle caret color='primary'>
                        {newPartnerLevel}
                    </DropdownToggle>
                    <DropdownMenu {...args}>
                        <DropdownItem onClick={()=> setNewPartnerLevel('SKY')}>SKY</DropdownItem>
                        <DropdownItem onClick={()=> setNewPartnerLevel('HARVEST')}>HARVEST</DropdownItem>
                        <DropdownItem onClick={()=> setNewPartnerLevel('GREEN')}>GREEN</DropdownItem>
                        <DropdownItem onClick={()=> setNewPartnerLevel('SEED')}>SEED</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <button onClick={() => submitClick()}>Update</button>
                <button onClick={() => deleteClick()}>Delete</button>
        </div>
    )
}

export default AllCompanies