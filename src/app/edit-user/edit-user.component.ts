import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsersServerService } from 'src/services/users-server.service';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/entities/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userToEdit:User;

  constructor(
    private route: ActivatedRoute, 
    private usersServerService: UsersServerService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params:ParamMap) => 
        this.usersServerService.getUser(+params.get("id"))
      )
    ).subscribe((user:User) => {
      this.userToEdit = user
    })
  }

}
