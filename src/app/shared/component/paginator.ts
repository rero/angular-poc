import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Paginator, PaginatorState } from '@openng/optimus-ui/paginator';
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {

  pager = input.required<Pager>();

  total = input.required<number>();

  pageChange = output<PaginatorState>();
}
