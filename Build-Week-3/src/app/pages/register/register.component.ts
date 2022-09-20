import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Observer, Subscriber } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';
import { IUser } from 'src/app/Model/iuser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private errorNotification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      username: [
        null,
        [Validators.required, Validators.minLength(3)],
        this.usernameValidator,
      ],
      email: [
        null,
        [Validators.email, Validators.required],
        this.emailValidator,
      ],
      password: [null, [Validators.required, Validators.minLength(5)]],
      confirm: ['', [this.confirmValidator]],
    });
  }

  submitForm(): void {
    this.isLoading = true;
    delete this.validateForm.value.confirm
    this.authService.register(this.validateForm.value)
    .subscribe({
      next: (res) => console.log(res),
      complete: () => this.router.navigate(['/login']),
      error: (err) => {
        console.error('httpError', err);
        this.isLoading = false;
        this.errorNotification.create(
          'error',
          'Qualcosa è andato storto',
          'Non è stato possibile registrati riprova più tardi',
          { nzPlacement: 'top' }
          );
      },
    });
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  confirmValidator = (
    control: FormControl
  ): { [s: string]: boolean } | null => {
    if (control.value && control.value != this.validateForm.value.password) {
      return { error: true };
    }
    return null;
  };

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
