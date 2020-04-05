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
          reziser.priezvisko +
          " " +
          reziser.krstneMeno +
          (reziser.stredneMeno == null || false
            ? ""
            : " " + reziser.stredneMeno)
      )
      .join(", ");
  }
}
