export interface PostArrivalNeed{
    id:number;
    lookupCode:string;
    isProvided:boolean;
    providedDate: string;
    comment:string;
}
export interface PostArrivalNeedForView{
    id:number;
    lookupName: string;
    lookupCode: string;
    isProvided:boolean;
    providedDate?: string;
    comment?:string;
}