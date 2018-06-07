import { Injectable, EventEmitter } from '@angular/core';


@Injectable()

export class ModalUploadService {

  public type: string;
  public id;

  public none: string = 'display-none';
  public notification = new EventEmitter<any>();

  constructor() {
    console.log('Modal Upload Ready!');
  }

  hideModal() {
    this.none  = 'display-none';
    this.type = null;
    this.id = null;
  }

  showModal( type: string, id: string ) {
    this.none  = '';
    this.type = type;
    this.id = id;
  }

}
