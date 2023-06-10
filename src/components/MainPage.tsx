import React, { useEffect, useState } from "react";
import MatchPanel from "./common/MatchPanel/MatchPanel";
import CreateMatchPanel from "./common/MatchPanel/CreateMatchPanel";
import { Match } from "../types/Match.model";
import { getMatches } from "../utils/firebase";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

export default function MainPage() {
  const [isAddVisible, setIsAddVisible] = useState<boolean>(false);
  const [data, setData] = useState<Match[]>([]);

  useEffect(() => {
    getMatches((snapshot: QuerySnapshot) => {
      let temp: Match[] = [];
      snapshot.forEach((doc: DocumentData) => {
        temp.push({
          id: doc.id,
          ...doc.data(),
        } as Match);
      });
      setData(temp);
    });
  }, []);

  return (
    <main className="px-0 max-h-screen lg:px-10 h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Obecne zakłady</h1>
        <button
          onClick={() => setIsAddVisible((state) => !state)}
          className="inline-flex items-center justify-center font-medium text-white bg-indigo-500 px-4 py-2 rounded-sm"
        >
          {isAddVisible ? "Anuluj dodawanie" : "Dodaj nowy"}
        </button>
      </div>

      {isAddVisible && <CreateMatchPanel setIsAddVisible={setIsAddVisible} />}

      <div className="flex flex-col h-[calc(84vh)] overflow-y-scroll mt-4">
        {data.map((gameData) => {
          return <MatchPanel data={gameData} key={gameData.id} />;
        })}
      </div>
    </main>
  );
}
