import React from 'react';
import { useSelector } from 'react-redux';
import GrandFarm from '../../../src/images/GrandFarm_Logo.png'
import { Button, Popover, PopoverBody, PopoverHeader, UncontrolledPopover } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Question from '../../images/question_icon.svg'

function UserPage() {
  const history = useHistory();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  console.log(user)

  return (
    <div className="wrapper">
      <img className='question' src={Question} id="UncontrolledPopover"
        type="button" />
      <img className='GrandFarm' src={GrandFarm} />
      <h1 className='pm'>Partner Management</h1>
      <h2 className='welcome'>Welcome, {user.first_name}!</h2>
      <Button style={{
        backgroundColor: 'rgb(175, 204, 54)',
        borderColor: 'rgb(175, 204, 54)'
      }} onClick={() => history.push('/projects')} color="primary">View Projects</Button>
      <div>
        <UncontrolledPopover
          placement="bottom"
          trigger="legacy"
          target="UncontrolledPopover"

        >
          <PopoverHeader>
            What is Grand Farm Partner Management?
          </PopoverHeader>
          <PopoverBody>
            Grand Farm Partner Management is a web-based, collaborative task management system designed to alleviate the struggle of keeping track of due dates, deliverables, and project progress for Grand Farm partners.</PopoverBody>
        </UncontrolledPopover>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
