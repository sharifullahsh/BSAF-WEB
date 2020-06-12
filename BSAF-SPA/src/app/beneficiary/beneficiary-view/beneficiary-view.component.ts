import { BeneficiaryView } from './../../models/BeneficiaryView';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/dialog/delete/delete-dialog.component';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BeneficiaryService } from 'src/app/_services/beneficiary.service';
import { DomSanitizer } from '@angular/platform-browser';
import { image } from 'src/app/models/image';

@Component({
  selector: 'app-beneficiary-view',
  templateUrl: './beneficiary-view.component.html',
  styleUrls: ['./beneficiary-view.component.css']
})
export class BeneficiaryViewComponent implements OnInit {
beneficiaryId: number;
beneficiary: BeneficiaryView;
photoPath: any;
individualsTbleColumns: string[] = ['name', 'fName', 'gender', 'maritalStatus', 'age', 'idType', 'idNo', 'relationship', 'contactNumber', 'drFName', 'drName'];
postArrivalNeedTbleColumns: string[] = ['NeedAssistance', 'IsProvided', 'ProvidedDate', 'Comments'];
benefitedFromOrgTbleColumns: string[] = ['Date', 'Province', 'District', 'VillageNehya', 'Organization', 'AssistanceProvided'];

constructor(private route: ActivatedRoute, public dialog: MatDialog,
            private alertifyService: AlertifyService,
            private sanitizer: DomSanitizer,
            public beneficiaryService: BeneficiaryService, ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.beneficiaryId = +params['id'];
    });
    this.beneficiaryService.getBeneficiaryForView(this.beneficiaryId).subscribe((response: BeneficiaryView) => {
      this.beneficiary =  response;
      if (response.photo){
        this.photoPath = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${response.photo}`);
      }else{
        this.photoPath = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);

      }
      console.log("beneficiary is >>>>>>>>>" + JSON.stringify(response));
    }, error => {
      this.alertifyService.error('Unable to load beneficiary information.');
    })
  }
  deleteBeneficiary(){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
       data: {title: 'Delete Beneficiary', description: 'Are you sure to delete this beneficiary?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.beneficiaryId){
        this.beneficiaryService.deleteBeneficiary(this.beneficiaryId)
        .subscribe((response: any) => {
          this.alertifyService.success('Beneficiary Successfuly deleted.');
        }, (error: any ) => {
          this.alertifyService.error('Un able to delete beneficiary.')
        })
      }
    });
  }
  showNeedTools(): boolean{
    const helps  = this.beneficiary?.livelihoodEmpNeeds || [];
    return  helps.includes('Provision of tools related to your skills');
  }
}
