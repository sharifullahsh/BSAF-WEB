import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BeneficiarySearchDataSource, BeneficiarySearchItem } from './beneficiary-search-datasource';

@Component({
  selector: 'app-beneficiary-search',
  templateUrl: './beneficiary-search.component.html',
  styleUrls: ['./beneficiary-search.component.css']
})
export class BeneficiarySearchComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<BeneficiarySearchItem>;
  dataSource: BeneficiarySearchDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new BeneficiarySearchDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
