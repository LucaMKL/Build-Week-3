import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../Auth/auth.service';
import { IUser } from './iuser';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor(private authService: AuthService) { }

  emailValidator = (
    control: AbstractControl
  ): Promise<ValidationErrors | null> => {
    return new Promise<ValidationErrors | null>((resolve) => {
      this.authService.getAllUsers().subscribe((res) => {
        if (res.find((user: IUser) => user.email == control.value)) {
          resolve({ emailError: true, warning: true });
        } else {
          resolve(null);
        }
      });
    });
  };

  usernameValidator = (control: AbstractControl) => {
    return new Promise<ValidationErrors | null>((resolve) => {
      this.authService.getAllUsers().subscribe((res) => {
        if (res.find((user: IUser) => user.username == control.value)) {
          resolve({ usernameError: true, warning: true });
        } else {
          resolve(null);
        }
      });
    });
  };
}
