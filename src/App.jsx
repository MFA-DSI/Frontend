import {Route, Routes} from "react-router-dom";
import {AuthWrapper, PrivateWrapper} from "./components/Auth";
import Home from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";

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
