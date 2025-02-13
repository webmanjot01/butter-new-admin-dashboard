import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Layout from "./Components/Layout/Layout";
import UsersList from "./Pages/Users/UsersList";
import RestaurantsLists from "./Pages/Restaurants/RestaurantsLists/RestaurantsLists";
import ButterBestLists from "./Pages/Restaurants/ButterBest/ButterBestLists";
import PrivacyPolicy from "./Pages/Privacy&Policy/Privacy&Policy";
import TermsConditionsPage from "./Pages/Terms&Condition/TermsCondition";
import EmailSetting from "./Pages/EmailSetting/EmailSetting";
import ReportedPost from "./Pages/Posts/ReportedPost";
import AddRestaurant from "./Pages/Restaurants/AddRestaurant/AddRestaurant";
import AdminLists from "./Pages/ManageAdmin/AdminLists";
import LocationSettings from "./Pages/LocationSettings/LocationSettings";

function AdminRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/restaurants/list" element={<RestaurantsLists />} />
        <Route path="/restaurant/add" element={<AddRestaurant />} />
        <Route path="/restaurants/butterbest" element={<ButterBestLists />} />
        <Route path="/settings/emails" element={<EmailSetting />} />
        <Route path="/privacy&policy" element={<PrivacyPolicy />} />
        <Route path="/terms&condition" element={<TermsConditionsPage />} />
        <Route path="/reported-posts" element={<ReportedPost />} />
        <Route path="/admin-lists" element={<AdminLists />} />
        <Route path="/settings/location" element={<LocationSettings />} />
      </Routes>
    </Layout>
  );
}

export default AdminRoutes;
