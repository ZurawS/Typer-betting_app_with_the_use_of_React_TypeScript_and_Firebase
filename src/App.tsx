import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import NotFound from "./components/common/Utility/NotFound";
import { ProtectedRoute } from "./components/common/Utility/ProtectedRoutes";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/login/RegisterPage";
import RemindPassword from "./components/login/RemindPassword";
import MainPage from "./components/MainPage";
import ForumPage from "./components/Forum/ForumPage";
import { auth, userAdminUIDS } from "./utils/firebase";

export const MainContext = React.createContext<{ isAdmin: boolean }>({ isAdmin: false });

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(!userAdminUIDS || !user) return;
      setIsAdmin(JSON.parse(userAdminUIDS).includes(user.uid));
    });
  }, []);

  return (
    <MainContext.Provider value={{ isAdmin }}>
      <BrowserRouter>
        <Routes>
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
        </Routes>
      </BrowserRouter>
    </MainContext.Provider>
  );
}

export default App;
