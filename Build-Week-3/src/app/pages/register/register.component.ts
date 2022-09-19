import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      username: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      confirm: ['', [this.confirmValidator]],
    })
  }


  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  resetForm(): void {
    this.validateForm.reset()
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } | null => {
    if (control.value && control.value != this.validateForm.value.password) {
      return { error: true };
    }
    return null;
  }
}
