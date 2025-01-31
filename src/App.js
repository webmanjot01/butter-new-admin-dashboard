import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import { useEffect, useState } from "react";
import Register from "./Pages/Register/Register";
import AdminRoutes from "./AdminRoutes";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {  
    // const myData = JSON.parse(localStorage.getItem("UserData"));
    // if (!myData) {
    //   navigate("/login");
    // }
    if (location.pathname === "/") {
      navigate("/admin");
    }
  }, [location.pathname]); 

  return (
    <>
      {/* */}
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
      {/* </Layout> */}
    </>
  );
}

export default App;
