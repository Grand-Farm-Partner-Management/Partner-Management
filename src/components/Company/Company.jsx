import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function Company() {

    const user = useSelector((store) => store.user);
    const members = useSelector((store) => store.members);
    const dispatch = useDispatch();

    const fetchMembers = async () => {
        await axios.get(`/api/company/members/${user.company_id}`)
            .then(res => {
                dispatch({ type: `GET_MEMBERS`, payload: res.data });
                console.log(res.data)
            })
    }

    useEffect(() => {
        fetchMembers();
    }, [])

    return (
        <>
            <h1>{members[0].company_name}</h1>
            <h2>Members</h2>
            {
                members.map((member) => {
                    return (
                        <div className='member'>
                            <h2>{member.first_name} {member.last_name}</h2>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Company;
