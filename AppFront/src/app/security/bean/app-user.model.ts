import {AppRole} from "./app-role.model";

export class AppUser {
  public username: string;
  public password: string; // À des fins de sécurité, vous ne devriez pas vraiment renvoyer le mot de passe depuis le serveur
  public appRoles: [];
  constructor() {
    this.username="", this.password="",
    this.appRoles=[]
  }
}
