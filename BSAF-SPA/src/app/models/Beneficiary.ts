import { Transportation } from './Transportation';
import { MoneySource } from './MoneySource';
import { Determination } from './Determination';
import { ReturnReason } from './ReturnReasons';
import { PSN } from './PSN';
import { Individual } from './Individual';
import { BroughtItem } from './BroughtItem';
import { PostArrivalNeed } from './PostArrivalNeeds';
import { BenefitedFromOrg } from './BenefitedFromOrg';
import { LivelihoodEmpNeed } from './LivelihoodEmpNeed';
import { NeedTool } from './NeedTool';
import { MainConcern } from './MainConcern';
import { HostCountrySchool } from './HostCountrySchool';
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

        psNs: PSN[];

       returnReasons: ReturnReason[];

        determinations: Determination[];

        moneySources: MoneySource[]

        broughtItems: BroughtItem[];

        PostArrivalNeeds: PostArrivalNeed[];

        benefitedFromOrgs: BenefitedFromOrg[];

        transportations: Transportation[];

        livelihoodEmpNeeds: LivelihoodEmpNeed[]

        needTools: NeedTool[];

        mainConcerns: MainConcern[];

        hostCountrySchools: HostCountrySchool[];
}