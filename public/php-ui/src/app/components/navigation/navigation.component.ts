import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  name!:string

  get isLoggedIn() {
    return this._authService.isLoggedIn
  }

  constructor(private _router: Router, 
    private _authService: AuthenticationService,
   ) { }

  ngOnInit(): void {
    debugger
    this.name = this._authService.name;
  }
  onAdd():void{
    this._router.navigate(["songs/add"])
  }
  
  onHome():void{
    this._router.navigate(["home"])
  }
  onSongs(): void{
    this._router.navigate(["songs"])
  }
  onRegister(): void{
    this._router.navigate(["register"])
  }

  onLogout() {
    this._authService.deleteToken()
   // this.isLoggedIn = false;
   this._router.navigate(["register"])
  }
}
