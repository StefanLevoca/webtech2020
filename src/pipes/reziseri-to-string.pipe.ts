import { Pipe, PipeTransform } from "@angular/core";
import { Clovek } from "src/entities/clovek";

@Pipe({
  name: "reziseriToString",
})
export class ReziseriToStringPipe implements PipeTransform {
  transform(reziseri: Clovek[]): string {
    return reziseri
      .map(
        (reziser) =>
          reziser.krstneMeno +
          " " +
          (reziser.stredneMeno ? reziser.stredneMeno + " " : "") +
          reziser.priezvisko
      )
      .join("; ");
  }
}
