import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pagination-comp',
  templateUrl: 'pagination.component.html',
  standalone: true,
  imports: [ CommonModule]
})
export class PaginationComponent implements OnInit {
  @Input() total: number = 0;
  @Input() limit: number = 20;
  @Input() currentPage: number = 1;

  @Output('pageChange') pageChageEvent = new EventEmitter<number>();

  pageCount: number = 1;
  pages: number[] = [];

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.pageCount = Math.ceil(this.total / this.limit);
    this.pages =
      this.pageCount > 0 ? this.utilsService.range(1, this.pageCount + 1) : [];
  }

  selectPage(page: number): void {
    this.pageChageEvent.emit(page);
  }
}
