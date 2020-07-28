import { Component, OnInit } from '@angular/core';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { Router } from '@angular/router';
import { UpdatePasswordForm } from 'src/app/models/updatePasswordForm';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isPasswordConfirm: boolean
  public userLoginDetails: UserLoginDetails;
  public updatePasswordForm: UpdatePasswordForm
  public confirmPassword: string
  private usersService: UserService;
  constructor(userService: UserService, private router: Router) {
    this.usersService = userService;
  }

  ngOnInit(): void {
    this.isPasswordConfirm = true
    this.userLoginDetails = new UserLoginDetails("", "")
    this.updatePasswordForm = new UpdatePasswordForm("", "")
  }

  public login() {
    let observable = this.usersService.login(this.userLoginDetails)
    observable.subscribe(SuccesfullLoginResponse => {
      sessionStorage.setItem("token", SuccesfullLoginResponse.token + "");
      console.log(SuccesfullLoginResponse);
      // console.log(SuccesfullLoginResponse.user_id);
      this.usersService.userFirstName = SuccesfullLoginResponse.name
      this.usersService.userLastName = SuccesfullLoginResponse.last_name
      if (SuccesfullLoginResponse.user_type == "customer") {
        this.router.navigate(["/client"])
      }
      if (SuccesfullLoginResponse.user_type == "admin") {
        this.router.navigate(["/admin"])
      }

    })
  }

  public updateUserPassword() {
    let observable = this.usersService.updatePassword(this.updatePasswordForm)
    observable.subscribe(SuccesfullUpdateResponse => {

      // this.router.navigate(["/home"])
    }
    )
  }

  public checkPassword() {

    if (this.confirmPassword == this.updatePasswordForm.password) {
      return this.isPasswordConfirm = true

    }
    this.isPasswordConfirm = false

  }



}
