import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
})
export class FileSizePipe implements PipeTransform {
  transform(size: number): string {
    if (!size) return '0 KB';
    return size < 1048576
      ? `${(size / 1024).toFixed(0)} KB`
      : `${(size / 1048576).toFixed(1)} MB`;
  }
}
