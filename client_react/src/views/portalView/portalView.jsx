import React, { useEffect, useState } from "react";
import Dashboard from "./components/dashboard";
import LandingPage from "./components/landingPage";

const PortalView = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    let isUserCheck = localStorage.getItem("userData")
    if (isUserCheck)
      setIsLogin(true);
  }, []);

  return (
    <div>
      {
        isLogin ?
          <Dashboard/> : <LandingPage />
      }
    </div>
  );
};

export default PortalView;
