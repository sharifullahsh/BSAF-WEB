export interface BeneficiaryView{
    beneficiaryID: number;
    cardID: string;
    screeningDate: Date;
    provinceBCP: string;
    borderPoint: string;
    beneficiaryType: string;
    returnStatus: string;
    originProvince: string;
    originDistrict: string;
    originVillage: string;
    returnProvince: string;
    returnDistrict: string;
    returnVillage: string;
    leavingReason1: string;
    leavingReason1Other: string;
    leavingReason2: string;
    leavingReason2Other: string;
    leavingReason3: string;
    leavingReason3Other: string;
    ownHouse: boolean;
    whereWillLive: string;
    rentPayForAccom: number;
    rentPayCurrency: string;
    allowForJob: boolean;
    countryOfExile: string;
    countryOfExilOther?: string;
    beforReturnProvince?: string;
    beforReturnDistrict?: string;
    beforReturnRemarks?: string;
    familyMemStayedBehind: boolean;
    familyMemStayedBehindNo?: number;
    lengthOfStayYears?: number;
    lengthOfStayMonths?: number;
    lengthOfStayDays?: number;
    wouldYouReturn: boolean;
    haveFamilyBenefited: boolean;
    transportationDate?: Date;
    transportationInfo?: string;
    transportAccompaniedBy?: string    ;
    transportAccomByNo?: string;
    topNeed1: string;
    topNeed2?: string;
    topNeed3?: string;
    intendToDo: string;
    intendToReturnToHostReason?: string;
    professionInHostCountry: string;
    hoHCanReadWrite: boolean;
    hoHEducationLevel?: string;
    numHHHaveTaskira?: number;
    numHHHavePassport?: number;
    numHHHaveDocOther?: number;
    doHaveSecureLivelihood: boolean;
    didChildrenGoToSchoole: boolean;
    numChildrenAttendedSchoole?: number;
    insertedBy?: string;
    insertedDate?: Date;
    lastUpdatedBy?: string;
    lastUpdatedDate?: Date;
    isCardIssued: true;
    photo: string;
    individuals: IndividualForView[];
    psns: string[];
    returnReasons: string[];
    determinations: DeterminationForView[];
    moneySources: string[];
    broughtItems: string[];
    postArrivalNeeds: PostArrivalNeedsForView[];
    benefitedFromOrgs: [];
    transportations: string[];
    livelihoodEmpNeeds: string[];
    needTools: string[];
    mainConcerns: [];
    hostCountrySchools: string[]
}
export interface  IndividualForView
    {
        individualID: number;
        name: string;
        drName: string;
        fName: string;
        drFName: string;
        gender: string;
        maritalStatus: string;
        age?: number;
        idType: string;
        idNo: string;
        relationship: string;
        contactNumber: string;
    }
export interface DeterminationForView
    {
        determinationName: string;
        answerCode: string;
    }
export interface PostArrivalNeedsForView
    {
        need: string;
        providedDate: Date;
        comment: string;
    }
export interface BenefitedFromOrgsForView
    {
        providedDate: Date;
        province: string;
        district: string;
        village: string;
        organization: string;
        assistanceProvided: string;
    }