import { Pipe, PipeTransform } from '@angular/core';
import { BalanceService } from '../services/balance.service';
import { ISmartbitBalance } from '../types/ISmartbitBalance';

@Pipe({
  name: 'balance',
  pure: false,
})
export class BalancePipe implements PipeTransform {
  private cachedData: ISmartbitBalance = null;
  private cachedAddress = '';

  constructor(private balanceService: BalanceService) {}

  transform(value: string, address: string, field: string) {
    if (!address) {
      return null;
    }

    if (address !== this.cachedAddress) {
      this.cachedAddress = address;
      this.balanceService
        .getBalance(address)
        .subscribe((result) => (this.cachedData = result));
    }

    let dispalyValue = 'Loading...';
    if (this.cachedData) {
      switch (field) {
        case 'balance':
          dispalyValue =
            this.cachedData.address.total.balance_int / Math.pow(10, 8) +
            ' BTC';
          break;
        case 'received':
          dispalyValue =
            this.cachedData.address.total.received_int / Math.pow(10, 8) +
            ' BTC';
          break;
      }
    }
    return dispalyValue;
  }
}
