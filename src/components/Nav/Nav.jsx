import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import menuIcon from '../../images/menu_icon.svg'

function Nav(args) {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const user = useSelector((store) => store.user);

  return (
    <>
      <img src={menuIcon} onClick={toggle} className='menuIcon' />
      <Collapse className='h' isOpen={isOpen} {...args}>
        <div className="nav">
          <div>
            {/* If no user is logged in, show these links */}
            {!user.id && (
              // If there's no user, show login/registration links
              <Link onClick={toggle} className="navLink" to="/login">
                Login / Register
              </Link>
            )}

            {/* If a user is logged in, show these links */}
            {user.id && (
              <>
                <Link onClick={toggle} className="navLink" to="/user">
                  Home
                </Link>

                <Link onClick={toggle} className="navLink" to="/company">
                  Company
                </Link>

                <Link onClick={toggle} className="navLink" to="/projects">
                  Projects
                </Link>
                <Link onClick={toggle} className="navLink" to="/about">
                  Account
                </Link>
                <LogOutButton onClick={toggle} className="navLogOut" />
              </>
            )}
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default Nav;
