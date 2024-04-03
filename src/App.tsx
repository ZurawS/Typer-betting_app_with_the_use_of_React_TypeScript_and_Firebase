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
import ResultsPage from "./components/Results/ResultsPage";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { Match } from "./types/Match.model";
import { Bet } from "./types/Bet.model";
import { getCurrentWarsawTimeDate } from "./utils/getCurrentWarsawTimeDate";
import { TimezoneInfoResponse } from "./types/TimeAPI.response";
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
  const [currentTime, setCurrentTime] = useState<string>();

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

  async function getCurrentTime() {
    return await getCurrentWarsawTimeDate()
      .then((data: TimezoneInfoResponse) => {
        setCurrentTime(data.datetime);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getMatchesData();
    getBetsData();
    getCurrentTime();
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
              path="results"
              element={
                <ProtectedRoute>
                  <ResultsPage matchesData={matchesData} betsData={betsData} currentTime={currentTime} />
                </ProtectedRoute>
              }
            />
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
                  <MainPage matchesData={matchesData} betsData={betsData} currentTime={currentTime} />
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
