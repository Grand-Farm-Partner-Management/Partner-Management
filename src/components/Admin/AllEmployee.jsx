import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import swal from 'sweetalert';

function AllEmployee({user}, ...args){
    console.log("all users: ", user);

    const dispatch = useDispatch();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState)

    

    return(
        <div key={user.id}>
            <h4>{user.first_name} {user.last_name} works for X company </h4>
            {/* <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                    <DropdownToggle caret color='primary'>
                        {newPartnerLevel}
                    </DropdownToggle>
                    <DropdownMenu {...args}>
                        <DropdownItem onClick={()=> setNewPartnerLevel('SKY')}>SKY</DropdownItem>
                        <DropdownItem onClick={()=> setNewPartnerLevel('HARVEST')}>HARVEST</DropdownItem>
                        <DropdownItem onClick={()=> setNewPartnerLevel('GREEN')}>GREEN</DropdownItem>
                        <DropdownItem onClick={()=> setNewPartnerLevel('SEED')}>SEED</DropdownItem>
                    </DropdownMenu>
                </Dropdown> */}
                <button onClick={() => submitClick()}>Update</button>
                <button onClick={() => deleteClick()}>Delete</button>
        </div>
    )
}

export default AllEmployee;