import { Component, OnInit } from "@angular/core";
import { Film } from "src/entities/film";
import { FilmsServerService } from "src/services/films-server.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-film",
  templateUrl: "./add-film.component.html",
  styleUrls: ["./add-film.component.css"],
})
export class AddFilmComponent implements OnInit {
  filmToEdit = new Film("", 0);

  constructor(
    private filmsServerService: FilmsServerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveFilm(film: Film) {
    this.filmsServerService.saveFilm(film).subscribe(() => {
      this.router.navigateByUrl("/films");
    });
  }
}
