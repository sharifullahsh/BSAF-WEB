import { DashboardCharts, HightChartData } from './../models/DashboardCharts';
import { AlertifyService } from './../_services/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from './../_services/user.service';
import { DashboardService } from './../_services/dashboard.service';
import { DashboardTileData } from './../models/DashboardTileData';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
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
  public barChartOptions: ChartOptions = {
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
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
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

    this.dashboardService.getChartsData(this.searchForm.value)
 .subscribe((response: DashboardCharts) => {
   console.log("response is "+ JSON.stringify(response));
   this.loadBeneficiaryByBCP(response.bcp);
  },
 (error) => this.alertifyService.error('Unable to load charts data')
 );
    
  }

 loadBeneficiaryByBCP(chartData: HightChartData){
  // this.beneficiaryByBCPChartOptions.xAxis.categories = highChartData.categories;
  // this.beneficiaryByBCPChartOptions.series = highChartData.series;
  // this.barChartData[0].data = chartData.series[0].data;
  // this.barChartData[0].data = chartData.series[0].data;
  // this.barChartData[1].data = chartData.series[1].data;
  // this.barChartData[2].data = chartData.series[1].data;
  this.barChartData = chartData.series;
  this.barChartLabels = chartData.categories;

   console.log('response is 2'+ JSON.stringify(chartData));
 }
   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }
  onSubmit(){

  }
}
