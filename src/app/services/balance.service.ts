import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ISmartbitBalance } from '../types/ISmartbitBalance';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  constructor(private _httpClient: HttpClient) {}
  dataCache: Map<string, ISmartbitBalance> = new Map();
  requestCache: Map<string, Observable<ISmartbitBalance>> = new Map();

  getBalance(address: string): Observable<ISmartbitBalance> {
    const requestUrl = `https://api.smartbit.com.au/v1/blockchain/address/${address}`;
    const dataCache = this.dataCache.get(address);

    if (dataCache) {
      return new Observable<ISmartbitBalance>((observer) => {
        observer.next(dataCache);
      });
    }
    const requestCache = this.requestCache.get(address);
    if (requestCache) {
      return requestCache;
    }
    const obser = this._httpClient.get<ISmartbitBalance>(requestUrl).pipe(
      shareReplay(1),
      map((data) => {
        this.dataCache.set(address, data);
        return data;
      })
    );
    this.requestCache.set(address, obser);

    return obser;
  }
}
