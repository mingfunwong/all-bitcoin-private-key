import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import BigNumber from 'bignumber.js';
import { of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AllKeyService } from '../services/all-key.service';
import { BalanceService } from '../services/balance.service';
import { IAllKey } from '../types/IAllKey';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'privateKey',
    'addressUnCompressed',
    'addressUnCompressedBalance',
    'addressUnCompressedReceived',
    'addressCompressed',
    'addressCompressedBalance',
    'addressCompressedReceived',
  ];
  data: IAllKey[] = [];

  maxNumber = new BigNumber(
    'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    16
  );

  page = '1';
  // limitPerPage = 1;
  limitPerPage = 16;
  resultsLength = this.maxNumber.toString(10);
  maxPage = this.maxNumber.dividedBy(this.limitPerPage).toFixed(0);

  isLoadingResults = true;
  isError = false;

  constructor(
    private allKeyService: AllKeyService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private balanceService: BalanceService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.page = params.get('page') || '1';
      this.getData();
    });
  }

  onOlder() {
    this.page = new BigNumber(this.page).minus(1).toString(10);
    if (this.page === '0') {
      this.page = '1';
    }
    this.router.navigate(['/home'], { queryParams: { page: this.page } });
  }

  onNewer() {
    this.page = new BigNumber(this.page).plus(1).toString(10);
    if (new BigNumber(this.page).isGreaterThan(this.maxPage)) {
      this.page = this.maxPage;
    }
    this.router.navigate(['/home'], { queryParams: { page: this.page } });
  }

  getData() {
    this.isLoadingResults = true;
    this.data = [];
    this.allKeyService
      .getData(this.page, this.limitPerPage)
      .pipe(
        map((data) => {
          this.isLoadingResults = false;
          this.isError = false;
          return data;
        }),
        catchError((err) => {
          console.error(err);
          this.isLoadingResults = false;
          this.isError = true;
          return observableOf([]);
        })
      )
      .subscribe(async (data: IAllKey[]) => {
        this.data = data;       
        const addresses: string[] = [];
        for (const key in data) {
          const item = data[key];
          addresses.push(item.addressCompressed);
          addresses.push(item.addressUnCompressed);
        }
        const balanceList = await this.balanceService
          .getBalance(addresses)
          .toPromise();
          this.data = this.data.map((item) => {
          item.addressCompressedBalance = this.getBalance(item.addressCompressed, balanceList, 'final_balance')
          item.addressCompressedReceived = this.getBalance(item.addressCompressed, balanceList, 'total_received')
          item.addressUnCompressedBalance = this.getBalance(item.addressUnCompressed, balanceList, 'final_balance')
          item.addressUnCompressedReceived = this.getBalance(item.addressUnCompressed, balanceList, 'total_received')
          return item
        });
      });
  }

  getBalance(address: string, balanceList: any[], type: 'final_balance' | 'total_received') {
    const balance = balanceList[address]
    return balance ? balance[type] : 'Error'
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
}
