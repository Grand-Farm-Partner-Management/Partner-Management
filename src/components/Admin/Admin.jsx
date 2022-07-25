import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function AdminPage() {
    /* 
    - make a view for freshly created companies to be accepted or deleted
    - make a view of new employees and the ability to reassign them to companies, as wel as adjust levels
    - 
    */
    const dispatch = useDispatch();
    const users = useSelector((store) => store.unassigned);

    let unassigned = [];

    if (users.length >0) {
        for (let user of users) {
            if (user.company_id === null) {
                unassigned.push(user);
            }
        }
    } 

    const fetchUsers = async () => {
        await axios.get(`/api/company/unassigned`)
            .then(res => {
                dispatch({ type: `UNASSIGNED`, payload: res.data });
            })
    }

    useEffect(() => {
        fetchUsers();
        console.log(users)
    }, [])

    console.log('users are', users);
    console.log('unassigned are:', unassigned);

    return (
        <div>

        </div>
    )
}

export default AdminPage;