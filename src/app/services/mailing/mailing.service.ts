import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GLOBAL } from '../global';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class MailingService {

  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  sendMail(mail_to_send) {
    const params = JSON.stringify(mail_to_send);
    const headers = new Headers({'Content-Type' : 'application/json; charset=utf-8' });

    return this._http.post(this.url + 'enviar-mail', params, {headers: headers}).map(res => res.json());
  }

  getDirName() {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this._http.get(this.url + 'get-dir-info', options).map(res => res.json());
  }

  loadContentFile(url: string) {

    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this._http.get(this.url + 'get-file-contect/' + url, options).map(res => res.json());
  }

}
