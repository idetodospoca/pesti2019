import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User';

@Injectable()
export class AuthService {

  tokenName = 'token';
  constructor(
  ) { }

  public getToken(): string {
    return localStorage.getItem(this.tokenName);
  }

  public setToken(token: string): void {
    localStorage.setItem(this.tokenName, token);
  }

  public removeToken(): void {
    localStorage.removeItem(this.tokenName);
  }

  public isAuthenticated(): boolean {
    // return a boolean reflecting
    // whether or not the token is expired
    return tokenNotExpired(this.tokenName);
  }

  public getUser(): User {
    let token = this.isAuthenticated() && this.getToken();

    if (!token) {
      return {id: "---", name: "Guest", email: "", role: "guest"};
    }

    return new JwtHelper().decodeToken(token);
  }

  public hasRole(role: string[] | string): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }

    let userRole = this.getUser().role;

    // Make sure the role variable is always an array
    if (typeof role === 'string') {
      role = [role];
    }
    // console.log(role, userRole);
    return role.indexOf(userRole) !== -1;
  }

  public isOwner(docOwner: string): boolean {

    let userId = this.getUser().email;

    return (docOwner == userId);
  }

  public isCollab(collabs: any[]): boolean {

    let userId = this.getUser().id;

    for (let user of collabs) {
      if (user._id == userId) {
          return true;
      }
    }

  }


}
