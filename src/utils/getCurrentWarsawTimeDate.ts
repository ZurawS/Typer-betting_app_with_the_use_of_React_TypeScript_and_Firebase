import { TimezoneInfoResponse } from "../types/TimeAPI.response";

export async function getCurrentWarsawTimeDate(): Promise<TimezoneInfoResponse> {
    return await fetch("http://worldtimeapi.org/api/timezone/Europe/Warsaw")
    .then((response) => response.json())
  }