import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Model/iuser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/Model/validator.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  editMode: boolean = false;
  updateForm!: FormGroup;

  user: IUser = {
    id: -1,
    name: '',
    username: '',
    email: '',
    avatar: ''
  }

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private errorNotification: NzNotificationService,
    private formBuilder: FormBuilder,
    private validationService: ValidatorService
  ) { }



  ngOnInit(): void {

    this.createForm()
    this.updateForm.disable()

    this.route.params.subscribe(res => {
      this.authService.getUserById(res['id'])
        .subscribe({
          next: (res) => {
            if (this.authService.getLoggedUser()?.user.id == res.id) {
              this.user = res
              //this.createForm(res)

               this.updateForm.setValue({
                name: res.name,
                username: res.username,
                email: res.email
              })

            } else {
              this.router.navigate(['/'])
            }

          }
        })
    })
  }

  createForm() {
    this.updateForm = this.formBuilder.group({
      name: ['',
      [Validators.required, Validators.minLength(3)]],

      username: ['',
      [Validators.required, Validators.minLength(3)],
      this.validationService.usernameValidator],

      email: ['',
      [Validators.email, Validators.required],
      this.validationService.emailValidator]
    })
  }

  toggleActive(): void {
    if (!this.editMode) {
      this.editMode = !this.editMode

      this.updateForm.enable()

    } else {
      delete this.user.password
      this.editMode = !this.editMode
      this.updateForm.disable()
      //this.updateUser();
    }
  }

  updateUser(): void {
    this.authService.updateUser(this.user)
      .subscribe({
        next: (res) => {
          let currStore = JSON.parse(String(localStorage.getItem('access')))
          if (currStore) {
            currStore.user.name = res.name;
            currStore.user.email = res.email;
            currStore.user.username = res.username;

            localStorage.setItem('access', JSON.stringify(currStore))

          } else {
            currStore = JSON.parse(String(sessionStorage.getItem('access')))

            currStore.user.name = res.name;
            currStore.user.email = res.email;
            currStore.user.username = res.username;

            sessionStorage.setItem('access', JSON.stringify(currStore))
          }

        },
        complete: () => this.editMode = false,
        error: (err) => {
          console.error('httpError', err);
          this.errorNotification.create(
            'error',
            'Qualcosa è andato storto',
            'Non è stato possibile salvare i cambiamenti riprova più tardi',
            { nzPlacement: 'top' }
          );
        },

      })
  }

}
