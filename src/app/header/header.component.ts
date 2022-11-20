import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';
import { ApiService } from '../api.service';
import { Wallet } from '../types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  userData$ = this.apiService.getUserData().valueChanges;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.subscribeToWallet().subscribe(noop)
  }

  calculateBalance(wallets: Wallet[]): number {
    let balance = 0;
    wallets.forEach(wal => {
      balance += wal.amount
    });

    return balance;
  }

}
