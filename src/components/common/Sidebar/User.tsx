import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../utils/firebase";
import { useNavigate } from "react-router-dom";

export default function User({ sidebarExpanded }: { sidebarExpanded: boolean }) {
  const [isPopoverVisible, setIsPopoverVisible] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  function signOut() {
    auth.signOut();
    navigate("/");
    setIsPopoverVisible(false);
  }

  return (
    <>
      {user && (
        <div className="flex items-center relative w-full">
          <button
            type="button"
            className="flex items-center w-full"
            aria-expanded="false"
            data-dropdown-toggle="dropdown-user"
            onClick={() => sidebarExpanded && setIsPopoverVisible((value) => !value)}
          >
            <span className="sr-only">Otwórz menu użytkownika</span>
            {user.photoURL ? (
              <img className="w-10 h-10 rounded-full" src={user.photoURL} alt="user" />
            ) : (
              <svg
                stroke-width="1.5"
                fill="none"
                stroke="currentColor"
                className="w-10 h-10 text-slate-200 shrink-0"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            )}
            <span className="flex items-center text-slate-200 text-lg font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
              {user.displayName || user.email?.split("@")[0]}
            </span>
          </button>

          {isPopoverVisible && sidebarExpanded && (
            <div className="bg-slate-100 absolute -top-12 w-full px-4 py-2 rounded-sm hover:bg-slate-200 hover:text-gray-700">
              <button onClick={signOut} className="min-w-full">
                <span className="text-sm  font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Wyloguj się
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
