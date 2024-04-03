import React, { useEffect, useState } from "react";
import { Match } from "../../types/Match.model";
import { Bet } from "../../types/Bet.model";
import { Timestamp } from "firebase/firestore";
import ResultsTable from "./ResultsTable/ResultsTable";

interface ResultsPageProps {
  matchesData: Match[];
  betsData: Bet[];
  currentTime: string | undefined;
}

export interface MatchesData {
  matchBets: Bet[];
  id: string;
  host: string;
  guest: string;
  gameDate: Timestamp;
  score90: string;
  finalScore: string;
}

export default function ResultsPage({ matchesData, betsData, currentTime }: ResultsPageProps) {
  const [matchesResultsTableData, setmatchesResultsTableData] = useState<MatchesData[]>();

  useEffect(() => {
    const temp = matchesData.map((match) => {
      const bar = betsData.filter((bet) => bet.matchId === match.id);
      return {
        ...match,
        matchBets: [...bar],
      };
    });
    setmatchesResultsTableData(temp);
  }, [matchesData, betsData]);

  return (
    <main className="px-0 lg:px-10 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tabela wyników</h1>
        <div className="flex items-end gap-4">
          <div className="flex bg-white shadow-md rounded p-4 my-4">
            <span className="font-bold text-xl">Nagroda główna: </span>
            <span className="font-bold text-xl text-rose-600 ml-2">1000 zł</span>
          </div>
        </div>
      </div>

      {!!matchesResultsTableData?.length && (
        <div className="flex bg-white shadow-md rounded p-4 my-4 overflow-auto">
          <ResultsTable data={matchesResultsTableData} />
        </div>
      )}
    </main>
  );
}
