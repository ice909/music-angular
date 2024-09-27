import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const minute = Math.floor(value / 1000 / 60);
    const second = Math.floor(value / 1000 % 60);
    return `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  }

}
