import { Injectable } from "@angular/core";
import { User } from "src/entities/user";
import { of, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsersServerService {
  localUsers = [
    new User("Janka", "janka@janka.sk"),
    new User("Danka", "danka@janka.sk")
  ];
  url = "http://158.197.236.42:8080/";

  constructor(private http: HttpClient) {}

  getLocalUsers(): Observable<User[]> {
    return of(this.localUsers);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "users/abc");
  }
}
