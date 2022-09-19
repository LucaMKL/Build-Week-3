import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm! :FormGroup;

  submitForm():void{
    if(this.validateForm.valid){
      console.log('Submit', this.validateForm.value);
    }else{
      Object.values(this.validateForm.controls).forEach(control => {
        if(control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true});
        }
      })
    }
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true, [Validators.required]]
    })
  }

}
