import { Component, Input, OnInit } from '@angular/core';
import { formatDistance } from 'date-fns';
import { AuthService } from 'src/app/Auth/auth.service';
import { IPost } from '../ipost';
import { IUser } from '../iuser';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})
export class ShowPostComponent implements OnInit {

  @Input() posts?: IPost[];

  time = formatDistance(new Date(), new Date());

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  getTime(post: IPost): string {
    return formatDistance(new Date(), new Date(post.date))
  }

  getUsername(post: IPost): string {
    return post.userObj?.username || ''
  }

  getAvatar(post: IPost): string {
    return `https://i.pravatar.cc/150?img=${post.userId}`
  }

  likeOrDislike(item: IPost, likeOrNot: boolean): void {
    let loggedUser = this.authService.getLoggedUser()

    if (loggedUser) {

      if (!this.iLikedOrNot(item, true) && likeOrNot) {
        item.allLikeId.push(loggedUser.user.id)
      } else {
        let index = item.allLikeId.findIndex(userId => userId == loggedUser?.user.id)
        if (index > -1) item.allLikeId.splice(index, 1)
      }

      if (!this.iLikedOrNot(item, false) && !likeOrNot) {
        item.allDislikeId.push(loggedUser.user.id)

      } else {
        let index = item.allDislikeId.findIndex(userId => userId == loggedUser?.user.id)
        if (index > -1) item.allDislikeId.splice(index, 1)
      }

      this.updatePost(item);

    }
  }

  iLikedOrNot(item: IPost, likeOrNot: boolean): boolean {
    let loggedUser = this.authService.getLoggedUser()
    if (likeOrNot) {
      return item.allLikeId.find(id => id == loggedUser?.user.id) ? true : false
    } else {
      return item.allDislikeId.find(id => id == loggedUser?.user.id) ? true : false
    }
  }

  updatePost(post: IPost) {
    let tmp = post.userObj
    post.userObj = undefined

    this.authService.editPost(post)
      .subscribe()

    post.userObj = tmp
  }

  //commented
  /*
    data: any[] = [];
    submitting = false;
    user = {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    };
    inputValue = '';

    handleSubmit(): void {
      this.submitting = true;
      const content = this.inputValue;
      this.inputValue = '';
      setTimeout(() => {
        this.submitting = false;
        this.data = [
          ...this.data,
          {
            ...this.user,
            content,
            datetime: new Date(),
            displayTime: formatDistance(new Date(), new Date())
          }
        ].map(e => ({
          ...e,
          displayTime: formatDistance(new Date(), e.datetime)
        }));
      }, 800);
    } */
}


