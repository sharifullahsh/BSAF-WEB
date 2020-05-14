import { DeterminationLookup } from './Determination';
import { Lookup } from './Lookup';
export interface InitialLookups{
    provinces: Lookup[];
    borderCrossingPoints: Lookup[];
    gender: Lookup[];
    maritalStatus: Lookup[];
    idTypes: Lookup[];
    relationships: Lookup[];
    psns: Lookup[];
    leavingReasons: Lookup[];
    returnReasons: Lookup[];
    whereWillLive: Lookup[];
    organizations: Lookup[];
    intendToDos: Lookup[];
    professions: Lookup[];
    educationLevels: Lookup[];
    determinations: Lookup[];
    moneySources: Lookup[];
    broughtItems: Lookup[];
    postArrivalNeeds: Lookup[];
    transportations: Lookup[];
    topNeeds: Lookup[];
    obtainLivelihoodHelps: Lookup[];
    tools: Lookup[];
    mainConcerns: Lookup[];
    hostCountrySchools: Lookup[];
}