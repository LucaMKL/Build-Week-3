import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { IPost } from 'src/app/Model/ipost';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  userId!: number | string

  posts: IPost[] = []

  constructor(private authService: AuthService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || 0
    console.log();
    this.authService.getAllUsers()
      .subscribe(users => {
        this.authService.getPostsByUserId(this.userId)
          .subscribe({
           next: posts => {
              posts = posts.map(post => {
                let user = users.find(user => user.id == post.userId)
                post.userObj = user
                post.replayForm = false
                return post
              })
              this.posts = posts.reverse()
            }
          })
      })
  }


}
