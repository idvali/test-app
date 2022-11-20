import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Wallet } from '../types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  userData$ = this.apiService.getUserData().valueChanges;

  constructor(private apiService: ApiService) { }

  calculateBalance(wallets: Wallet[]): number {
    let balance = 0;
    wallets.forEach(wal => {
      balance += wal.amount
    });

    return balance;
  }

}
