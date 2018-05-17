import { Component, OnInit } from '@angular/core';
import { MailingService } from '../../services/service.index';

// Models
import { Mail } from '../../models/mail';

// Forms
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-mailing',
  templateUrl: './mailing.component.html',
  styles: [],
  providers: [MailingService]
})

export class MailingComponent implements OnInit {

  public forma: FormGroup;
  public mail: Mail;

  public treeFiles: {children};
  public fileContent: any;

  constructor(private mailing: MailingService) {

    this.mail = new Mail ('', '', '', '');

    this.forma = new FormGroup({
      'mailDest': new FormControl('', Validators.required),
      'mailCab': new FormControl('', Validators.required)
    });

  }

  ngOnInit() {
    this.getDirName();
  }

  loadPreview(inputId: any) {
    const url = $('#' + inputId).attr('value').replace(/[*+?^${}()|[\]\\]/g, '_');
    this.mailing.loadContentFile(url).subscribe(
      response => {
        if (!response.message) {
          console.log('Error');
        } else {
          this.fileContent = response.message;
          console.log(this.fileContent);
        }
      }, error => {
        console.log(<any>error);
      }
    );
  }

  getDirName() {
    this.mailing.getDirName().subscribe(
      response => {
        if (!response.message) {
          console.log('Error al obtener la información del directorio');
        } else {
          this.treeFiles =  response.message;
        }
      }, error => {
        console.log(<any>error);
      }
    );
  }

  sendMail(registerForm) {

    const mailText = $('#mailText').val();
    const mailTextHtml = this.fileContent;

    if (mailText !== '') {
      this.mail.mailText = mailText;
    } else {
      this.mail.mailText =  this.fileContent;
    }




    this.mailing.sendMail(this.mail).subscribe(
      response => {
        if (!response.message) {
          console.log('Error al enviar el correo a :');
        } else {
          console.log(response.message);
          registerForm.reset();
        }
      }, error => {
        console.log(<any>error);
      }
    );

  }

  inputController() {
    if ($('#mailText').val() !== '') {
      $('input:radio').prop('disabled', true);
    } else {
      $('input:radio').prop('disabled', false);
    }
  }

}
