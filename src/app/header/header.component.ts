import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { noop } from 'rxjs';
import { ApiService } from '../api.service';
import { Wallet } from '../types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  userData$ = this.apiService.getUserData().valueChanges;

  private _subs = new Subscription();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this._subs.add(this.apiService.subscribeToWallet().subscribe(noop));
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

  calculateBalance(wallets: Wallet[]): number {
    let balance = 0;
    wallets.forEach(wal => {
      balance += wal.amount
    });

    return balance;
  }

}
