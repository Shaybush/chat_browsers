import React, { Suspense, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/loader";

const AppRoutes = () => {
    const Login = React.lazy(() => import("./components/homePage/homePage"));
    const Chat = React.lazy(() => import("./components/homePage/homePage"));
    const Map = React.lazy(() => import("./components/mapTracker/mapTracker"));
    return (
            <Suspense  fallback={
                <div className="w-100 h-screen flex items-center justify-center">
                  <Loader load={true} height="400" width="400" />
                </div>
              }>
                <Router>
                   <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/chat" element={<Chat/>}/>
                    <Route path="/map" element={<Map/>}/>
                   </Routes>
                </Router>

            </Suspense>
           
)}

export default AppRoutes