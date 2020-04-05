import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FilmsRoutingModule } from "./films-routing.module";
import { FilmsMenuComponent } from "./films-menu/films-menu.component";
import { FilmEditComponent } from "./film-edit/film-edit.component";
import { FilmsListComponent } from "./films-list/films-list.component";
import { FilmDetailComponent } from "./film-detail/film-detail.component";
import { MaterialModule } from "src/app/material.module";
import { FilmEditChildComponent } from "./film-edit-child/film-edit-child.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AddFilmComponent } from "./add-film/add-film.component";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { ReziseriToStringPipe } from "src/pipes/reziseri-to-string.pipe";
import { PostavyToStringPipe } from "src/pipes/postavy-to-string.pipe";

@NgModule({
  declarations: [
    FilmsListComponent,
    FilmsMenuComponent,
    ConfirmDialogComponent,
    FilmEditComponent,
    FilmEditChildComponent,
    FilmsListComponent,
    FilmDetailComponent,
    ReziseriToStringPipe,
    PostavyToStringPipe,
    AddFilmComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FilmsRoutingModule
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class FilmsModule {}
