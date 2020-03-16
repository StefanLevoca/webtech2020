import { Clovek } from "./clovek";
import { Postava } from "./postava";

export class Film {
  constructor(
    nazov: string,
    rok: number,
    id?: number,
    imdbID?: string,
    slovenskyNazov?: string,
    poradieVRebricku?: { [rebricek: string]: number },
    reziser: Clovek[] = [],
    postava: Postava[] = []
  ) {}
}
