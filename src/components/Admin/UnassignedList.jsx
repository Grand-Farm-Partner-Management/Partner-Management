import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import swal from 'sweetalert';
import { borderColor } from '@mui/system';

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

    function assignClick() {
        dispatch({ type: 'ASSIGN_USER', payload: { companyId: newCompId, userId: unassign.id } })

        swal({
            title: `${unassign.first_name} ${unassign.last_name} has been assigned to ${company}`,
            buttons: {
                cancel: "OK",
            },
            icon: "success"
        })
    }

    function deleteClick() {
        dispatch({ type: 'DELETE_USER', payload: { id: unassign.id } })
    }

    return (
        <tr className='admin-list' key={unassign.id}>
            <td>
                <p>{unassign.first_name} </p>
            </td>
            <td>
                <p>{unassign.last_name}</p>
            </td>
            <td>
                <p>{unassign.email}</p>
            </td>
            <td>
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
                            )
                        })}
                    </DropdownMenu>
                </Dropdown>
                <Button style={{
                            backgroundColor: 'rgb(175, 204, 54)',
                            borderColor: 'rgb(175, 204, 54)',
                            marginTop: '.5em'
                        }} onClick={() => assignClick()}>Assign</Button>
            </td>
            <td>
                <Button color = 'danger' onClick={() => deleteClick()}>Delete</Button>
            </td>
        </tr>
    )
}

export default UnassignedList;