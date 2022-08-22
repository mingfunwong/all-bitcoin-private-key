import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';
import { IAllKey } from '../types/IAllKey';

declare var Bitcoin: { ECKey: new (arg0: any) => any },
  Crypto: { util: { hexToBytes: (arg0: string) => any } };

@Injectable({
  providedIn: 'root',
})
export class AllKeyService {
  getData(page: string, limitPerPage: number): IAllKey[] {
    const items: IAllKey[] = [];
    const addresses: string[] = [];
    for (let index = 0; index < limitPerPage; index++) {
      const id = new BigNumber(page)
        .minus(1)
        .multipliedBy(limitPerPage)
        .plus(index + 1)
        .toString(16);
      const addressUnCompressed = this.getAddress(id, false);
      const addressCompressed = this.getAddress(id, true);
      const privateKey = this.getPrivateKey(id);
      addresses.push(addressUnCompressed);
      addresses.push(addressCompressed);
      items.push({
        id,
        privateKey,
        addressUnCompressed,
        addressUnCompressedBalance: null,
        addressUnCompressedReceived: null,
        addressCompressed,
        addressCompressedBalance: null,
        addressCompressedReceived: null,
      });
    }
    return items;
  }

  private getAddress(id: string, compressed: boolean) {
    const bytes = Crypto.util.hexToBytes(id);
    const btcKey = new Bitcoin.ECKey(bytes);
    btcKey.compressed = compressed;
    const address = btcKey.getBitcoinAddress().toString();
    return address;
  }

  private getPrivateKey(id: string) {
    const bytes = Crypto.util.hexToBytes(id.toString());
    const btcKey = new Bitcoin.ECKey(bytes);
    const privateKey = btcKey.getExportedPrivateKey();
    return privateKey;
  }
}
