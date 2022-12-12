import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/components/Layout";
import useFindUser from "./hooks/useFindUser";
import { UserContext } from "./hooks/UserContext";
import RegisterPage from "./pages/Register";
import PrivateRoute from "./pages/PrivateRoute";
import Loading from "./pages/components/Loading";
import LoginPage from "./pages/Login";
import ArchivesPage from "./pages/ArchivesPage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/components/settings/settingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/archive" element={<ArchivesPage />} />
          <Route exact path="/products" element={<ProductsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* <Route path="/home" element={<PrivateRoute component={HomePage} />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
