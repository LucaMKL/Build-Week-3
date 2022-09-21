import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  userId?: number

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = (this.authService.getLoggedUser())?.user.id
  }

}
