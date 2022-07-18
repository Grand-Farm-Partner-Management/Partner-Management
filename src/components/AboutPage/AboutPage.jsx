import React from 'react';
import Blank from '../../images/Blank.png'
import { useSelector } from 'react-redux';


// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  const user = useSelector((store) => store.user);
  return (
    <div className="account-wrapper">
      <div>
        <h1>Account Details</h1>
        <h3>First Name: <span className='bold'>{user.first_name}</span></h3>
        <h3>Last Name: <span className='bold'>{user.last_name}</span></h3>
        <h3>Email: <span className='bold'>{user.email}</span></h3>
        <h3>LinkedIn: <span className='bold'>{user.linkedin ? user.linkedin : 'N/A'}</span></h3>
        <h3>Phone Number: <span className='bold'>{user.phone_number ? user.phone_number : 'N/A'}</span></h3>
        <h3>Job Title: <span className='bold'>{user.title ? user.title : 'N/A'}</span></h3>
      </div>
      <div className="profile-photo">
        <img className='blank' src={Blank}></img>
        <button>Change Profile Picture</button>
      </div>
    </div>
  );
}

export default AboutPage;
