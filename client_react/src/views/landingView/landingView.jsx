import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import IconFile from "../../../../shared/components/iconFile/iconFile";

const navigate = useNavigate();

const LandingView = ({ setUser }) => {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => { setUser(codeResponse), navigate("/"); },
    onError: (error) => console.log("Login Failed:", error),
  });


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
