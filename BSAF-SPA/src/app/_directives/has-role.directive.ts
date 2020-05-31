import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit{
@Input() appHasRole: string[];
isVisible = false;
  constructor(
    private viewContaninerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    console.log("user are "+ JSON.stringify(this.authService.decodedToken?.role));
    const userRoles = this.authService.decodedToken.role as Array<string>;
    if (!userRoles){
      this.viewContaninerRef.clear();
    }
    if (this.authService.roleMatch(this.appHasRole)){
      if (!this.isVisible){
        this.isVisible = true;
        this.viewContaninerRef.createEmbeddedView(this.templateRef);
      }else{
        this.isVisible = false;
        this.viewContaninerRef.clear();
      }
    }
  }

}
