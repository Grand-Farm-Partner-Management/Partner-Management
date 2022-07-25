import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import UnassignedList from './UnassignedList';

function AdminPage() {
    /* 
    - make a view for freshly created companies to be accepted or deleted
    - make a view of new employees and the ability to reassign them to companies, as wel as adjust levels
    - 
    */
    const dispatch = useDispatch();
    const unassigned = useSelector((store) => store.unassigned);
    const newPartners = useSelector((store) => store.newPartner);

    console.log('unassigned are:', unassigned);
    console.log('new partners are: ', newPartners);

    const fetchUnassigned = async () => {
        await axios.get(`/api/company/unassigned`)
            .then(res => {
                dispatch({ type: `UNASSIGNED`, payload: res.data });
            })
    }

    const fetchNewPartner = async () => {
        await axios.get(`/api/company/newPartner`)
            .then(res => {
                dispatch({ type: `NEW_PARTNER`, payload: res.data });
            })
    }
    if (unassigned.company_id === null || newPartners.partner_level === null) {
        console.log(unassigned, newPartners);
        return;
    }
    useEffect(() => {
        fetchUnassigned();
        fetchNewPartner();
    }, [])

    return (
        <div>
            <h4>{JSON.stringify(unassigned)}</h4>


            {/* {unassigned.map((unassign, i) => (
                    <h3 key={unassign.id}> 
                    {unassign.first_name}, 
                    {unassign.last_name},
                    {unassign.email}) 
                    </h3>
                ))} */}


            {/* {unassigned.map((unassign) => (

                    <h3 key={unassign.id}> 
                    {unassign.first_name}, 
                    {unassign.last_name},
                    {unassign.email} 
                    </h3>
                ))} */}

            {
                unassigned.map((unassign) => {
                    return (
                        // <h1>hi</h1>
                        <UnassignedList unassign = {unassign} />
                    )
                })
            }


            // {/* {unassigned.length > 0 ? unassigned.map((unassign) => {
            //         return (
            //             <UnassignedList unassign={unassign} />
            //         )
            //     })
            //         :
            //         <h3>"loading"</h3>} */}

        </div>
    )
}

export default AdminPage;