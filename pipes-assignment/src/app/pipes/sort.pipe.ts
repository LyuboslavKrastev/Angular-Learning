// A list sorting pipe (by name as per assignment requirements)
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {
  transform(value: any, propertyName: string) {
    const result = value.sort(function (a, b) {
      return (a[propertyName]).localeCompare(b[propertyName]);
    });

    return result;
  }
}
