import React, { useContext, useEffect, useState } from "react";
import MatchPanel from "./common/MatchPanel/MatchPanel";
import CreateMatchPanel from "./common/MatchPanel/CreateMatchPanel";
import { Match } from "../types/Match.model";
import { auth, getBets, getMatches } from "../utils/firebase";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import TyperCustomButton from "./common/TyperCustomButton/TyperCustomButton";
import { MainContext } from "../App";
import { Bet } from "../types/Bet.model";
import { useAuthState } from "react-firebase-hooks/auth";

export default function MainPage() {
  const [isAddVisible, setIsMatchModalVisible] = useState<boolean>(false);
  const [matchesData, setMatchesData] = useState<Match[]>([]);
  const [betsData, setBetsData] = useState<Bet[]>([]);
  const { isAdmin } = useContext(MainContext);
  const [user] = useAuthState(auth);

  function getMatchesData() {
    console.log('here');
    getMatches((snapshot: QuerySnapshot) => {
      let temp: Match[] = [];
      snapshot.forEach((doc: DocumentData) => {
        temp.push({
          id: doc.id,
          ...doc.data(),
        } as Match);
      });
      temp = temp.sort((a: Match, b: Match) => {
        console.log(a.gameDate.toMillis(), b.gameDate.toMillis());
        return a.gameDate.toMillis() - b.gameDate.toMillis()
      })
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

  function getUserBets(matchId: string): Bet | undefined {
    return betsData.find((bet) => user && user.uid === bet.user && matchId === bet.matchId);
  }

  useEffect(() => {
    getMatchesData();
    getBetsData();
  }, []);

  return (
    <main className="px-0 max-h-screen lg:px-10 h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Obecne zakłady</h1>
        {isAdmin && <TyperCustomButton onClick={() => setIsMatchModalVisible((state) => !state)} label="Dodaj nowy" />}
      </div>

      {isAddVisible && <CreateMatchPanel setIsModalVisible={setIsMatchModalVisible} />}

      <div className="flex flex-col h-[calc(84vh)] overflow-y-scroll mt-4">
        {matchesData.map((gameData) => {
          return <MatchPanel matchesData={gameData} userBet={getUserBets(gameData.id)} key={gameData.id} />;
        })}
      </div>
    </main>
  );
}
