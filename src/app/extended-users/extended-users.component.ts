import { Component, OnInit } from "@angular/core";
import { UsersServerService } from "src/services/users-server.service";
import { User } from "src/entities/user";

@Component({
  selector: "app-extended-users",
  templateUrl: "./extended-users.component.html",
  styleUrls: ["./extended-users.component.css"]
})
export class ExtendedUsersComponent implements OnInit {
  users: User[] = [];
  columnsToDisplay = ["id", "name", "email", "lastLogin"];
  constructor(private usersServerService: UsersServerService) {}

  ngOnInit(): void {
    this.usersServerService.getExtendedUsers().subscribe(users => {
      this.users = users;
    });
  }
}
