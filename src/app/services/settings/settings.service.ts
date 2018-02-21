import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default-dark'
  };

  constructor() {
      this.getConfig();
  }

  getConfig () {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.setTheme(this.ajustes.tema);
    }
  }

  setConfig() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  setTheme ( tema: string ) {

      const url = `assets/css/colors/${ tema }.css`;

      $('#theme').attr('href', url); // Add style
      $('a').removeClass('working'); // Remove all classes

      $(document).ready(function() {
        $( 'a[data-theme="' + tema + '"]' ).addClass('working'); // Add Class
      });

      this.ajustes.tema = tema;
      this.ajustes.temaUrl = url;
      this.setConfig();

  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
