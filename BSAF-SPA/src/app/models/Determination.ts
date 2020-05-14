export interface DeterminationLookup{
    id: number;
    lookupCode: string;
    answerCode: string;
    other?: string;
}
export interface DeterminationForView{
    lookupName: string;
    lookupCode: string;
    other?: string;
    answerCode?: string;
}