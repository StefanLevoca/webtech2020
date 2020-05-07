import { Component, OnInit } from "@angular/core";
import { Film } from "src/entities/film";
import { FilmsServerService } from "src/services/films-server.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ConfirmDialogComponent } from "src/modules/users/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { map } from "rxjs/operators";

@Component({
  selector: "app-add-film",
  templateUrl: "./add-film.component.html",
  styleUrls: ["./add-film.component.css"],
})
export class AddFilmComponent implements OnInit {
  filmToEdit = new Film("", 0);
  filmSaved = false;

  constructor(
    private filmsServerService: FilmsServerService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.filmSaved = false;
  }

  saveFilm(film: Film) {
    this.filmsServerService.saveFilm(film).subscribe(() => {
      this.router.navigateByUrl("/films");
      this.filmSaved = true;
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.filmSaved) {
      return true;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Leaving?",
        message: "Adding film is not saved, leave?",
      },
    });
    return dialogRef.afterClosed().pipe(map((result) => !!result));
  }
}
