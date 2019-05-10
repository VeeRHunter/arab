import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the YoutubePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'sanitizer',
})
export class YoutubePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */

   constructor(private dom: DomSanitizer){

   }
  transform(value, args) {
    console.log(value)
    return this.dom.bypassSecurityTrustResourceUrl(value)
  }
}
