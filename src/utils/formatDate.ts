export function formatDate(timestamp: { seconds: number; nanoseconds: number }) {
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
