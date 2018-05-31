import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Sweet Alert
import swal from 'sweetalert';

// Services
import { UserService } from '../services/service.index';

// Models
import { User } from '../models/user.model';

declare function init_pluguins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public _userService: UserService,
              public router: Router) {

  }

  equals(value1: string, value2: string ) {

    return ( group: FormGroup ) => {

      let val1 = group.controls[value1].value;
      let val2 = group.controls[value2].value;


      if (val1 === val2) {
        return null;
      } else {
        // tslint:disable-next-line:label-position
        return {
          equals: true
        };
      }
    };
  }

  ngOnInit() {
    init_pluguins();

    this.forma = new FormGroup({
      name: new FormControl(null, Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      conditions: new FormControl( false )
     }, { validators: this.equals('password', 'password2')});

     this.forma.setValue({
       name: 'Test',
       email: 'test1@gmail.com',
       password: '123456',
       password2: '123456',
       conditions: true
     });
  }

  registerUser() {

    if (this.forma.invalid ) {
      return;
    }

    if (!this.forma.value.conditions ) {
      swal('Importante', 'Debe de aceptar las condiciones.', 'warning');
      return;
    }

    let user = new User(
      this.forma.value.name,
      this.forma.value.email,
      this.forma.value.password,
      'no-img.png',
      'USER_ROLE',
      false
    );

    this._userService.createUser( user ).subscribe( resp => {
      this.router.navigate(['/login']);
    }, error => {

      let errorMessage: string = error.error.errors.message;
      let splitMessage = errorMessage.split(':');

      swal(error.error.message, 'El' + splitMessage[2] , 'warning');

    });
  }


}
