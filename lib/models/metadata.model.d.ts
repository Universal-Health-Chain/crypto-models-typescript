import { IssuerElectronicRecordBase } from './oidc4ida.electronicRecord.model';
/** Both OIDC4IDA 'country_code' and FHIR country code for National Identity Documents ('NNxxx') use ISO 3166/ICAO 3-letter codes [ICAO-Doc9303] */
export declare const CountryAlpha3ISO: string;
/**
 *  - country_code: should be mandatory (ISO 3 letter, e.g.: ESP)
 *  - jurisdiction: region (ISO code, e.g.: ES-CL)
 */
export interface MetadataGeographicOnDLT extends IssuerElectronicRecordBase {
    country_code?: typeof CountryAlpha3ISO;
    jurisdiction?: string;
}
/**
 *  - country_code: should be mandatory (ISO 3 letter, e.g.: ESP)
 *  - jurisdiction: ISO (e.g.: a region such as ES-CL)
 *  - parentId: de-identified ID to link several anonym resources from a FHIR Bundle document or collection.
 *  - tags: non-personal tags such as "COVID-19" and resource types (Observation, etc.).
 *  - type: reverse DNS is recommended (e.g.: "org.hl7.fhir.R5.Bundle.document")
 */
export interface MetadataResearch extends MetadataGeographicOnDLT {
    parentId?: string;
    tags?: string[];
    type?: string;
}
