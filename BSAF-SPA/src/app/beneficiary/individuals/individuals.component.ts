import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IndividualDialogComponent } from '../individual-dialog/individual-dialog.component';

export interface PeriodicElement {
  individualID?: number;
  name: string;
  fName: string;
  gender: string;
  maritalStatus: string;
  age: number;
  idType?: string;
  idNo?: string;
  relationship: string;
  contactNumber?: string;
  drName?: string;
  drFName?: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {individualID:1 , name: 'Khan', fName: 'Jan', gender: 'Male', maritalStatus: 'married', 
  age: 23, idType: 'tazkira', idNo: '123', relationship: 'Head of House Hold',
  contactNumber: '079234324', drName: 'خان', drFName: 'جان'
 }
];


@Component({
  selector: 'app-individuals',
  templateUrl: './individuals.component.html',
  styleUrls: ['./individuals.component.css']
})
export class IndividualsComponent implements OnInit {
  displayedColumns: string[] = ['individualID', 'individualID', 'name', 'fName', 'gender', 'maritalStatus', 'age','idType', 'idNo','relationship', 'contactNumber', 'drName', 'drFName','actions'];
  dataSource = ELEMENT_DATA;
  animal: string;
  name: string;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  deleteIndividual(event: Event , id: number){
    event.stopPropagation();
    console.log("delete is working");
  }
  editIndividual(event: Event, id: number){
    event.stopPropagation();
    console.log("edit is working");
  }
  // openDialog(event:Event) {
  //   event.stopPropagation();
    
  // }
  openDialog(event:Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(IndividualDialogComponent, {
      width: '60%',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("result is >>>>>>."+ JSON.stringify(result))
      //this.animal = result;
    });
  }

}
