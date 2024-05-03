import React, { FormEvent, useContext, useState } from "react";
import { Match } from "../../../types/Match.model";
import { formatDate } from "../../../utils/formatDate";
import { addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth, betDocumentRef, betsRef, matchDocumentRef } from "../../../utils/firebase";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import CreateMatchPanel from "./CreateMatchPanel";
import SeparatorLine from "../SeparatorLine/SeparatorLine";
import TyperCustomButton from "../TyperCustomButton/TyperCustomButton";
import { MainContext } from "../../../App";
import { Bet } from "../../../types/Bet.model";

export default function MatchPanel({
  matchesData,
  userBet,
  isAvailable,
}: {
  matchesData: Match;
  isAvailable: boolean;
  userBet: Bet | undefined;
}) {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [displayScoreBettingForm, setDisplayScoreBettingForm] = useState<boolean>(false);
  const [hostBettedScore, setHostBettedScore] = useState<string>(userBet ? userBet.hostScore : "");
  const [guestBettedScore, setGuestBettedScore] = useState<string>(userBet ? userBet.guestScore : "");
  const { isAdmin } = useContext(MainContext);

  function deleteMatch() {
    if (!isAdmin) return;
    deleteDoc(matchDocumentRef(matchesData.id));
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!auth.currentUser?.uid || !isAvailable) return;

    const payload = {
      matchId: matchesData.id,
      userId: auth.currentUser.uid,
      userEmail: auth.currentUser.email,
      hostTeamName: matchesData.host,
      hostScore: hostBettedScore.trim().replaceAll(" ", ""),
      guestTeamName: matchesData.guest,
      guestScore: guestBettedScore.trim().replaceAll(" ", ""),
    };

    if (!userBet) {
      addDoc(betsRef, payload);
    }

    if (userBet) {
      updateDoc(betDocumentRef(userBet.id), payload);
    }

    setDisplayScoreBettingForm(false);
  }

  return (
    <>
      <div className="flex rounded bg-white shadow-md p-4 my-4 transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md hover:shadow-slate-400">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <div className={`${isAvailable ? "bg-green-600" : "bg-rose-600"} h-5 w-5 rounded-full`}></div>
              <span className={`${isAvailable ? "text-green-600" : "text-rose-600"} text-sm`}>
                {formatDate(matchesData.gameDate)}
              </span>
            </div>

            <div className="flex gap-2">
              {isAdmin && (
                <button
                  onClick={() => setIsEditModalVisible(true)}
                  className="inline-flex items-center justify-center font-medium text-white bg-indigo-500 p-2 rounded-sm ml-auto"
                >
                  <span className="svg-icon svg-icon-primary svg-icon-2x">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12px"
                      height="12px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <rect x="0" y="0" width="12" height="12" />
                        <path
                          d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z"
                          fill="#fff"
                          fillRule="nonzero"
                          transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "
                        />
                        <rect fill="#fff" opacity="0.3" x="5" y="20" width="15" height="2" rx="1" />
                      </g>
                    </svg>
                  </span>
                  <span className="sr-only">Edit modal</span>
                </button>
              )}
              {isAdmin && (
                <button
                  onClick={() => setIsDeleteModalVisible(true)}
                  className="inline-flex items-center justify-center font-medium text-white bg-rose-500 p-2 rounded-sm ml-auto"
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
              )}
            </div>
          </div>

          <div className="flex flex-col text-2xl gap-4 justify-center">
            <span>
              {matchesData.host} - {matchesData.guest}
            </span>

            {userBet && (
              <div className="flex flex-col gap-2">
                <span>Twój zakład: </span>
                <div className="flex">
                  <p className="flex flex-col items-center w-max px-8">
                    <span className="text-4xl my-2">{userBet.hostScore}</span>
                    <span className=" text-base">{matchesData.host}</span>
                  </p>
                  <p className="text-4xl flex items-center pb-8">-</p>
                  <p className="flex flex-col items-center w-max px-8">
                    <span className="text-4xl my-2">{userBet.guestScore}</span>
                    <span className=" text-base">{matchesData.guest}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {isAvailable && !matchesData.score90 && !matchesData.finalScore && (
            <div className="w-full">
              <TyperCustomButton
                customClass="w-48"
                label={displayScoreBettingForm ? "Ukryj formularz" : "Obstaw wynik meczu"}
                onClick={() => setDisplayScoreBettingForm((val) => !val)}
              />

              {displayScoreBettingForm && (
                <div className="mt-4">
                  <SeparatorLine />
                  <form className="max-w-sm mt-4 flex gap-6" onSubmit={(e) => submit(e)}>
                    <div>
                      <label htmlFor="host" className="block mb-2 text-sm font-medium text-gray-900 w-max">
                        Wynik zespołu gospodarza:
                      </label>
                      <input
                        type="number"
                        min={0}
                        className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 w-48"
                        required
                        id="host"
                        name="host"
                        onChange={(e) => setHostBettedScore(e.target.value)}
                        value={hostBettedScore}
                      />
                    </div>

                    <div>
                      <label htmlFor="guest" className="block mb-2 text-sm font-medium text-gray-900 w-max">
                        Wynik zespołu gościa:
                      </label>
                      <input
                        type="number"
                        min={0}
                        className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 w-48"
                        required
                        id="guest"
                        name="guest"
                        onChange={(e) => setGuestBettedScore(e.target.value)}
                        value={guestBettedScore}
                      />
                    </div>
                    <TyperCustomButton customClass="self-end !m-0" />
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {isDeleteModalVisible && (
        <ConfirmationModal
          modalTitle="Czy na pewno chcesz usunąć pozycję?"
          onCancel={() => setIsDeleteModalVisible(false)}
          onSubmit={deleteMatch}
        />
      )}
      {isEditModalVisible && (
        <CreateMatchPanel
          setIsModalVisible={setIsEditModalVisible}
          initialHostTeamName={matchesData.host}
          initialGuestTeamName={matchesData.guest}
          initialGameDate={matchesData.gameDate}
          editedId={matchesData.id}
        />
      )}
    </>
  );
}
