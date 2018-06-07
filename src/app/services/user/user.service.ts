import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

// Models
import { User } from '../../models/user.model';

// Config
import { URL_SERVICES } from '../../config/config';

// Services
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable()

export class UserService {

  user: User;
  token: string;

  constructor(public http: HttpClient,
              public router: Router,
              public _uploadFileService: UploadFileService
  ) {

    this.loadStorage();

  }

  loadUsers( skip: number = 0) {

      let url = URL_SERVICES + '/user?skip=' + skip;
      return this.http.get( url);

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

  updateUser(user: User) {

    let url = URL_SERVICES + '/user/' + this.user._id;
    url += '?token=' + this.token;

    return this.http.put( url, user).map( ( resp: any ) => {

      if ( user._id === this.user._id ) {
        this.user = resp.user;
        this.saveStorage( resp.user._id, this.token, resp.user );
      }

      swal('Usuario actualizado', user.name, 'success');
      return true;
    });

  }

  deleteUser( id: string ) {

    let url = URL_SERVICES + '/user/' + id + '?token=' + this.token;

    return this.http.delete( url ).map( resp => {
      swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
      return true;
    });

  }

  changeImg ( file: File, id: string) {

    this._uploadFileService.uploadFile( file, 'user', id)
    .then( (resp: any) => {
      this.user.img = resp.user.img;
      this.saveStorage( id, this.token, this.user);
      swal( 'Imagen actualizada', this.user.name, 'success');
    })
    .catch( resp => {
      swal( resp.message, resp.errors.message, 'warning');
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
