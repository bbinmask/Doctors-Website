import React from "react";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import MyAccount from "../Dashboard/user-account/MyAccount";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import Appointment from "../pages/Appointment/Appointment";
import { Appointments } from "../Dashboard/doctor-account/Appointments";
import { Settings } from "../Dashboard/doctor-account/Settings";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoutes allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/doctor/profile/me"
        element={
          <ProtectedRoutes allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/appointments"
        element={
          <ProtectedRoutes allowedRoles={["doctor"]}>
            <Appointments />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoutes allowedRoles={["doctor"]}>
            <Settings />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default Routers;
