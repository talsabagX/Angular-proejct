import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserRegistration } from 'src/app/models/UserRegistration';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registrationForm: UserRegistration
  public cityArray: string[]
  public confirmPassword: string
  public isPasswordConfirm: boolean

  constructor(private userService: UserService) {
    this.cityArray = ["Tel-Aviv", "Haifa", "Jerusalem", "Beer Sheva", "Eilat", "Rishon Lezion", "Yeruham", "Petah-Tikva", "Ashdod", "Rehovot"]

  }

  ngOnInit(): void {
    this.registrationForm = new UserRegistration("", "", "", "", "", "")
    this.isPasswordConfirm = true

  }

  public registerNewUser(): void {

    let observable = this.userService.addUser(this.registrationForm)
    observable.subscribe(data => {


    })
  }

  public checkPassword() {

    if (this.confirmPassword == this.registrationForm.password) {
      return this.isPasswordConfirm = true

    }
    this.isPasswordConfirm = false

  }


}
