import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Model/iuser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  user: IUser = {
    id: -1,
    name: '',
    username: '',
    email: '',
    password: ''
  }

  constructor(private authService :AuthService, private route:ActivatedRoute,) { }

  ngOnInit(): void {
  this.route.params.subscribe(res => {
    this.authService.getUserById(res['id'])
    .subscribe({
      next: (res) => this.user = res
    })
  })
  }

}
