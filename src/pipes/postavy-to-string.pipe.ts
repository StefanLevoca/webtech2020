import { Pipe, PipeTransform } from "@angular/core";
import { Postava } from "src/entities/postava";

@Pipe({
  name: "postavyToString",
})
export class PostavyToStringPipe implements PipeTransform {
  transform(postavy: Postava[]): string {
    return postavy
      .map(
        (filmovaPostava) => filmovaPostava.postava
        // + " " + filmovaPostava.dolezitost + " " + filmovaPostava.herec.priezvisko + " " + filmovaPostava.herec.krstneMeno + (filmovaPostava.herec.stredneMeno == null || false ? "" : " " + filmovaPostava.herec.stredneMeno)
      )
      .join(", ");
  }
}
