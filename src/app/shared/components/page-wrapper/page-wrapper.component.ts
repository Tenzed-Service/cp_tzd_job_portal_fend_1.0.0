import { SingletonStoreService } from './../../../core/services/helper/singleton-store.service';
import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { LoaderState } from '../../store/state/loader.state';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-page-wrapper',
  standalone: true,
  imports: [CommonModule, TranslateModule, LoaderComponent],
  templateUrl: './page-wrapper.component.html',
  styleUrl: './page-wrapper.component.scss'
})
export class PageWrapperComponent {

  @Input() title: string;
  @Input() showTitle: boolean = true;
  @Input() border: boolean = true;
  @Input() grid: boolean = true;
  @Input() gridClass: string = 'col-xxl-8 col-xl-10 m-auto';

  @Select(LoaderState.status) loadingStatus$: Observable<boolean>;
  isLoading = new BehaviorSubject(false);

  constructor(
    private singletonStoreService: SingletonStoreService
  ){
    this.singletonStoreService.isLoading.subscribe((res)=>{
      this.isLoading.next(res);
    })
  }
  
}
