import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

const modules: any[] = [
  FlexLayoutModule,
  CommonModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  LayoutModule,
  ChartsModule
];
@NgModule({
  declarations: [],
  imports: [
    ...modules
  ],
  exports:[
    ...modules
  ]
})
export class SharedModule { }
