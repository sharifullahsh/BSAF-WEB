import { LookupService } from 'src/app/_services/lookup.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { InitialLookups } from '../models/InitialLookups';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryResolverService {

  constructor(private router: Router, private alertifyService: AlertifyService, private lookupService: LookupService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<InitialLookups> {
    return this.lookupService.getInitialLookups()
    .pipe(catchError(error=>{
      this.alertifyService.error('Problems retrieving initial lookups');
      this.router.navigate(['/beneficiarySearch']);
      return of(null);
    }));
  }
}
