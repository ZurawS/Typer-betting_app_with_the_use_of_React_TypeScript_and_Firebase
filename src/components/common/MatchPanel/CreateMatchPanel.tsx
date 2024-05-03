import React, { FormEvent, useState } from "react";
import { matchDocumentRef, matchesRef } from "../../../utils/firebase";
import { Timestamp, addDoc, updateDoc } from "firebase/firestore";
import DimmedBackgroundModal from "../DimmedBackgroundModal/DimmedBackgroundModal";
import TyperCustomButton from "../TyperCustomButton/TyperCustomButton";
import { formatFirebaseTimestampToDate } from "../../../utils/formatDate";

export default function CreateMatchPanel({
  setIsModalVisible,
  initialHostTeamName,
  initialGuestTeamName,
  initialGameDate,
  editedId = undefined,
}: {
  setIsModalVisible: (visibility: boolean) => void;
  initialHostTeamName?: string;
  initialGuestTeamName?: string;
  initialGameDate?: Timestamp;
  editedId?: string;
}) {
  const [hostTeamName, setHostTeamName] = useState<string>(initialHostTeamName || "");
  const [guestTeamName, setGuestTeamName] = useState<string>(initialGuestTeamName || "");
  const [gameDate, setGameDate] = useState<string>(
    initialGameDate ? formatFirebaseTimestampToDate(initialGameDate) : ""
  );
  const [error, setError] = useState<string | undefined>();

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      guest: guestTeamName.trim(),
      host: hostTeamName.trim(),
      gameDate: new Date(gameDate),
    };

    if (!editedId) {
      addDoc(matchesRef, payload);
    }

    if (editedId) {
      updateDoc(matchDocumentRef(editedId), payload);
    }

    setGuestTeamName("");
    setHostTeamName("");
    setGameDate("");

    setIsModalVisible(false);
  }

  return (
    <DimmedBackgroundModal>
      <div className="relative max-h-[80vh] rounded-lg flex bg-white p-4 py-8 px-4 transition-all shadow-md shadow-slate-400 z-50 overflow-auto">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-slate-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          onClick={() => setIsModalVisible(false)}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>

        <form onSubmit={(e) => submit(e)} className="flex gap-2 px-4 w-full justify-center">
          <div className="flex flex-col">
            <label className="font-bold cursor-pointer w-fit" htmlFor="host">
              Nazwa zespołu gospodarza
            </label>
            <input
              id="host"
              name="host"
              type="text"
              placeholder="Proszę wpisać nazwę..."
              className="h-12 min-h-[2.5rem] min-w-[24rem] px-2 border border-slate-400 rounded my-2"
              onChange={(e) => setHostTeamName(e.target.value)}
              value={hostTeamName}
            />

            <label className="font-bold cursor-pointer w-fit" htmlFor="guest">
              Nazwa zespołu gościa
            </label>
            <input
              id="guest"
              name="guest"
              type="guest"
              placeholder="Proszę wpisać nazwę..."
              className="h-12 min-h-[2.5rem] min-w-[24rem] px-2 border border-slate-400 rounded my-2"
              onChange={(e) => setGuestTeamName(e.target.value)}
              value={guestTeamName}
            />

            <label className="font-bold cursor-pointer w-fit" htmlFor="gameDate">
              Data spotkania
            </label>
            <input
              id="gameDate"
              name="gameDate"
              type="datetime-local"
              placeholder="Data spotkanie"
              className="h-12 min-h-[2.5rem] min-w-[24rem] px-2 border border-slate-400 rounded my-2"
              onChange={(e) => setGameDate(e.target.value)}
              value={gameDate}
            />

            {error && (
              <p className="my-4 bg-rose-200 text-rose-600 px-2 py-4 rounded whitespace-pre w-[448px]">{error}</p>
            )}

            <TyperCustomButton />
          </div>
        </form>
      </div>
    </DimmedBackgroundModal>
  );
}
