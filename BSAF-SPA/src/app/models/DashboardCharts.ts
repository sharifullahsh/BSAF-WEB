export interface DashboardCharts{
    bcp: Ng2ChartData;
}
export interface Ng2ChartData{
    categories: string[];
    series: Series[];
}
export interface Series{
    label: string;
    data: number[];
}