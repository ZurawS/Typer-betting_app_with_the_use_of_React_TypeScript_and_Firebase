import { signInWithEmailAndPassword } from "firebase/auth";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { MainContext } from "../../App";

export default function LoginPage() {
  const [user] = useAuthState(auth);
  const { setIsLoading } = useContext(MainContext);
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  function standardSignIn(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Proszę uzupełnić wszystkie pola formularza!");
      return;
    }

    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error && error.message ? error.message : error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setErrorMessage(undefined);
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center pt-6 sm:justify-center sm:pt-0">
      <div>
        <h3 className="text-4xl font-bold text-purple-600">Logowanie</h3>
      </div>
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
        <form onSubmit={standardSignIn}>
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 undefined">
              Email
            </label>
            <div className="flex flex-col items-start">
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full mt-1 p-2 border-2 border-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                  !!errorMessage && !email && "!border-rose-600"
                }`}
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 undefined">
              Hasło
            </label>
            <div className="flex flex-col items-start">
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full mt-1 p-2 border-2 border-transparent border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  ${!!errorMessage && !password && "!border-rose-600"}
                `}
              />
            </div>
          </div>
          <Link className="text-xs text-purple-600 hover:underline" to="/remind">
            Zapomniałeś hasła?
          </Link>
          <div className="flex items-center mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Zaloguj się
            </button>
          </div>
        </form>
        <div className="mt-4 text-grey-600 ">
          Nie masz konta?{" "}
          <span className="text-purple-600 hover:underline">
            <Link to="/register">Zarejestruj się</Link>
          </span>
        </div>

        {!!errorMessage && (
          <div className="border border-rose-600 bg-rose-200 flex flex-col px-4 py-3 my-4 rounded-xl items-center">
            <h1 className="text-rose-500 text-center font-bold mb-2">Wystapił problem podczas logowania</h1>
            <span className="self-start text-rose-500">{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
