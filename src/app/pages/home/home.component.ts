import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AllKeyService } from 'src/app/services/all-key.service';
import { BalanceService } from 'src/app/services/balance.service';
import { IAllKey } from 'src/app/types/IAllKey';
import { IBlockchain } from 'src/app/types/IBlockchain';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tableHeaderColumns: string[] = [
    'privateKey',
    'address',
    'balance',
    'received',
    'compressed',
    'balance',
    'received',
  ];

  items: IAllKey[] = [];

  maxNumber =
    0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn;

  page = 1n;
  limitPerPage = 16;
  resultsLength = this.maxNumber.toString();
  maxPage = this.maxNumber / BigInt(this.limitPerPage);

  isLoadingResults = true;
  isError = false;

  constructor(
    private allKeyService: AllKeyService,
    private route: ActivatedRoute,
    private router: Router,
    private balanceService: BalanceService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.page = BigInt(params.get('page') || '1');
      this.getData();
    });
  }

  onOlder() {
    this.page = this.page - 1n;
    if (this.page === 0n) {
      this.page = 1n;
    }
    this.router.navigate(['/home'], { queryParams: { page: this.page } });
  }

  onNewer() {
    this.page = this.page + 1n;
    if (this.page >= this.maxPage) {
      this.page = this.maxPage;
    }
    this.router.navigate(['/home'], { queryParams: { page: this.page } });
  }

  async getData() {
    this.isLoadingResults = true;
    const items = this.allKeyService.getData(this.page, this.limitPerPage);
    this.items = items;
    const addresses: string[] = [];
    for (const key in items) {
      const item = items[key];
      addresses.push(item.addressCompressed);
      addresses.push(item.addressUnCompressed);
    }
    const balanceList = await firstValueFrom(
      this.balanceService.getBalance(addresses)
    );
    this.items = this.items.map((item) => {
      item.addressCompressedBalance = this.getBalance(
        item.addressCompressed,
        balanceList,
        'final_balance'
      );
      item.addressCompressedReceived = this.getBalance(
        item.addressCompressed,
        balanceList,
        'total_received'
      );
      item.addressUnCompressedBalance = this.getBalance(
        item.addressUnCompressed,
        balanceList,
        'final_balance'
      );
      item.addressUnCompressedReceived = this.getBalance(
        item.addressUnCompressed,
        balanceList,
        'total_received'
      );
      return item;
    });
  }

  getBalance(
    address: string,
    balanceList: IBlockchain[],
    type: 'final_balance' | 'total_received'
  ): number {
    const balance = balanceList[address as any];
    return balance ? balance[type] : 0;
  }

  getBalanceClass(balance: number | null) {
    return balance ? 'text-slate-900' : 'text-slate-400';
  }
}
