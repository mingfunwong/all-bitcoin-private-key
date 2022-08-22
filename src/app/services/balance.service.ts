import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBlockchain } from '../types/IBlockchain';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  constructor(private _httpClient: HttpClient) {}

  getBalance(addresses: string[]): Observable<IBlockchain[]> {
    const requestUrl = `https://blockchain.info/balance?cors=true&active=${addresses.join(
      ','
    )}`;
    const obser = this._httpClient.get<IBlockchain[]>(requestUrl);
    return obser;
  }
}
