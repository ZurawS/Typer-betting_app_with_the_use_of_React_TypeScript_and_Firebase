import { createUserWithEmailAndPassword, updateProfile, UserCredential } from "firebase/auth";
import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
// import UserCRUDUtils, { UserData } from "../../utils/userDatabaseCRUD";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmationPassword, setConfirmationPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  function standardSignUp(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (password !== confirmationPassword) {
      return setError("Podane hasła nie są takie same, proszę wprowadzić je ponownie.");
    }
    setError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials: UserCredential) => {
        // const userData: UserData = {
        //   uid: userCredentials.user.uid,
        //   name: displayName,
        // }
        // UserCRUDUtils.createUser(userData);
        updateProfile(userCredentials.user, {
          displayName,
        });
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="flex flex-col items-center sm:justify-center sm:pt-0">
      <div>
        <h3 className="text-4xl font-bold text-purple-600">Rejestracja</h3>
      </div>

      {error && (
        <div className="flex justify-center my-4 px-8 py-4 bg-rose-100 text-red-600 rounded-lg">
          <h1 className="text-2xl text-center font-semibold">{error}</h1>
        </div>
      )}

      <div className="w-full px-6 py-2 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
        <form onSubmit={standardSignUp}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 undefined">
              Imię i Nazwisko
            </label>
            <div className="flex flex-col items-start">
              <input
                type="text"
                name="name"
                onChange={(e) => setDisplayName(e.target.value)}
                className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 undefined">
              Email
            </label>
            <div className="flex flex-col items-start">
              <input
                required
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 undefined">
              Hasło
            </label>
            <div className="flex flex-col items-start">
              <input
                required
                minLength={6}
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 undefined">
              Potwierdź hasło
            </label>
            <div className="flex flex-col items-start">
              <input
                required
                minLength={6}
                type="password"
                name="password_confirmation"
                onChange={(e) => setConfirmationPassword(e.target.value)}
                className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Zarejestruj się
            </button>
          </div>
        </form>
        <div className="mt-4 text-grey-600">
          Masz już konto?{" "}
          <span className="text-purple-600 hover:underline">
            <Link to="/login">Zaloguj się</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
