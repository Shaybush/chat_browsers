import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoaderSpinner from "./shared/components/loaderSpinner/loaderSpinner";

const AppRoutes = () => {
  const Login = React.lazy(() => import("./views/landingView"));
  const GroupChat = React.lazy(() => import("./views/groupChat/groupChatView"));
  const MapTracker = React.lazy(() => import("./views/mapTrackerView"));
  return (
    <Suspense fallback={
      <div className="w-100 h-screen flex items-center justify-center">
        <LoaderSpinner load={true} height="400" width="400" />
      </div>
    }>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/group-chat" element={<GroupChat />} />
          <Route path="/map" element={<MapTracker />} />
        </Routes>
      </Router>

    </Suspense>

  );
};

export default AppRoutes;