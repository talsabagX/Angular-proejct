import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UpdatePasswordForm } from '../models/updatePasswordForm';
import { UserRegistration } from '../models/UserRegistration';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }
  public userFirstName: string;
  public userLastName: string;

  public login(userLoginDetais: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {
    return this.http.post<SuccessfulLoginServerResponse>("/api/users/login", userLoginDetais)
  }

  public addUser(registrationForm: UserRegistration): Observable<any> {
    return this.http.post<any>("/api/users/create", registrationForm)
  }

  public updatePassword(updatePasswordForm: UpdatePasswordForm): Observable<any> {
    return this.http.put<any>("/api/users/updatePassword", updatePasswordForm)
  }
  
}