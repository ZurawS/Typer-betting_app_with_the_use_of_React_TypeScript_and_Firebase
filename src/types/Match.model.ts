import { Timestamp } from "firebase/firestore";

export interface Match {
  id: string;
  host: string;
  guest: string;
  gameDate: Timestamp;
  result: string;
}
