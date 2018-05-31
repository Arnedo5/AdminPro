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
      console.log( 'Paso por el Login Guard' );
      return true;
    } else {
      console.log( 'Bloqueado por guard.' );
      this.router.navigate(['/login']);
      return false;
    }

  }

}
