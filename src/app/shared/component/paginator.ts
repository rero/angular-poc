import { Component, input, output } from '@angular/core';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Pager } from '../store/paginator-feature';

@Component({
  selector: 'shared-paginator',
  imports: [Paginator],
  template: `
    <p-paginator
      alwaysShow="false"
      [first]="pager().first"
      [rows]="pager().rows"
      [totalRecords]="total()"
      [rowsPerPageOptions]="pager().rowsPerPageOptions"
      (onPageChange)="pageChange.emit($event)" />
  `
})
export class PaginatorComponent {

  pager = input.required<Pager>();

  total = input.required<number>();

  pageChange = output<PaginatorState>();
}
