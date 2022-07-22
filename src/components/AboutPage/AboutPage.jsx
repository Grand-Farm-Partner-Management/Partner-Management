import React, { useState } from 'react';
import Blank from '../../images/Blank.png'
import { useSelector, useDispatch } from 'react-redux';
import Dots from '../../images/pencil_icon.svg'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

function AboutPage(args) {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Modal state
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // Edit details state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const editDetails = async (body) => {
    await axios.put(`/api/user/update/${user.id}`, body);
    await fetchUser();
  }

  const fetchUser = async () => {
    axios.get(`/api/user/`)
    .then((res) => {
      console.log('res data', res.data)
      dispatch({ type: `SET_USER`, payload: res.data });
    })
  }

  return (
    <div className="account-wrapper">
      <div>
        <div className="details-and-dots">
          <h1>Account Details</h1>
          <img className='pencil' src={Dots} onClick = {toggle}/>
        </div>
        <h3>First Name: <span className='bold'>{user.first_name}</span></h3>
        <h3>Last Name: <span className='bold'>{user.last_name}</span></h3>
        <h3>Email: <span className='bold'>{user.email}</span></h3>
        <h3>LinkedIn: <span className='bold'>{user.linkedin ? user.linkedin : 'N/A'}</span></h3>
        <h3>Phone Number: <span className='bold'>{user.phone_number ? user.phone_number : 'N/A'}</span></h3>
        <h3>Job Title: <span className='bold'>{user.title ? user.title : 'N/A'}</span></h3>
      </div>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Account Details</ModalHeader>
        <ModalBody>
          <label htmlFor='firt-name'>First Name:</label>
          <input onChange={(e) => setFirstName(e.target.value)} id='firt-name' />
          <br />
          <label htmlFor='last-name'>Last Name:</label>
          <input onChange={(e) => setLastName(e.target.value)} id='last-name' />
          <br />
          <label htmlFor='email'>Email:</label>
          <input onChange={(e) => setEmail(e.target.value)} id='email' />
          <br />
          <label htmlFor='linkedin'>LinkedIn:</label>
          <input onChange={(e) => setLinkedIn(e.target.value)} id='linkedin' />
          <br />
          <label htmlFor='phone-number'>Phone Number:</label>
          <input onChange={(e) => setPhoneNumber(e.target.value)} id='phone-number' />
          <br />
          <label htmlFor='job-title'>Job Title:</label>
          <input onChange={(e) => setJobTitle(e.target.value)} id='job-title' />
          <br />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => {
            editDetails({ firstName: firstName, lastName: lastName, email: email, linkedIn: linkedIn, phoneNumber: phoneNumber, jobTitle: jobTitle });
            fetchUser();
            toggle();
          }
          }>Confirm</Button>
        </ModalFooter>
      </Modal>
      <div className="profile-photo">
        <img className='blank' src={Blank}></img>
        <button>Change Profile Picture</button>
      </div>
    </div>
  );
}

export default AboutPage;
