import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  public menu: any = [
  {
    titulo: 'Principal',
    icono: 'mdi mdi-gauge',
    submenu: [
      {titulo: 'Dashboard', url: '/dashboard'},
      {titulo: 'ProgressBar', url: '/progress'},
      {titulo: 'Gráficas', url: '/graficas1'},
      {titulo: 'Promesas', url: '/promesas'},
      {titulo: 'Mailing', url: '/mailing'},
      {titulo: 'Rxjs', url: '/rxjs'},
    ]
  },
  {
    titulo: 'Mantenimientos',
    icono: 'mdi mdi-folder-lock-open',
    submenu: [
      { titulo: 'Usuarios', url: '/usuarios' },
      { titulo: 'Empresas', url: '/empresas' },
      { titulo: 'Empleados', url: '/empleados' }
    ]
  }
];

  constructor() {}
}
