import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import * as HighchartsMore from "highcharts/highcharts-more";
import * as HighchartsExporting from "highcharts/modules/exporting";



@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ['./cartstyle.css']
})
export class ChartComponent implements OnInit {
  title = "app";
  chart;
  updateFromInput = false;
  Highcharts = Highcharts;
  chartConstructor = "chart";
  chartCallback;
  chartOptions = {
    series: [],
    exporting: {
      enabled: true
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: "Data"
      }
    }
  };

  constructor() {
    const self = this;

    // saving chart reference using chart callback
    this.chartCallback = chart => {
      self.chart = chart;
    };
  }

  ngOnInit() {}

  onInitChart() {
    const self = this,
      chart = this.chart;

    chart.showLoading();
    setTimeout(() => {
      chart.hideLoading();

      self.chartOptions.series = [
        {
          data: [2134000, 3168818, 2569759],
          name: 2015,
          type: "column"
        },
        {
          data: [2497680, 3195299, 2480444],
          name: 2014,
          type: "column"
        },
        {
          data: [2872000, 3604271, 2925828],
          name: 2016,
          type: "column"
        }
      ];

      self.updateFromInput = true;
    }, 2000);
  }
}
