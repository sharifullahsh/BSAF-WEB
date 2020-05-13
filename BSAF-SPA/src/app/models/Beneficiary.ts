import { Determination } from './Determination';
import { Individual } from './Individual';
import { PostArrivalNeed } from './PostArrivalNeeds';
import { BenefitedFromOrg } from './BenefitedFromOrg';
import { SelectOption } from './SelectOption';
export interface Beneficiary{
        beneficiaryID: number;

        cardID: string;

        screeningDate: string;

        provinceBCP: string;

        borderPoint: string;

        beneficiaryCardNo: string;

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

        ownHouse?: boolean;

        whereWillLive: string;

       rentPayForAccom?: number;

        rentPayCurrency: string;

        allowForJob: boolean;

        countryOfExile: string;

        countryOfExilOther: string;

       beforReturnProvince?: number;

        beforReturnDistrictID: number;

        beforReturnRemarks: string;

        familyMemStayedBehind: boolean;

        familyMemStayedBehindNo?: number;

        lengthOfStayYears: number;

        lengthOfStayMonths?: number;

       lengthOfStayDays?: number;

        wouldYouReturn: boolean;

        haveFamilyBenefited: boolean;

        transportationDate: string;

        transportationInfo: string;

        transportAccompaniedBy: string;

        transportAccomByNo: string;

        topNeed1: string;

        topNeed1Other: string;

        topNeed2: string;

        topNeed2Other: string;

        topNeed3: string;

        topNeed3Other: string;

        intendToDo: string;

        intendToReturnToHostReason: string ;

        professionInHostCountry: string;

        professionInHostCountryOther: string ;

        hoHCanReadWrite?: boolean;

        hoHEducationLevel: string;

        hoHEducationLevelOther: string ;

        numHHHaveTaskira?: number ;

        numHHHavePassport?: number ;

        numHHHaveDocOther?: number ;

        doHaveSecureLivelihood?: boolean;

        didChildrenGoToSchoole: boolean ;

        numChildrenAttendedSchoole: number ;

        isSubmitted: boolean;

        isCardIssued: boolean;

        photo: string;

       individuals: Individual[];

        psNs: SelectOption[];

       returnReasons: SelectOption[];

        determinations: Determination[];

        moneySources: SelectOption[]

        broughtItems: SelectOption[];

        postArrivalNeeds: PostArrivalNeed[];

        benefitedFromOrgs: BenefitedFromOrg[];

        transportations: SelectOption[];

        livelihoodEmpNeeds: SelectOption[]

        needTools: SelectOption[];

        mainConcerns: SelectOption[];

        hostCountrySchools: SelectOption[];
}