import React, { Suspense, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import _Loader from "./components/Loader/_Loader";

const AppRoutes = () => {
    const Login = React.lazy(() => import("./components/HomePage/HomePage"));
    const Chat = React.lazy(() => import("./components/HomePage/HomePage"));
    const Map = React.lazy(() => import("./components/MapPage/Map"));
    return (
            <Suspense  fallback={
                <div className="w-100 h-screen flex items-center justify-center">
                  <_Loader load={true} height="400" width="400" />
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