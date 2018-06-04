import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Models
import { User } from '../models/user.model';

// Services
import { UserService } from '../services/user/user.service';

declare function init_pluguins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  remind: boolean = false;

  auth2: any;

  constructor(public router: Router,
              public _userService: UserService) {

  }

  ngOnInit() {
    $('#to-recover').on('click', function() {
      $('#loginform').slideUp();
      $('#recoverform').fadeIn();
    });

    $('#to-close').on('click', function() {
      $('#recoverform').slideUp(function(){
        $('#loginform').fadeIn();
      });
    });

    init_pluguins();
    this.googleInit ();

    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1 ) {
      this.remind = true;
    }
  }

  googleInit () {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '780250236643-upv4s76feo1headsfj2fh1gsq2b6phal.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));

    });

  }

  attachSignin ( element ) {

    this.auth2.attachClickHandler( element, {}, googleUser => {

      // let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;

      // console.log(token);

      this._userService.loginGoogle( token ).subscribe( () => { window.location.href = '#/dashboard'; });

    });
  }

  public ingresar (forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    let user = new User(null, null, forma.value.email, forma.value.password);

    this._userService.login(user, forma.value.remind).subscribe(resp => { this.router.navigate(['/dashboard']); });

  }

}
