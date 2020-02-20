import { Injectable } from "@angular/core";
import { User } from "src/entities/user";
import { of, Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Auth } from "src/entities/auth";

@Injectable({
  providedIn: "root"
})
export class UsersServerService {
  localUsers = [
    new User("Janka", "janka@janka.sk"),
    new User("Danka", "danka@janka.sk")
  ];
  url = "http://158.197.236.42:8080/";
  private token: string = null;

  constructor(private http: HttpClient) {}

  getLocalUsers(): Observable<User[]> {
    return of(this.localUsers);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "users");
  }

  login(auth: Auth): Observable<boolean> {
    return this.http
      .post(this.url + "login", auth, { responseType: "text" })
      .pipe(
        map(token => {
          this.token = token;
          return true;
        }),
        catchError(error => this.processHttpError(error))
      );
  }

  private processHttpError(error) {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      return of(false);
    }
    return throwError(error);
  }
}
