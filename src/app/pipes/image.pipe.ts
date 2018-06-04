import { Pipe, PipeTransform } from '@angular/core';

// Config
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string = 'user'): any {

    let url = URL_SERVICES + '/img';

    if (!img) {
      return url + '/user/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    } else {
      return url + '/' + type + '/' + img;
    }

  }

}
