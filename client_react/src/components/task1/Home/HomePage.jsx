import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Socket from "../../socket";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const HomePage = () => {
  const [user, setUser] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState({
    email: null,
    family_name: null,
    given_name: null,
    id: null,
    locale: null,
    name: null,
    picture: null,
    verified_email: null,
  });

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    let existUser = null;
    if (localStorage["userData"]) {
      existUser = JSON.parse(localStorage["userData"]);
    }
    if (existUser) {
      setIsLogin(true);
      const user = {
        email: existUser.email,
        family_name: existUser.family_name,
        given_name: existUser.given_name,
        id: existUser.id,
        locale: existUser.locale,
        name: existUser.name,
        picture: existUser.picture,
        verified_email: existUser.verified_email,
      };
      setProfile(user);
    } else {
      null;
    }
  }, []);

  useEffect(() => {
    const isValid = async() =>  {
      try{
        if (user)
        {
          let res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
          if (res)
          {
            setProfile(res.data);
            const userObj = {
              email: res.data.email,
              family_name: res.data.family_name,
              given_name: res.data.given_name,
              id: res.data.id,
              locale: res.data.locale,
              name: res.data.name,
              picture: res.data.picture,
              verified_email: res.data.verified_email,
            };
            setProfile(userObj);
            window.localStorage.setItem(
              "userData",
              JSON.stringify({
                email: res.data.email,
                family_name: res.data.family_name,
                given_name: res.data.given_name,
                id: res.data.id,
                locale: res.data.locale,
                name: res.data.name,
                picture: res.data.picture,
                verified_email: res.data.verified_email,
              })
            );
            setIsLogin(true);
          }
        }
      }catch(err)
      {
        console.log(err)
      }
    }
    isValid();
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    localStorage.removeItem("userData");
    setIsLogin(false);
  };
  return (
    <div>
{
      isLogin ?
      <div className="text-end">
      <DropdownButton id="dropdown-button" title={<img src={profile.picture} className="rounded-circle "/>}>
      <Dropdown.Item onClick={()=> {
        logOut()
      }}>LogOut</Dropdown.Item>
    </DropdownButton>
     <Socket />

    </div>
      : 
      <div className="h-100 d-inline-block w-100 ">  
     <div className="d-lg-flex justify-content-center align-items-center h-75 ">
       <a
         className="btn btn-lg btn-google
          btn-block text-uppercase btn-outline"
      >

        <button onClick={() => login()} className="bg-transparent border border-white">
        <img src="https://img.icons8.com/color/16/000000/google-logo.png" />{" "}
        Signup Using Google
        </button>
    
      </a>
    </div>
    </div>
}
</div>
)}

export default HomePage;
