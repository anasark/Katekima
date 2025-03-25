import type { Berry } from "./Berry";

export interface BerryApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Berry[];
}
