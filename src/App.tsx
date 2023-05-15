import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import NotFound from "./components/common/Utility/NotFound";
import { ProtectedRoute } from "./components/common/Utility/ProtectedRoutes";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/login/RegisterPage";
import RemindPassword from "./components/login/RemindPassword";
import MainPage from "./components/MainPage";
import ForumPage from "./components/Forum/ForumPage";

export const MainContext = React.createContext<any>({});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TODO - Usunąc Context */}
        {/* <MainContext.Provider value={userId}> */}
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="remind" element={<RemindPassword />} />
          <Route
            path="forum"
            element={
              <ProtectedRoute>
                <ForumPage />
              </ProtectedRoute>
            }
          />
          <Route
            index
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* </MainContext.Provider> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
