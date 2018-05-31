import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// Models
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Config
import { URL_SERVICES } from '../../config/config';

@Injectable()

export class UserService {

  user: User;
  token: string;

  constructor(public http: HttpClient,
              public router: Router
  ) {

    console.log('UserService ready!');
    this.loadStorage();

  }

  loggedIn () {
    return ( this.token.length > 5 ) ?  true : false;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
      this.user = null;
    }
  }

  saveStorage ( id: string, token: string, user: User ) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;

  }

  loginGoogle ( token: string ) {

    let url = URL_SERVICES + '/login/google';

    return this.http.post( url,  { token } ).map( (resp: any) => { this.saveStorage(resp.id, resp.token, resp.user); return true; });
  }

  login (user: User, remind: boolean = false) {

    if ( remind ) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICES + '/login';
    return this.http.post(url, user).map((resp: any) => { this.saveStorage(resp.id, resp.token, resp.user); return true; });

  }


  createUser(user: User) {

    let url = URL_SERVICES + '/user';

    return this.http.post(url, user).map((resp: any) => {
      swal('Usuario creado', user.email, 'success');
      return resp.user;
    });

  }

  logout () {

    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);

  }

}
