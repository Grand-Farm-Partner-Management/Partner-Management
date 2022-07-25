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
    const user = useSelector((store) => store.user);

    console.log('users are', user);
    return (
        <div>

        </div>
    )
}

export default AdminPage;