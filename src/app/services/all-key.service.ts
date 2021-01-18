import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';
import { Observable } from 'rxjs';
import { IAllKey } from '../types/IAllKey';
declare var Bitcoin, Crypto;
@Injectable({
  providedIn: 'root',
})
export class AllKeyService {
  constructor() {}

  getData(page: string, limitPerPage: number): Observable<IAllKey[]> {
    return new Observable<IAllKey[]>((observer) => {
      const itesm: IAllKey[] = [];
      const addresses: string[] = [];
      for (let index = 0; index < limitPerPage; index++) {
        const number = new BigNumber(page).multipliedBy(index + 1).toString(16);
        const addressUnCompressed = this.getAddress(number, false);
        const addressCompressed = this.getAddress(number, true);
        const privateKey = this.getPrivateKey(number);
        addresses.push(addressUnCompressed);
        addresses.push(addressCompressed);
        itesm.push({
          privateKey,
          addressUnCompressed,
          addressUnCompressedBalance: null,
          addressUnCompressedReceived: null,
          addressCompressed,
          addressCompressedBalance: null,
          addressCompressedReceived: null,
        });
      }

      observer.next(itesm);
    });
  }

  private getAddress(number: string, compressed: boolean) {
    const bytes = Crypto.util.hexToBytes(number);
    const btcKey = new Bitcoin.ECKey(bytes);
    btcKey.compressed = compressed;
    const address = btcKey.getBitcoinAddress().toString();
    return address;
  }

  private getPrivateKey(number: string) {
    const bytes = Crypto.util.hexToBytes(number.toString());
    const btcKey = new Bitcoin.ECKey(bytes);
    const privateKey = btcKey.getExportedPrivateKey();
    return privateKey;
  }
}
