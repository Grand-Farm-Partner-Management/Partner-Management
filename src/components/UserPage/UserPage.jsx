import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import GrandFarm from '../../../src/images/GrandFarm_Logo.png'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  console.log(user)
  return (
    <div className="wrapper">
      <img className = 'GrandFarm' src={GrandFarm}/>
      <h2>Welcome, {user.first_name}!</h2>
      <button>View Projects</button>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
