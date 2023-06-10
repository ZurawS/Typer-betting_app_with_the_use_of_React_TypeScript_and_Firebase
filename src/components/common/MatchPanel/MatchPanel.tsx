import React from "react";
import { Match } from "../../../types/Match.model";
import { formatDate } from "../../../utils/formatDate";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../../utils/firebase";

export default function MatchPanel({ data }: { data: Match }) {
  //TODO - dodać pobieranie czasu z Firebase
  console.log(new Date().getTime() / 1000, new Date().getSeconds() + 3600, data.gameDate.seconds);
  let isAvailable: boolean = new Date().getTime() / 1000 + 3600 < data.gameDate.seconds;

  function deleteMatch() {
    deleteDoc(doc(firestore, "matches", data.id));
  }

  return (
    <div className="flex bg-white shadow-md p-4 my-4 transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md hover:shadow-slate-400">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center gap-2">
          <div className={`${isAvailable ? "bg-green-600" : "bg-rose-600"} h-5 w-5 rounded-full`}></div>
          <span className={`${isAvailable ? "text-green-600" : "text-rose-600"} text-sm`}>
            {formatDate(data.gameDate)}
          </span>

          <button
            onClick={deleteMatch}
            className="inline-flex items-center justify-center font-medium text-white bg-rose-500 px-2 rounded-sm ml-auto"
          >
            X
          </button>
        </div>

        <div className="flex text-2xl items-center gap-4">
          <span>
            {data.host} - {data.guest}
          </span>
        </div>
      </div>
    </div>
  );
}
