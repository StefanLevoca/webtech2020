import { Group } from "./group";

export class User {
  constructor(
    public name: string,
    public email: string,
    public id?: number,
    public lastLogin?: Date,
    public password: string = "",
    public groups: Group[] = []
  ) {}
}
