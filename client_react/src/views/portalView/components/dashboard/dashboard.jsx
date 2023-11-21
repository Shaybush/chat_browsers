import React, { useEffect,useState } from 'react';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { googleLogout } from "@react-oauth/google";
import GroupChat from '../groupChat';
import { useNavigate } from "react-router-dom";
import IconFile from '../../../../shared/components/iconFile/iconFile';

const Dashboard = () => {
  const navigate = useNavigate();
  const [existUser, setExistUser] = useState(JSON.parse(localStorage["userData"]));

  useEffect(() => {
    const localStorageCheck = () => {
      // check if userData exist in local storage 
      if (localStorage["userData"]) {
        let userTemp = mappedUserLoginDetails(JSON.parse(localStorage["userData"]));
        setExistUser(userTemp);
        return userTemp;
      }
      navigate("/")
    };
    localStorageCheck();
  }, [])
  
  const mappedUserLoginDetails = (userInLocalStorage) => {
    return {
      email: userInLocalStorage.email,
      family_name: userInLocalStorage.family_name,
      given_name: userInLocalStorage.given_name,
      id: userInLocalStorage.id,
      locale: userInLocalStorage.locale,
      name: userInLocalStorage.name,
      picture: userInLocalStorage.picture,
      verified_email: userInLocalStorage.verified_email,
    };
  };
  
  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className="text-end">
      <div className="d-flex justify-content-end">
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
      {/* chat container */}
      <GroupChat existUser={existUser} />
    </div>
  );
};

export default Dashboard;