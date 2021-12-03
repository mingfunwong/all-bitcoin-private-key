import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  constructor(private _httpClient: HttpClient) {}

  getBalance(addresses : string[]): Observable<any> {
    const requestUrl = `https://blockchain.info/balance?cors=true&active=${addresses.join(',')}`;
    const obser = this._httpClient.get<any>(requestUrl)
    return obser;
  }
}
