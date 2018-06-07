import { Component, OnInit } from '@angular/core';

// Model
import { User } from '../../models/user.model';

// Services
import { UserService } from '../../services/user/user.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})

export class UsersComponent implements OnInit {

  user: User;
  users: User[] =  [];
  total: number;
  arrayId = new Array();

  constructor(public _userService: UserService,
              public _modalUploadService: ModalUploadService) {
    this.user = _userService.user;
  }

  ngOnInit() {
    this.loadUsers();
    this.loadPlugin();

    this._modalUploadService.notification
    .subscribe( resp => { this.loadUsers(); });
  }

  showModal ( id: string ) {
    this._modalUploadService.showModal( 'user', id );
  }

  loadUsers () {
    this._userService.loadUsers(0).subscribe( (resp: any) => {
      this.total = resp.total;
      this.users = resp.users;
    });
  }

  loadPlugin() {
      $(document).ready(function(){
        $('#example23').DataTable({
          dom: 'Bfrtip',
          buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
          language: {
            'decimal': '',
            'emptyTable': 'No hay información',
            'info': 'Mostrando _START_ a _END_ de _TOTAL_ Entradas',
            'infoEmpty': 'Mostrando 0 a 0 de 0 Entradas',
            'infoFiltered': '(Filtrado de _MAX_ total entradas)',
            'infoPostFix': '',
            'thousands': ',',
            'lengthMenu': 'Mostrar _MENU_ Entradas',
            'loadingRecords': 'Cargando...',
            'processing': 'Procesando...',
            'search': 'Buscar:',
            'zeroRecords': 'Sin resultados encontrados',
            'paginate': {
                'first': 'Primero',
                'last': 'Ultimo',
                'next': 'Siguiente',
                'previous': 'Anterior'
            }
        },
      });

    });

    let buttonTrash = '<button type="button" class="btn btn-danger" (click)="deleteUsers( "user" )"><i class="fa fa-trash-o"></i></button>';
    $('.dt-buttons').append(buttonTrash);
  }

  arrayItems(id: string, line: string = '') {

    let check = $(line).prop('checked');


    console.log(check);

    if (check === false) {
      $(line).prop('checked', true);
      this.arrayId.push(id);
    } else {
      let position = this.arrayId.indexOf(id);
      this.arrayId.splice(position, 1);
      $(line).prop('checked', false);
    }


    console.log(this.arrayId);

    // $('#checkBox_0').prop('checked', true);

  }

  deleteUsers() {
    let position = this.arrayId.indexOf(this.user._id);

    if (this.arrayId[position]) {
      swal('No puede borrar el usuario', 'No se puede borrar a si mismo.' , 'error');
      return;
    } else {
        swal({
          title: '¿Esta seguro?',
          text: 'Se eliminaran: ' + this.arrayId.length + ' usuarios.',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( delUser => {
          if (delUser ) {
            this.arrayId.forEach(element => {

              console.log(element);
              this._userService.deleteUser( element ).subscribe(resp => {
                console.log( resp );
                this.arrayId = new Array();
                this.loadUsers();
              });

            });
          } else {
            // swal('Your imaginary file is safe!');
          }
        });
      }
    }

    saveUser( user: User ) {

       console.log( user );
      this._userService.updateUser( user ).subscribe();

    }

}
