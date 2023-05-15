import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RemindPassword() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>();
  const [email, setEmail] = useState("");
  const auth = getAuth();

  function abort(): void {
    navigate("/login");
  }

  function submit() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("Wiadomoć z nowym hasłem została wysłana");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Wystąpił błąd podczas wysyłania wiadomości: \n" + error);
      });
  }

  return (
    <div>
      <div className="flex flex-col items-center pt-6 sm:justify-center sm:pt-0">
        <div>
          <h3 className="text-4xl font-bold text-purple-600">Przypomnienie hasła</h3>
        </div>
        {message && (
          <div className="rounded-md whitespace-pre border border-indigo-600 bg-indigo-100 px-10 py-5 mt-4 text-indigo-700 text-bold">
            {message}
          </div>
        )}
        <div className="w-full px-6 py-2 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form>
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 undefined">
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex items-center mt-4 gap-4">
              <button
                type="button"
                onClick={abort}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Anuluj
              </button>
              <button
                type="button"
                onClick={submit}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Wyślij
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
