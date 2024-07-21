import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'pluralize',
  standalone: true,
})
export class Pluralize implements PipeTransform {
  transform(value: number, singlular: string, plural: string): string {
    return value > 1 ? plural : singlular;
  }
}
