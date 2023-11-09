import axios from "axios";
import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import ButtonGoogleAuth from '../Buttons/ButtonGoogleAuth';

const homePage = () => {
  const [user, setUser] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [existUser, setExistUser] = useState(null);

  useEffect(() => {
    let isUserCheck = localStorageCheck();
    if (isUserCheck)
      setIsLogin(true);
  }, []);

  useEffect(() => {
    const isValid = async () => {
      try {
        if (user) {
          let response = await getUserDetailsFromAccessToken();
          if (response) {
            setExistUser(response.data);
            setUserDetailsInLocalStorage(response.data);
            setIsLogin(true);
          }
        }
      } catch (err) { }
    };
    isValid();
  }, [user]);

  const localStorageCheck = () => {
    // check if userData exist in local storage 
    if (localStorage["userData"]) {
      let userTemp = mappedUserLoginDetails(JSON.parse(localStorage["userData"]));
      setExistUser(userTemp);
      return userTemp;
    }
  };

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

  const getUserDetailsFromAccessToken = () => {
    return axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json",
        },
      }
    );
  };

  const setUserDetailsInLocalStorage = (userDetails) => {
    window.localStorage.setItem("userData", JSON.stringify(userDetails));
  };

  return (
    <div>
      {
          isLogin ?
          <Dashboard existUser={existUser} setExistUser={setExistUser} setIsLogin={setIsLogin} /> : <ButtonGoogleAuth setUser={setUser}/>
      }
    </div>
  );
};

export default homePage;
