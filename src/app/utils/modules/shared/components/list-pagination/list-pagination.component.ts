import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-pagination',
  templateUrl: './list-pagination.component.html',
  styleUrls: ['./list-pagination.component.sass']
})
export class ListPaginationComponent {

  perPageList: any[] = [
    { id: 10, name: '10 por página' },
    { id: 25, name: '25 por página' },
    { id: 50, name: '50 por página' },
    { id: 100, name: '100 por página' }
  ];

  @Input()
  page: any;

  @Input()
  pageSize: any;

  @Input()
  listSize: any;

  @Input()
  listSizeFiltered: any;

  @Output()
  pageChange: EventEmitter<any> = new EventEmitter();

  setPage(value: number): void {
    this.page = value;
    this.emitPageChange();
  }

  setPageSize(value: number): void {
    this.pageSize = value;
    this.emitPageChange();
  }

  emitPageChange(): void {
    this.pageChange.emit({
      page: this.page,
      pageSize: this.pageSize
    });
  }

  getOf(): number {
    return this.listSizeFiltered ? (this.page - 1) * this.pageSize + 1 : 0;
  }

  getTill(): number {
    const x = this.page * this.pageSize;
    return x > this.listSizeFiltered ? x - this.pageSize + this.listSizeFiltered % this.pageSize : x;
  }

}
