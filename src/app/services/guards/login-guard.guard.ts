import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Services
import { UserService } from '../user/user.service';

@Injectable()

export class LoginGuardGuard implements CanActivate {

  constructor ( public _userService: UserService,
                public router: Router) {

  }

  canActivate () {

    if ( this._userService.loggedIn() ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }

}
