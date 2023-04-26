/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { IssuerElectronicRecordBase } from './oidc4ida.electronicRecord.model';
import { CountryAlpha3ISO } from './openidEvidence.model';

/** 
 *  - country_code: should be mandatory (ISO 3 letter, e.g.: ESP)
 *  - jurisdiction: region (ISO code, e.g.: ES-CL)
 */
export interface MetadataGeographicOnDLT extends
    IssuerElectronicRecordBase
{
    country_code?:   typeof CountryAlpha3ISO;    // ISO 3 letter, same as OpenID and FHIR national identity sdocument NNxxx (e.g.: ESP)
    jurisdiction?:   string;                     // ISO (e.g.: a region such as ES-CL)
    // postal_code?: string;
}

/** 
 *  - country_code: should be mandatory (ISO 3 letter, e.g.: ESP)
 *  - jurisdiction: ISO (e.g.: a region such as ES-CL)
 *  - parentId: de-identified ID to link several anonym resources from a FHIR Bundle document or collection.
 *  - tags: non-personal tags such as "COVID-19" and resource types (Observation, etc.).
 *  - type: reverse DNS is recommended (e.g.: "org.hl7.fhir.R5.Bundle.document")
 */
export interface MetadataResearch extends
    MetadataGeographicOnDLT
{
    parentId?:  string;    // de-identified ID to link several anonym resources from a FHIR Bundle document or collection.
    tags?:      string[];  // non-personal tags such as "COVID-19" and resource types (Observation, etc.)
    type?:      string;    // reverse DNS, e.g.: "org.hl7.fhir.R5.Bundle.document"
}