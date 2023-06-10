import React, { FormEvent, useState } from "react";
import { matchesRef } from "../../../utils/firebase";
import { addDoc } from "firebase/firestore";

export default function CreateMatchPanel(setIsAddVisible: any) {
  const [hostTeamName, setHostTeamName] = useState<string>("");
  const [guestTeamName, setGuestTeamName] = useState<string>("");
  const [gameDate, setGameDate] = useState<string>("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    addDoc(matchesRef, {
      guest: guestTeamName,
      host: hostTeamName,
      gameDate: new Date(gameDate),
    });

    setGuestTeamName("");
    setHostTeamName("");
    setGameDate("");

    setIsAddVisible(false);
  }

  return (
    <div className="absolute right-10 -translate-y-3 flex bg-white p-4 my-4 transition-all shadow-md shadow-slate-400 z-50">
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
            className="h-12 min-w-[24rem] px-2 border border-slate-400 rounded my-2"
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
            className="h-12 min-w-[24rem] px-2 border border-slate-400 rounded my-2"
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
            className="h-12 min-w-[24rem] px-2 border border-slate-400 rounded my-2"
            onChange={(e) => setGameDate(e.target.value)}
            value={gameDate}
          />

          <button
            className="inline-flex items-center justify-center font-medium text-white bg-indigo-500 px-4 py-2 rounded-sm mt-2"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
