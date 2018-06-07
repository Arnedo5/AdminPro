import { Component, OnInit } from '@angular/core';

// Servies
import { UploadFileService } from '../../services/upload-file/upload-file.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imgUpload: File;
  imgTemp: string;

  constructor(public _uploadFileService: UploadFileService,
              public _modalUploadService: ModalUploadService) {
    console.log('Modal Ready!');
  }

  ngOnInit() {
  }

  hideModal() {
    this.imgUpload = null;
    this.imgTemp = null;
    this._modalUploadService.hideModal();
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

  uploadImage () {

    this._uploadFileService.uploadFile( this.imgUpload, this._modalUploadService.type, this._modalUploadService.id )
      .then ( resp => {
        console.log( resp );

        this._modalUploadService.notification.emit( resp );

        this.hideModal();
      }).catch( resp => {
        console.log( 'Error en la carga: ' + resp );
      });
  }

}
