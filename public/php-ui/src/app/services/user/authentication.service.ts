import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _jwtService: JwtHelperService) { }

  #isLoggedIn: boolean = false;
  #name!: string

  get isLoggedIn() {
    return this.#isLoggedIn;

  }

  set isLoggedIn(isLoggedIn) {
    this.#isLoggedIn = isLoggedIn;
  }

  get token() {
    return localStorage.getItem(environment.TOKEN_STORAGE) as string;

  }
  set token(token) {
    localStorage.setItem(environment.TOKEN_STORAGE, token);
    console.log(token);
    console.log(localStorage.getItem(environment.TOKEN_STORAGE))
    this.#isLoggedIn = true;

  }

  get name() {
    let name: string = "";
    if (this.token) {
      name = this._jwtService.decodeToken(this.token).name as string
    }
    const tokenString: string = localStorage.getItem(environment.TOKEN_STORAGE) as string;
    this.#name = this._jwtService.decodeToken(tokenString).usename;
    return this.#name;
  }

  deleteToken() {
    localStorage.removeItem(environment.TOKEN_STORAGE);
    localStorage.clear();
    this.isLoggedIn = false;
  }
}
