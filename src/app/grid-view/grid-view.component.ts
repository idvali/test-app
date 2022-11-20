import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridViewComponent{
  boxes$ = this.apiService.getBoxesData().valueChanges;

  constructor(private apiService: ApiService) { }
}
