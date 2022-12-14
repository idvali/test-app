import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  loading$: Observable<boolean>;

  constructor(store: Store<{ loading: boolean }>) {
    this.loading$ = store.pipe(select('loading'));
  }
}
