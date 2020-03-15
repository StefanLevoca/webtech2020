import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Film } from "src/entities/film";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { UsersServerService } from "./users-server.service";

@Injectable({
  providedIn: "root"
})
export class FilmsServerService {
  url = "http://localhost:8080/films";

  constructor(
    private http: HttpClient,
    private usersServerService: UsersServerService
  ) {}

  get token() {
    return this.usersServerService.token;
  }

  private getHeader() {
    return this.token ? { headers: { "X-Auth-Token": this.token } } : undefined;
  }

  getFilms(): Observable<FilmsResponse> {
    return this.http
      .get<FilmsResponse>(this.url, this.getHeader())
      .pipe(tap(resp => console.log(resp)));
  }
}

export interface FilmsResponse {
  items: Film[];
  totalCount: number;
}
