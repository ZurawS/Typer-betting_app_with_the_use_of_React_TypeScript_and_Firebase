import React, { useCallback, useContext, useEffect, useState } from "react";
import MatchPanel from "./common/MatchPanel/MatchPanel";
import CreateMatchPanel from "./common/MatchPanel/CreateMatchPanel";
import { auth, betPreemptiveLockInHours, getTimestamp, timestampsDocumentRef, timestampsRef } from "../utils/firebase";
import TyperCustomButton from "./common/TyperCustomButton/TyperCustomButton";
import { MainContext } from "../App";
import { Bet } from "../types/Bet.model";
import { useAuthState } from "react-firebase-hooks/auth";
import { Match } from "../types/Match.model";
import { formatDate, formatFirebaseTimestampToDate } from "../utils/formatDate";
import { DocumentData, QuerySnapshot, addDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

interface MainPageProps {
  matchesData: Match[];
  betsData: Bet[];
}

export default function MainPage({ matchesData, betsData }: MainPageProps) {
  const [matchesFilteredArray, setmatchesFilteredArray] = useState<Match[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const [isAddVisible, setIsMatchModalVisible] = useState<boolean>(false);
  const { isAdmin } = useContext(MainContext);
  const [user] = useAuthState(auth);
  const [currentTime, setCurrentTime] = useState<string | undefined>();

  function getUserBets(matchId: string): Bet | undefined {
    return betsData.find((bet) => user && user.uid === bet.userId && matchId === bet.matchId);
  }

  const [timestampFetched, setTimestampFetched] = useState<boolean>(false);
  async function createServerTimestamp(): Promise<string | undefined> {
    const payload = {
      timestamp: serverTimestamp(),
    };

    return await addDoc(timestampsRef, payload)
      .then(function (docRef) {
        return docRef.id;
      })
      .catch(function (error: Error) {
        alert("Error adding document: " + error.message);
        return undefined;
      });
  }

  function getCurrentServerTimestamp(docId: string) {
    getTimestamp((snapshot: QuerySnapshot) => {
      snapshot.forEach(async function callback(doc: DocumentData) {
        if (docId === doc.id) {
          setCurrentTime(formatFirebaseTimestampToDate(doc.data().timestamp));
          deleteDoc(timestampsDocumentRef(docId));
        }
      });
    });
  }

  useEffect(() => {
    if (betsData.length && !timestampFetched) {
      setTimestampFetched(true);
      createServerTimestamp()
        .then((docId) => {
          if (docId) {
            getCurrentServerTimestamp(docId);
          }
        })
        .finally(() => {});
    }
  }, [betsData]);

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

  function downloadData() {
    let csv: string = "";

    for (let row = 0; row < betsData.length; row++) {
      let keysAmount = Object.keys(betsData[row]).length;
      let keysCounter = 0;

      if (row === 0) {
        for (let key in betsData[row]) {
          csv += key + (keysCounter + 1 < keysAmount ? "," : "\r\n");
          keysCounter++;
        }
      } else {
        for (let key in betsData[row]) {
          csv += (betsData as any)[row][key] + (keysCounter + 1 < keysAmount ? "," : "\r\n");
          keysCounter++;
        }
      }

      keysCounter = 0;
    }

    let link = document.createElement("a");
    link.id = "download-csv";
    link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(csv));
    link.setAttribute("download", "typer_wyniki_zebranych_danych.csv");
    document.body.appendChild(link);
    (document.querySelector("#download-csv") as HTMLElement).click();
  }

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
              <TyperCustomButton onClick={() => downloadData()} label="Pobierz" customClass="h-min" />
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

      <div className="flex flex-col h-[calc(84vh)] overflow-y-scroll mt-4 pb-12">
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
