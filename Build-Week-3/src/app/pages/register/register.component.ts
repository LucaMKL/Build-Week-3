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

  submitForm():void{
    console.log('submit', this.validateForm.value);
  }

  resetForm():void{

  }

  constructor(private formBuilder: FormBuilder) {
    this.validateForm = this.formBuilder.group({

    })
  }

  ngOnInit(): void {
  }





}
