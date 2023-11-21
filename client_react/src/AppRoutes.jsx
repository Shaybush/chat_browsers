import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoaderSpinner from "./shared/components/loaderSpinner/loaderSpinner";

const AppRoutes = () => {
  const Login = React.lazy(() => import("./views/portalView"));
  const Chat = React.lazy(() => import("./views/portalView/components/dashboard"));
  const Map = React.lazy(() => import("./views/mapTracker"));
  return (
    <Suspense fallback={
      <div className="w-100 h-screen flex items-center justify-center">
        <LoaderSpinner load={true} height="400" width="400" />
      </div>
    }>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat-group" element={<Chat />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>

    </Suspense>

  );
};

export default AppRoutes;