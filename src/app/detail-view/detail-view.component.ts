import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { switchMap } from 'rxjs';
import { ApiService } from '../api.service';
import { setLoaded, setLoading } from '../store/actions';
import { BoxVariant } from '../types';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailViewComponent implements OnInit {
  @ViewChild('modal') modal: TemplateRef<any>;
  private boxId: string = '';
  prizes: BoxVariant[] = [];

  modalRef?: BsModalRef;
  boxDetails = this.actRoute.paramMap.pipe(switchMap((params) => {
    const boxId = params.get('id') as string;
    this.boxId = boxId;
    return this.apiService.getBoxData(boxId)
  }));

  constructor(private apiService: ApiService,
    private actRoute: ActivatedRoute,
    private modalService: BsModalService,
    private store: Store<{ loading: boolean }>) { }

  ngOnInit(): void {
  }

  openBox(): void {
    this.store.dispatch(setLoading());
    this.apiService.openBox(this.boxId).subscribe(res => {
      this.store.dispatch(setLoaded());
      this.prizes = res.data?.openBox.boxOpenings.map(item => item.itemVariant) || [];
      this.openModal(this.modal);
    })
  }

  private openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
