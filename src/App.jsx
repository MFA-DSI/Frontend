import {Route, Routes} from "react-router-dom";
import "./App.css";

import {AuthWrapper, PrivateWrapper} from "./components/Auth";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";



function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthWrapper />}>
        <Route index Component={Home} />
      </Route>
      <Route
        path="/login"
        element={
          <PrivateWrapper>
            <LoginPage />
          </PrivateWrapper>
        }
      ></Route>
    </Routes>
  );
}

export default App;
