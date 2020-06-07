import { DashboardCharts, Ng2ChartData } from './../models/DashboardCharts';
import { AlertifyService } from './../_services/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from './../_services/user.service';
import { DashboardService } from './../_services/dashboard.service';
import { DashboardTileData } from './../models/DashboardTileData';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

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

  ////////
  public bcpChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public bcpChartLabels: Label[] = [];
  public bcpChartType: ChartType = 'bar';
  public bcpChartLegend = true;
  public bcpChartPlugins = [pluginDataLabels];

  public bcpChartData: ChartDataSets[] = [
    { data: [0, 0, 0], label: 'Series A' },
    { data: [0, 0, 0], label: 'Series B' },
    { data: [0, 0, 0], label: 'Series C' }
  ];

  ///////
 
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      fromDate:[new Date(new Date().getFullYear(), 0, 1)],
      toDate:[new Date()]
    });
    this.dashboardService.getTileData()
 .subscribe((response: DashboardTileData) => this.tileData = response
 , (error) => this.alertifyService.error('Unable to load general figure data.'));
    this.loadChartsData();
  }
  loadChartsData(){
    this.dashboardService.getChartsData(this.searchForm.value).subscribe((response: DashboardCharts) => {
   this.initializeCharts(response);
  }, (error) => this.alertifyService.error('Unable to load charts data')
 );
  }
  initializeCharts(chartsData: DashboardCharts){
    this.bcpChartData = chartsData.bcp.series;
    this.bcpChartLabels = chartsData.bcp.categories;
   }
}
