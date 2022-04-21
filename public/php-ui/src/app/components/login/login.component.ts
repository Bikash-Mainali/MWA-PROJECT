import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { UserServiceService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() showHideLoginComponent = new EventEmitter<boolean>();
  loginError: boolean = false;
  loginErrorMessage!: string;
  #name!: string

  get name() {
    return this._authService.name
  }

  get isLoggedIn() {
    return this._authService.isLoggedIn
  }
  constructor(private userService: UserServiceService,
    private _router: Router,
    private _authService: AuthenticationService,
    private _toastr: ToastrService) { }


  @Output() showHome = new EventEmitter<boolean>();
  ngOnInit(): void {
    this._authService.isLoggedIn = false;

}

  onLogin(loginForm: NgForm) {
    console.log("..")
    console.log(loginForm.value)

    this.userService.generateTokenAndLogin(loginForm.value).subscribe({
      next: (loginResponse) => {
        console.log(loginResponse);
        this._authService.token = loginResponse.data.token
        this._authService.isLoggedIn = true;
        this.showHome.emit(true)
        this._toastr.success("Login successful")
        if (loginResponse.status === 200) {
          this._router.navigate(["home"])
        } else {
          console.log("adsfadfasdfas")
          this.loginError = true;
          this._toastr.error("Login Failed")
          this.loginErrorMessage = 'invalid user name or password!';
        }
      },
      error: (err) => {
        debugger
        console.log(err)
        this.loginError = true;
        this._toastr.error("Login Failed")
        this.loginErrorMessage = 'invalid user name or password!';
      },
      complete: () => console.log("complete")
    })
  }


}
