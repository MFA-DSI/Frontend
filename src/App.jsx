import {Route, Routes} from "react-router-dom";
import {AuthWrapper, PrivateWrapper} from "./components/Auth";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";

import "./App.css";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";


const queryClient = new QueryClient();
function App() {
  return (
    <>
     <QueryClientProvider client={queryClient}>   
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AuthWrapper />}>
          <Route index Component={HomePage} />
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
      </QueryClientProvider>
    </>
  );
}

export default App;
