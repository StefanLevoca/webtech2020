import { Pipe, PipeTransform } from "@angular/core";
import { Postava } from "src/entities/postava";

@Pipe({
  name: "postavyToString",
})
export class PostavyToStringPipe implements PipeTransform {
  transform(postavy: Postava[]): string {
    return postavy
      .map(
        (filmovaPostava) =>
          "Postava " +
          filmovaPostava.postava +
          " je " +
          filmovaPostava.dolezitost +
          " a hraje ju " +
          filmovaPostava.herec.krstneMeno +
          " " +
          (filmovaPostava.herec.stredneMeno
            ? filmovaPostava.herec.stredneMeno + " "
            : "") +
          filmovaPostava.herec.priezvisko
      )
      .join("; ");
  }
}
