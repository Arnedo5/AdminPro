import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_pluguins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) {

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
  }

  public ingresar () {
    console.log('ingresando');
    this.router.navigate(['/dashboard']);
  }

}
