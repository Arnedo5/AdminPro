import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from '../../services/user/user.service';

// Models
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(public _userService: UserService ) { }

  ngOnInit() {
    this.user = this._userService.user;
  }

}
