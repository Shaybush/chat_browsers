import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ setUser }) => {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => { setUser(codeResponse), navigate("/chat"); },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div className="h-100 d-inline-block w-100 d-flex justify-content-center align-items-center">
      {/* google button  */}
      <a className="btn btn-lg btn-google btn-outline">
        <button onClick={() => login()} className="bg-transparent border border-white">
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" />
          Signup Using Google
        </button>
      </a>
    </div>
  );
};

export default LandingPage;
