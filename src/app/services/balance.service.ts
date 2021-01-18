import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISmartbitBalance } from '../types/ISmartbitBalance';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  constructor(private _httpClient: HttpClient) {}

  getBalance(address: string): Observable<ISmartbitBalance> {
    const requestUrl = `https://api.smartbit.com.au/v1/blockchain/address/${address}`;
    return this._httpClient.get<ISmartbitBalance>(requestUrl);
  }
}
