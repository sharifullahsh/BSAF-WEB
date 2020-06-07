import { DashboardCharts, HightChartData } from './../models/DashboardCharts';
import { AlertifyService } from './../_services/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from './../_services/user.service';
import { DashboardService } from './../_services/dashboard.service';
import { DashboardTileData } from './../models/DashboardTileData';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  searchForm: FormGroup;
  constructor(private breakpointObserver: BreakpointObserver,
              private dashboardService: DashboardService,
              private userService: UserService,
              private fb: FormBuilder,
              private alertifyService: AlertifyService
              ) {}
  tileData: DashboardTileData = {};
  beneficiaryByBCPCharts: typeof Highcharts = Highcharts;
  updateBeneficiaryChart = false;
  updateDemo = false;
  beneficiaryByBCPChartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Beneficiary by border point'
    },
    subtitle: {
      text: 'From date to date'
    },
    xAxis: {
      categories: [],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of case per border point'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: false
    },
    credits:{
      enabled: false
    },
    exporting: {
      enabled: true
    },
    series: [
      {name: 'bar1', data: []},
      {name: 'bar2', data: []},
      {name: 'bar3', data: []}
]
  };
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      fromDate:[new Date(new Date().getFullYear(), 0, 1)],
      toDate:[new Date()]
    });
    this.dashboardService.getTileData()
 .subscribe((response: DashboardTileData) => this.tileData = response
 , (error) => this.alertifyService.error('Unable to load general figure data.'));

    this.dashboardService.getChartsData(this.searchForm.value)
 .subscribe((response: DashboardCharts) => {
   console.log("response is "+ JSON.stringify(response));
   this.loadBeneficiaryByBCP(response.bcp);
  },
 (error) => this.alertifyService.error('Unable to load charts data')
 );
    
  }

  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Card 1', cols: 1, rows: 1 },
  //         { title: 'Card 2', cols: 1, rows: 1 },
  //         { title: 'Card 3', cols: 1, rows: 1 },
  //         { title: 'Card 4', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Card 1', cols: 2, rows: 1 },
  //       { title: 'Card 2', cols: 1, rows: 1 },
  //       { title: 'Card 3', cols: 1, rows: 2 },
  //       { title: 'Card 4', cols: 1, rows: 1 }
  //     ];
  //   })
  // );

 loadBeneficiaryByBCP(highChartData: HightChartData){

  this.beneficiaryByBCPChartOptions.xAxis.categories = highChartData.categories;
  this.beneficiaryByBCPChartOptions.series = highChartData.series;

  // this.beneficiaryByBCPChartOptions.xAxis.categories = highChartData.categories;
  // this.beneficiaryByBCPChartOptions.series = highChartData.series;
   this.updateBeneficiaryChart = true;
   
   console.log('response is 2'+ JSON.stringify(highChartData));
 }
  onSubmit(){

  }
}
