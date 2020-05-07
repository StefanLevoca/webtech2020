import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Film } from "src/entities/film";
import { FilmsServerService } from "src/services/films-server.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FilmResolverService implements Resolve<Film> {
  constructor(private filmsServerService: FilmsServerService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Film> {
    return this.filmsServerService.getFilm(+route.paramMap.get("id"));
  }
}
