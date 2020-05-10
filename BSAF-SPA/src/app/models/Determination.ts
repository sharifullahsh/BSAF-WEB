export interface Determination{
    id: number;
    beneficiaryID: number;
    determinationCode: string;
    answerCode: string;
    other?: string;
}
export interface DeterminationForView{
    lookupName: string;
    lookupCode: string;
    other?: string;
    answerCode?: string;
}