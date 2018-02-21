import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

// Services
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document,
              public _settings: SettingsService) { }

  ngOnInit() {
  }

  cambiarColor (tema: string, link: any) {

    this._settings.setTheme(tema);
    $(link).addClass('working'); // Add class

  }

}
