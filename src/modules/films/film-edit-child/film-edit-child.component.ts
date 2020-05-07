import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { Film } from "src/entities/film";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from "@angular/forms";

@Component({
  selector: "app-film-edit-child",
  templateUrl: "./film-edit-child.component.html",
  styleUrls: ["./film-edit-child.component.css"],
})
export class FilmEditChildComponent implements OnChanges {
  @Input() film: Film;
  @Output() changed = new EventEmitter<Film>();

  public reziseri: FormArray;
  public reziserForm: FormGroup;
  form: FormGroup;
  array: FormArray;

  ngOnInit() {
    this.form = this.formBuilder.group({
      array: this.formBuilder.array([this.postavaInit()]),
    });
    this.form.valueChanges.subscribe();
  }

  constructor(private formBuilder: FormBuilder) {
    this.reziserForm = this.formBuilder.group({
      reziseri: this.formBuilder.array([]),
    });
  }

  postavaInit(): FormGroup {
    return this.formBuilder.group({
      postava: "Názov postavy",
      dolezitost: "hlavná postava",

      herec: this.formBuilder.group({
        krstneMeno: "Krstné meno",
        stredneMeno: "Stredné meno",
        priezvisko: "Priezvisko",
      }),
    });
  }

  addPostava(): void {
    const control = <FormArray>this.form.controls["array"];
    control.push(this.postavaInit());
  }

  createReziser(): FormGroup {
    return this.formBuilder.group({
      priezvisko: "",
      krstneMeno: "",
      stredneMeno: "",
    });
  }

  addReziser(): void {
    this.reziseri = this.reziserForm.get("reziseri") as FormArray;
    this.reziseri.push(this.createReziser());
  }

  removeReziser(idx: number): void {
    this.reziseri.removeAt(idx);
  }

  ngOnChanges(): void {
    if (this.film) {
      this.nazov.setValue(this.film.nazov);
      this.rok.setValue(this.film.rok);
      this.slovenskyNazov.setValue(this.film.slovenskyNazov);
    }
  }

  filmEditForm = new FormGroup({
    nazov: new FormControl("", [Validators.required, Validators.minLength(5)]),

    slovenskyNazov: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),

    rok: new FormControl("", [
      Validators.required,
      Validators.pattern(/^\d{4}$/),
    ]),

    imdbID: new FormControl("", [Validators.pattern(/^[0-9]*$/)]),
  });

  get nazov(): FormControl {
    return this.filmEditForm.get("nazov") as FormControl;
  }

  get slovenskyNazov(): FormControl {
    return this.filmEditForm.get("slovenskyNazov") as FormControl;
  }

  get rok(): FormControl {
    return this.filmEditForm.get("rok") as FormControl;
  }

  get imdbID() {
    return this.filmEditForm.get("imdbID") as FormControl;
  }

  get reziserControl(): FormControl {
    return this.reziserForm.get("reziseri")["controls"] as FormControl;
  }

  stringify(text: string): string {
    return JSON.stringify(text);
  }

  formSubmit(): void {
    const film = new Film(
      this.nazov.value,
      this.rok.value,
      this.film.id,
      this.imdbID.value,
      this.slovenskyNazov.value,
      undefined /* poradieVRebricku*/,
      this.reziseri.value,
      this.form.value.array
    );
    this.changed.next(film);
  }
}
