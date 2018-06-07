import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from '../../services/user/user.service';

// Models
import { User } from '../../models/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;

  imgUpload: File;
  imgTemp: string;

  constructor(public _userService: UserService) {
    this.user = this._userService.user;
  }

  ngOnInit() {

  }

  saveUser ( user: User ) {

    this.user.name = user.name;
    this.user.surname = user.surname;

    if (!this.user.google) {
      this.user.email = user.email;
    }

    this._userService.updateUser( this.user ).subscribe( resp => {
      console.log( resp );
    });

  }

  selectImg ( file: File ) {

    if ( !file ) {
      this.imgUpload = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      swal ('Sólo imágenes', ' El archivo seleccionado no es una imagen', 'error');
    }

    this.imgUpload = file;

    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL( file );

    reader.onloadend = () => this.imgTemp = reader.result;
    console.log( file );

  }

  changeImage () {
    this._userService.changeImg( this.imgUpload, this.user._id );
  }

}
