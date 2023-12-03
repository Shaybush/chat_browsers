import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoaderSpinner from "./shared/components/loaderSpinner/loaderSpinner";

const AppRoutes = () => {
  const Login = React.lazy(() => import("./views/landingView"));
  const GroupChatView = React.lazy(() => import("./views/groupChatView"));
  const MapTrackerView = React.lazy(() => import("./views/mapTrackerView"));
  return (
    <Suspense fallback={
      <div className="w-100 h-screen flex items-center justify-center">
        <LoaderSpinner load={true} height="400" width="400" />
      </div>
    }>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/group-chat" element={<GroupChatView />} />
          <Route path="/map" element={<MapTrackerView />} />
        </Routes>
      </Router>

    </Suspense>

  );
};

export default AppRoutes;