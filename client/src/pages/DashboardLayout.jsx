import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";

import Wrapper from "../assets/wrappers/Dashboard";
import { Navbar, BigSidebar, SmallSidebar } from "../components";
import { createContext, useState, useContext } from "react";
import { defaultDarkTheme } from "../App";
import customFetch from "../utils/customFetch";
import axios from "axios";
const DashboardContext = createContext();

export const loader = async () => {
  try {
    const { data } = await axios.get("/api/v1/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = ({ isdarkThemeEnabled }) => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(defaultDarkTheme());
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const logoutUser = async () => {
    await customFetch.get("/auth/logout");
    navigate("/");
    toast.success("Logged out successfully");
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />{" "}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
