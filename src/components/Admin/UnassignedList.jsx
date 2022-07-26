import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import swal from 'sweetalert';

function UnassignedList({ unassign }, ...args) {
    const dispatch = useDispatch();
    const [company, setCompany] = useState("Companies");
    const [newCompId, setNewCompId] = useState(0)
    const companies = useSelector((store) => store.company)
    console.log('----', companies);

    const fetchCompany = () => {
        dispatch({ type: 'FETCH_COMPANY' })
    }

    useEffect(() => {
        fetchCompany();
    }, [])

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState)

    function assignClick(){
        dispatch({type: 'ASSIGN_USER', payload: {id: newCompId }})

        swal({
            title: `${unassign.first_name} ${unassign.last_name} has been assigned to ${company}`,
            buttons: {
              cancel: "OK",
            },
            icon: "success"
          })
    }

    return (
        <div key={unassign.id}>
            <h4>{unassign.first_name}, {unassign.last_name}, {unassign.email} </h4>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                <DropdownToggle caret color='primary'>
                    {company}
                </DropdownToggle>
                <DropdownMenu {...args}>
                    {companies.map((comp) => {
                        //console.log('in map', comp.company_name);
                        return (
                        <DropdownItem onClick={() => {
                            setCompany(comp.company_name);
                            setNewCompId(comp.id);
                        }}>
                            {comp.company_name}
                        </DropdownItem>
                    )})}
                </DropdownMenu>
            </Dropdown>
            <button onClick={() => assignClick()}>Assign</button>
        </div>
    )
}

export default UnassignedList;