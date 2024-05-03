Informacje o projekcie

Hosting i baza danych
Aplikacja jest tak przystosowana, żebyś mógł ją hostować przy pomocy Firebase, przy jego pomocy również ogarniętą masz od razu bazę danych. Będziesz potrzebował informacji z Firebase'a, żeby ustawić potrzebne zmienne środowiskowe - patrz niżej.

Konfiguracja Firebase
W Firebase interesują Cię 3 zakładki:

- Authentication - wszyscy użytkownicy, którzy utworzyli konto na Twojej stronie
- Firestore Database - baza danych, PAMIĘTAJ SKONFIGUROWAĆ RULES!
- Hosting - postawienie stronki
  Wszystkie będziesz potrzebować. Istniejeą miliony poradników jak je skonfigurować w internetach.

Zmienne środowiskowe
Pierwsze co to musisz w głównym folderze utworzyć plik .env, w którym będziesz przechowywał zmienne środowiskowe.
W środku tego pliku musisz zawrzeć następujące informacje (to przykład mojego .env):
REACT_APP_API_KEY=AItaSyAbeqH4-dnaYWaykVTbXF3igIpdnInnoHg
REACT_APP_AUTH_DOMAIN=typertest-d8436.firebaseapp.com
REACT_APP_PROJECT_ID=typertest-d8436
REACT_APP_STORAGE_BUCKET=typertest-d8436.appspot.com
REACT_APP_MESSAGING_SENDER_ID=171800070509
REACT_APP_APP_ID=1:171800070509:web:9f6e146c2b2ebe062d7264
REACT_APP_BET_PREEMPTIVE_LOCK_IN_HOURS=1
REACT_APP_ADMIN_UIDS=["ZXH8z4eesjb6MEN3Ms0hIEh3Om43", "etTjp1AfrkMoIwPvXArTydyk6wm1"] <==== Tutaj umieszczasz id użytkowników którzy mają być administratorami - id znajdziesz w Firebase zakładka Authentication

Zarządzanie wersją aplikacji
W celu zarządzania wersją aplikacji wykorzystany zostął GitHub, gdzie obecnie jest ona przechowywana:
https://github.com/ZurawS/Typer-betting_app_with_the_use_of_React_TypeScript_and_Firebase
Jeśli wprowadzisz jakieś zmiany to musisz je wypchnąć do repo oraz zbudować i wrzucić aplikację do Firebase. Dla ułatwienia masz prosty skrypt przygotowany w pliku: "update-application.sh". Możesz go wywołać to zmiany zostaną dodane.

Wysyłanie emaili
Firebase pozwala na łatwą obsługę zarządzania kontami użytkowników. Dzięki temu takie elementy jak wysyłanie maili jest przez nieg zapewnione. Jeśli chcesz wprowadzić zmiany w treści jakiegoś maila np. przypominającego hasło, musisz wejść w Authentication -> Settings
