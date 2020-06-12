import { Router } from '@angular/router';
import { BeneficiarySearchForm } from './../../models/BeneficiarySearchForm';
import { LookupService } from 'src/app/_services/lookup.service';
import { FormBuilder } from '@angular/forms';
import { BeneficiaryService } from './../../_services/beneficiary.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BeneficiarySearchDataSource } from './beneficiary-search-datasource';
import { BeneficiaryForSearch } from 'src/app/models/BeneficiaryForSearch';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SearchLookups } from 'src/app/models/searchLookups';
import { BeneficiarySearchResponse } from 'src/app/models/BeneficiarySearchResponse';

@Component({
  selector: 'app-beneficiary-search',
  templateUrl: './beneficiary-search.component.html',
  styleUrls: ['./beneficiary-search.component.css']
})
export class BeneficiarySearchComponent implements AfterViewInit, OnInit {
  searchLooupsData: SearchLookups;
  maxDate: Date = new Date();
  beneficiarySearchForm:BeneficiarySearchForm;
  // paginator property
  pageIndex = 0;
  length = 100;
  pageSize = 10;
  constructor(private alertifyService: AlertifyService, private beneficiaryService: BeneficiaryService
              , private fb: FormBuilder, private lookupService: LookupService, private router: Router){}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<BeneficiaryForSearch>;
  dataSource: MatTableDataSource<BeneficiaryForSearch>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['#', 'cardID', 'name', 'fName', 'screeningDate',
  'borderPoint', 'beneficiaryType', 'returnStatus', 'isCardIssued','action'];
  searchForm = this.fb.group({
    cardID: [null],
    beneficiaryName: [null],
    beneficiaryFName: [null],
    borderPoint: [null],
    beneficiaryType: [null],
    returnStatus: [null],
    ScreeningDateFrom: [null],
    ScreeningDateTo: [null]
  });
  ngOnInit() {
    this.beneficiarySearchForm = new BeneficiarySearchForm();
    this.lookupService.getSearchLookups().subscribe((lookups: any) => {
      this.searchLooupsData = lookups;
    });
    this.getBeneficary();

  }
  getBeneficary(){
    this.beneficiarySearchForm.pageIndex = this.pageIndex;
    this.beneficiarySearchForm.pageSize = this.pageSize;
    if(this.searchForm.get('cardID').value){
      this.beneficiarySearchForm.cardID = (this.searchForm.get('cardID').value).trim();
    }
    if(this.searchForm.get('beneficiaryName').value){
      this.beneficiarySearchForm.beneficiaryName = this.searchForm.get('beneficiaryName').value.trim();
    }
    if(this.searchForm.get('beneficiaryFName').value){
      this.beneficiarySearchForm.beneficiaryFName = this.searchForm.get('beneficiaryFName').value;
    }
    if(this.searchForm.get('borderPoint').value){
      this.beneficiarySearchForm.borderPoint = this.searchForm.get('borderPoint').value;
    }
    if(this.searchForm.get('beneficiaryType').value){
      this.beneficiarySearchForm.beneficiaryType = this.searchForm.get('beneficiaryType').value;
    }
    if(this.searchForm.get('returnStatus').value){
      this.beneficiarySearchForm.returnStatus = this.searchForm.get('returnStatus').value;
    }
    if(this.searchForm.get('ScreeningDateFrom').value){
      this.beneficiarySearchForm.ScreeningDateFrom = (new Date(this.searchForm.get('ScreeningDateFrom').value)).toDateString();
    }
    if(this.searchForm.get('ScreeningDateTo').value){
      this.beneficiarySearchForm.ScreeningDateTo = (new Date(this.searchForm.get('ScreeningDateTo').value)).toDateString();
    }
    console.log("search form is >>>>>>>>>>"+JSON.stringify(this.beneficiarySearchForm));
    this.beneficiarySearchForm.pageSize = this.pageSize;
    this.beneficiarySearchForm.pageIndex = this.pageIndex;
    this.beneficiaryService.getSearchedBeneficiary(this.beneficiarySearchForm).subscribe((response: BeneficiarySearchResponse) => {
      this.length = response.total;
      this.dataSource = new MatTableDataSource(response.data);
      this.paginator.length = response.total;
      this.table.dataSource = this.dataSource;
    }, error => {
      this.alertifyService.error('Can not load beneficiaries');
      console.log('error ' + JSON.stringify(error));
    });
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
  onSubmit(){
    this.getBeneficary();
  }
  resetSearch(){
    this.pageIndex = 0;
    this.searchForm.reset();
    this.beneficiarySearchForm = new BeneficiarySearchForm();
    this.getBeneficary();
  }
  pageChange(event){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.length = event.length;
    this.getBeneficary();
  }
  ViewBeneficiary(beneficiaryId: string){
    this.router.navigate(['/beneficiaryView/', beneficiaryId]);
  }
}
