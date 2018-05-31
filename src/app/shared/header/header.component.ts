import { Component, OnInit } from '@angular/core';

// Models
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public _userService: UserService ) { }

  ngOnInit() {
  }

}
