import React from 'react';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { googleLogout } from "@react-oauth/google";
import Socket from '../socket';

const Dashboard = ({ existUser, setExistUser, setIsLogin }) => {
  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setExistUser(null);
    localStorage.removeItem("userData");
    setIsLogin(false);
  };

  return (
    <div className="text-end">
      {/* profile avatar */}
      <DropdownButton id="dropdown-button" title={<img src={existUser.picture} className="rounded-circle me-5" />}>
        <Dropdown.Item onClick={() => logOut()}>
          LogOut
        </Dropdown.Item>
      </DropdownButton>

      {/* chat socket */}
      <Socket existUser={existUser} />
    </div>
  );
};

export default Dashboard;