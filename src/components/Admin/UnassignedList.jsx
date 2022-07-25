import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function UnassignedList(props) {
    // const [company, setCompany] = useState(unassign.company_id)
    //console.log('in unassigned list', unassign);
    let unassign = props.unassign;
    return (
        <div >
            <li>{unassign.first_name} {unassign.last_name} {unassign.email} </li>
            <button>Add</button>
        </div>
    )
}

export default UnassignedList;