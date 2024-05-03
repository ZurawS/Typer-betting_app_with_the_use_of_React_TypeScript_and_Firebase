import React, { useCallback, useContext, useEffect, useState } from "react";
import MatchPanel from "./common/MatchPanel/MatchPanel";
import CreateMatchPanel from "./common/MatchPanel/CreateMatchPanel";
import { auth, betPreemptiveLockInHours } from "../utils/firebase";
import TyperCustomButton from "./common/TyperCustomButton/TyperCustomButton";
import { MainContext } from "../App";
import { Bet } from "../types/Bet.model";
import { useAuthState } from "react-firebase-hooks/auth";
import { Match } from "../types/Match.model";
import { formatDate } from "../utils/formatDate";

interface MainPageProps {
  matchesData: Match[];
  betsData: Bet[];
  currentTime: string | undefined;
}

export default function MainPage({ matchesData, betsData, currentTime }: MainPageProps) {
  const [matchesFilteredArray, setmatchesFilteredArray] = useState<Match[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const [isAddVisible, setIsMatchModalVisible] = useState<boolean>(false);
  const { isAdmin } = useContext(MainContext);
  const [user] = useAuthState(auth);

  function getUserBets(matchId: string): Bet | undefined {
    return betsData.find((bet) => user && user.uid === bet.userId && matchId === bet.matchId);
  }

  // function getUsersList(): Bet | undefined {
  //   return betsData.find((bet) => user && user.uid === bet.user && matchId === bet.matchId);
  // }

  const isBettingAvailable = useCallback(
    (timeInSeconds: number): boolean => {
      if (!currentTime) return false;

      const numberOfSecondsToCloseBetting: number = betPreemptiveLockInHours
        ? Number.parseFloat(betPreemptiveLockInHours) * 3600
        : 0;

      const date = new Date(currentTime);
      const dateInSeconds = Math.floor(date.getTime() / 1000);
      return dateInSeconds + numberOfSecondsToCloseBetting < timeInSeconds;
    },
    [currentTime]
  );

  useEffect(() => {
    const filteredData: Match[] = matchesData.filter((game) => {
      return Object.values({ ...game, gameDate: formatDate(game.gameDate) })
        .flat()
        .some((value) => {
          return `${value}`.toLowerCase().includes(`${filterValue}`.toLowerCase());
        });
    });

    setmatchesFilteredArray(filteredData);
  }, [filterValue, matchesData]);

  return (
    <main className="px-0 max-h-screen lg:px-10 h-screen">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Obecne zakłady</h1>
          {isAdmin && (
            <div className="flex items-end gap-4">
              <TyperCustomButton
                onClick={() => setIsMatchModalVisible((state) => !state)}
                label="Dodaj nowy"
                customClass="h-min"
              />
            </div>
          )}
        </div>
        <div>
          <input
            type="matchesFilter"
            name="matchesFilter"
            placeholder="Wprowadź wartość filtra"
            onChange={(e) => setFilterValue(e.target.value)}
            className="block w-96 mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      {isAddVisible && <CreateMatchPanel setIsModalVisible={setIsMatchModalVisible} />}

      <div className="flex flex-col h-[calc(84vh)] overflow-y-scroll mt-4">
        {matchesFilteredArray.map((gameData) => {
          return (
            <MatchPanel
              isAvailable={isBettingAvailable(gameData.gameDate?.seconds)}
              matchesData={gameData}
              userBet={getUserBets(gameData.id)}
              key={gameData.id}
            />
          );
        })}
      </div>
    </main>
  );
}
