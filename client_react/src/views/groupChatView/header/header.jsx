import React, { useEffect, useState } from 'react';
import IconFile from '../../../shared/components/iconFile/iconFile';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Header = ({userData}) => {
  const navigate = useNavigate();
  
  const logOut = () => {
    googleLogout();
    localStorage.removeItem("userData");
    navigate("/");
  };
  return (
    <div className="d-flex justify-content-end">
      <button onClick={() => navigate("/map")} className="border-0 bg-transparent">
        <IconFile iconSrc={'map-icon'} styleClass='rounded-circle me-1' width={'30'} height={'30'} />
      </button>
      {/* profile avatar */}
      <DropdownButton id="dropdown-button" title={<img src={userData.picture} className="rounded-circle me-5" />}>
        <Dropdown.Item onClick={() => logOut()}>
          LogOut
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default Header;