import React from 'react';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { googleLogout } from "@react-oauth/google";
import Socket from '../groupChat';
import { useNavigate } from "react-router-dom";
import IconFile from '../../../../shared/components/iconFile/iconFile';

const Dashboard = ({ existUser, setExistUser, setIsLogin }) => {
  const navigate = useNavigate();
  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    localStorage.removeItem("userData");
    setExistUser(null);
    setIsLogin(false);
    navigate("/");
  };

  return (
    <div className="text-end">
      <div className="d-flex justify-content-lg-end">
        <button onClick={() => navigate("/map")} className="border-0 bg-transparent">
          <IconFile iconSrc={'map-icon'} styleClass='rounded-circle me-1' width={'30'} height={'30'} />
        </button>
        {/* profile avatar */}
        <DropdownButton id="dropdown-button" title={<img src={existUser.picture} className="rounded-circle me-5" />}>
          <Dropdown.Item onClick={() => logOut()}>
            LogOut
          </Dropdown.Item>
        </DropdownButton>
      </div>
      {/* chat socket */}
      <Socket existUser={existUser} />
    </div>
  );
};

export default Dashboard;