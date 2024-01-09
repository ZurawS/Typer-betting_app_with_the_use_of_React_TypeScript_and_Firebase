import { Timestamp } from "firebase/firestore";

export function formatDate(timestamp: { seconds: number; nanoseconds: number }): string {
  if (!timestamp) return "Invalid date";

  const date = new Date(timestamp.seconds * 1000);
  return (
    [
      (date.getDate() < 10 ? "0" : "") + date.getDate(),
      (date.getMonth() < 10 ? "0" : "") + (date.getMonth() + 1),
      date.getFullYear(),
    ].join(".") +
    " " +
    [(date.getHours() < 10 ? "0" : "") + date.getHours(), (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()].join(
      ":"
    )
  );
}

export function formatFirebaseTimestampToDate(firebaseTimeStamp: Timestamp): string {
  const date = firebaseTimeStamp.toDate();
  const tzOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() - tzOffset);
  const formattedDateWithOffset = adjustedDate.toISOString().slice(0, -5);
  return formattedDateWithOffset;
}
