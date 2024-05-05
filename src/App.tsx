import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import NotFound from "./components/common/Utility/NotFound";
import { ProtectedRoute } from "./components/common/Utility/ProtectedRoutes";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/login/RegisterPage";
import RemindPassword from "./components/login/RemindPassword";
import MainPage from "./components/MainPage";
import { auth, getBets, getMatches, userAdminUIDS } from "./utils/firebase";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { Match } from "./types/Match.model";
import { Bet } from "./types/Bet.model";
import Loader from "./components/common/Loader/Loader";
import FaqPage from "./components/FaqPage/FaqPage";

export const MainContext = React.createContext<{
  isAdmin: boolean;
  isLoading: boolean;
  setIsLoading: (auth: boolean) => void;
}>({ isAdmin: false, isLoading: false, setIsLoading: (auth: boolean) => void 0 });

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [matchesData, setMatchesData] = useState<Match[]>([]);
  const [betsData, setBetsData] = useState<Bet[]>([]);

  function getMatchesData() {
    getMatches((snapshot: QuerySnapshot) => {
      let temp: Match[] = [];
      snapshot.forEach((doc: DocumentData) => {
        temp.push({
          id: doc.id,
          ...doc.data(),
        } as Match);
      });
      temp = temp.sort((a: Match, b: Match) => {
        return b.gameDate.toMillis() - a.gameDate.toMillis();
      });
      setMatchesData(temp);
    });
  }

  function getBetsData() {
    getBets((snapshot: QuerySnapshot) => {
      let temp: Bet[] = [];
      snapshot.forEach((doc: DocumentData) => {
        temp.push({
          id: doc.id,
          ...doc.data(),
        } as Bet);
      });
      setBetsData(temp);
    });
  }

  useEffect(() => {
    getMatchesData();
    getBetsData();
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!userAdminUIDS || !user) return;
      setIsAdmin(JSON.parse(userAdminUIDS).includes(user.uid));
    });
  }, []);

  return (
    <MainContext.Provider value={{ isAdmin, isLoading, setIsLoading }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="remind" element={<RemindPassword />} />
            <Route
              path="faq"
              element={
                <ProtectedRoute>
                  <FaqPage />
                </ProtectedRoute>
              }
            />
            <Route
              index
              element={
                <ProtectedRoute>
                  <MainPage matchesData={matchesData} betsData={betsData} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Loader isLoading={isLoading}></Loader>
    </MainContext.Provider>
  );
}

export default App;
