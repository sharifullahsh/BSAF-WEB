export interface MoneySource{
    id: number;
    beneficiaryID: number;
    moneySourceCode: string;
    moneySourceOther?: string;
}