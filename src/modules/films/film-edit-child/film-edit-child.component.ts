import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { Film } from "src/entities/film";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
//import { Clovek } from "src/entities/clovek";
//import { Postava } from "src/entities/postava";
//import { Router } from "@angular/router";
//import { FilmsServerService } from "src/services/films-server.service";

@Component({
  selector: "app-film-edit-child",
  templateUrl: "./film-edit-child.component.html",
  styleUrls: ["./film-edit-child.component.css"],
})
export class FilmEditChildComponent implements OnChanges {
  @Input() film: Film;
  @Output() changed = new EventEmitter<Film>();
  //reziser: Clovek[];
  //postava: Postava[];
  filmEditForm = new FormGroup({
    nazov: new FormControl("", [Validators.required, Validators.minLength(5)]),

    rok: new FormControl("", [
      Validators.required,
      Validators.pattern(/^\d{4}$/),
    ]),

    slovenskyNazov: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),

    //reziser: new FormArray(
    //[]
    //new FormControl("", [
    //Validators.required,
    //Validators.minLength(5),
    //]
    //),

    //postava: new FormArray(
    // []
    //new FormControl("", [
    //Validators.required,
    //Validators.minLength(5),
    //]
    // ),
  });

  constructor() {} //  private router: Router, private filmsServerService: FilmsServerService

  ngOnChanges(): void {
    if (this.film) {
      this.nazov.setValue(this.film.nazov);
      this.rok.setValue(this.film.rok);
      this.slovenskyNazov.setValue(this.film.slovenskyNazov);
      //    this.reziser.setValue(this.film.reziser);
      //    this.postava.setValue(this.film.postava);
    }
  }

  get nazov() {
    return this.filmEditForm.get("nazov") as FormControl;
  }

  get rok() {
    return this.filmEditForm.get("rok") as FormControl;
  }

  get slovenskyNazov() {
    return this.filmEditForm.get("slovenskyNazov") as FormControl;
  }

  get reziser() {
    return this.filmEditForm.get("reziser") as FormArray;
  }

  get postava() {
    return this.filmEditForm.get("postava") as FormArray;
  }

  stringify(text: string) {
    return JSON.stringify(text);
  }

  formSubmit() {
    const film = new Film(
      this.nazov.value,
      this.rok.value,
      undefined /* id */,
      undefined /* imdbID*/,
      this.slovenskyNazov.value,
      undefined /* poradieVRebricku*/,
      undefined, //this.reziser.value
      undefined //this.postava.value
    );
    this.changed.next(film);
  }
}
