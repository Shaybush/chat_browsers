import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard";

const HomePage = () => {
  const [user, setUser] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [existUser, setExistUser] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

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
          <Dashboard existUser={existUser} setExistUser={setExistUser} setIsLogin={setIsLogin} /> :

          <div className="h-100 d-inline-block w-100 d-flex justify-content-center align-items-center">
            {/* google button  */}
            <a className="btn btn-lg btn-google btn-outline">
              <button onClick={() => login()} className="bg-transparent border border-white">
                <img src="https://img.icons8.com/color/16/000000/google-logo.png" />
                Signup Using Google
              </button>
            </a>
          </div>
      }
    </div>
  );
};

export default HomePage;
