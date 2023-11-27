import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import IconFile from "../../shared/components/iconFile/iconFile"
import axios from "axios";

const LandingView = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const isValid = async () => {
      if (user && user.access_token) {
        let response = await getUserDetailsFromAccessToken();
        if (response) {
          setUserDetailsInLocalStorage(response.data);
          navigate("/group-chat")
        }
      }
    };
    isValid();
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => { 
      setUser(codeResponse)
     },
    onError: (error) => console.log("Login Failed:", error),
  });

  const getUserDetailsFromAccessToken = () => {
    return axios.get(
      `${import.meta.env.VITE_GOOGLE_AUTH_URL}/oauth2/v1/userinfo?access_token=${user.access_token}`,
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
    <div className="h-100 d-inline-block w-100 d-flex justify-content-center align-items-center">
      {/* google button  */}
      <a className="btn btn-lg btn-google btn-outline">
        <button onClick={() => login()} className="bg-transparent border border-white">
          <IconFile iconSrc={'google-logo'} width={'24'} height={'24'} />
          <span className="ps-2">Signup Using Google</span>
        </button>
      </a>
    </div>
  );
};

export default LandingView;
