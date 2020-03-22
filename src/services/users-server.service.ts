import { Injectable } from "@angular/core";
import { User } from "src/entities/user";
import { of, Observable, throwError, EMPTY, Subscriber } from "rxjs";
import { map, catchError, mapTo, tap } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Auth } from "src/entities/auth";
import { SnackbarService } from "./snackbar.service";
import { Group } from "src/entities/group";
import { Store } from "@ngxs/store";
import { TokenExpiredLogout } from "src/shared/auth.actions";

@Injectable({
  providedIn: "root"
})
export class UsersServerService {
  localUsers = [
    new User("Janka", "janka@janka.sk"),
    new User("Danka", "danka@janka.sk")
  ];
  url = "http://localhost:8080/";
  //  private token: string = null;
  //  loggedUserSubscriber: Subscriber<string>;
  // redirectAfterLogin = "/users/extended";

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
    private store: Store
  ) {}

  // getCurrentUser(): Observable<string> {
  //   return new Observable<string>(subcriber => {
  //     this.loggedUserSubscriber = subcriber;
  //     subcriber.next(this.user);
  //   });
  // }

  get token(): string {
    return this.store.selectSnapshot(state => state.auth.token);
  }

  checkToken(): Observable<void> {
    if (this.token == null) {
      return of(undefined);
    }
    return this.http
      .get(this.url + "check-token/" + this.token, {
        responseType: "text"
      })
      .pipe(
        mapTo(undefined),
        catchError(error => this.processHttpError(error))
      );
  }

  getLocalUsers(): Observable<User[]> {
    return of(this.localUsers);
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.url + "users")
      .pipe(catchError(error => this.processHttpError(error)));
  }

  getGroups(): Observable<Group[]> {
    return this.http
      .get<Group[]>(this.url + "groups")
      .pipe(catchError(error => this.processHttpError(error)));
  }

  getExtendedUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.url + "users/" + this.token)
      .pipe(catchError(error => this.processHttpError(error)));
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(this.url + "user/" + id + "/" + this.token)
      .pipe(catchError(error => this.processHttpError(error)));
  }

  saveUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.url + "users/" + this.token, user)
      .pipe(catchError(error => this.processHttpError(error)));
  }

  login(auth: Auth): Observable<string> {
    return this.http
      .post(this.url + "login", auth, { responseType: "text" })
      .pipe(
        tap(token => {
          // this.token = token;
          // this.user = auth.name;
          // this.loggedUserSubscriber.next(this.user);
          this.snackbarService.successMessage("Login successfull");
        }),
        catchError(error => this.processHttpError(error))
      );
  }

  logout(token): Observable<void> {
    // this.user = null;
    //    this.loggedUserSubscriber.next(null);
    return this.http.get(this.url + "logout/" + token).pipe(
      mapTo(undefined),
      catchError(error => this.processHttpError(error))
    );
    //    this.token = null;
  }

  userConflicts(user: User): Observable<string[]> {
    return this.http
      .post<string[]>(this.url + "user-conflicts", user)
      .pipe(catchError(error => this.processHttpError(error)));
  }

  register(user: User): Observable<User> {
    return this.http
      .post<User>(this.url + "register", user)
      .pipe(catchError(error => this.processHttpError(error)));
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http
      .delete(this.url + "user/" + userId + "/" + this.token)
      .pipe(mapTo(true))
      .pipe(catchError(error => this.processHttpError(error)));
  }

  private processHttpError(error) {
    if (error instanceof HttpErrorResponse) {
      this.httpErrorToMessage(error);
      return EMPTY;
    }
    return throwError(error);
  }

  private httpErrorToMessage(error: HttpErrorResponse): void {
    console.log(JSON.stringify(error));
    if (error.status === 0) {
      this.snackbarService.errorMessage("Server unreachable");
      return;
    }
    if (error.status >= 400 && error.status < 500) {
      const message = error.error.errorMessage
        ? error.error.errorMessage
        : JSON.parse(error.error).errorMessage;

      if (error.status === 401 && message == "unknown token") {
        this.store.dispatch(new TokenExpiredLogout());
        this.snackbarService.errorMessage("Session timeout");
        return;
      }
      this.snackbarService.errorMessage(message);
      return;
    }
    this.snackbarService.errorMessage("server error: " + error.message);
  }
}
