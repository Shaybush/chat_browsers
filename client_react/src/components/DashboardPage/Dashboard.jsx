import React from 'react';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { googleLogout } from "@react-oauth/google";
import Socket from '../socket';
import mapIcon from "../../assets/icons/map.png"
import { useNavigate } from "react-router-dom";

const Dashboard = ({ existUser, setExistUser, setIsLogin }) => {
  const navigate = useNavigate();
  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    existUser = null;
    localStorage.removeItem("userData");
    setIsLogin(false);
    navigate("/")
  };

  
  // if(existUser === undefined){
  //   existUser = JSON.parse(localStorage.getItem("userData"))
  //   console.log(existUser)
  //    setIsLogin(false);
  // }

  return (
    <div className="text-end">
      <div className="d-flex justify-content-lg-end">
        <button onClick={()=>{navigate("/map")}} className="border-0 bg-transparent">
        <img src={mapIcon} className="rounded-circle me-1" style={{height:"100px"}}/>
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