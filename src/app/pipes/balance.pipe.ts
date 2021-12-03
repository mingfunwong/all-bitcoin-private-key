import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'balance',
  pure: false,
})
export class BalancePipe implements PipeTransform {

  transform(value: string | number) {
    return value !== null ?
     parseFloat(value.toString()) / Math.pow(10, 8) +' BTC' 
     : 'Loading...'
  }
}
