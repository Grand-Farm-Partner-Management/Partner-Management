import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import swal from 'sweetalert';

function AllEmployee({user}, ...args){
    console.log("all users: ", user);
    const [newCompId, setNewCompId] = useState(0)
    const [company, setCompany] = useState(user.company_name);
    const companies = useSelector((store) => store.company)
    const dispatch = useDispatch();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState)

    function assignClick(){
        dispatch({type: 'ASSIGN_USER', payload: {companyId: newCompId, userId: user.id }})

        swal({
            title: `${user.first_name} ${user.last_name} has been reassigned to ${company}`,
            buttons: {
              cancel: "OK",
            },
            icon: "success"
          })
    }
    
    function deleteClick(){
        dispatch({type: 'DELETE_USER', payload: {id: user.id}})
    }

    return(
        <div key={user.id}>
            <h4>{user.first_name} {user.last_name} works for {user.company_name} </h4>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                    <DropdownToggle caret color='primary'>
                        {company}
                    </DropdownToggle>
                    <DropdownMenu {...args}>
                    {companies.map((comp) => {
                        //console.log('in map', comp.company_name);
                        return (
                        <DropdownItem key={comp.id} onClick={() => {
                            setCompany(comp.company_name);
                            setNewCompId(comp.id);
                        }}>
                            {comp.company_name}
                        </DropdownItem>
                    )})}
                    </DropdownMenu>
                </Dropdown>
                <button onClick={() => assignClick()}>Reassign</button>
                <button onClick={() => deleteClick()}>Delete User</button>
        </div>
    )
}

export default AllEmployee;