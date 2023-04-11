/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { IssuerElectronicRecordBase } from './oidc4ida.electronicRecord.model';

/** Both OIDC4IDA 'country_code' and FHIR country code for National Identity Documents ('NNxxx') use ISO 3166/ICAO 3-letter codes [ICAO-Doc9303] */
export const CountryAlpha3ISO:string = 'AFG'||'ALB'||'DZA'||'ASM'||'AND'||'AGO'||'AIA'||'ATA'||'ATG'||'ARG'||'ARM'||'ABW'||'AUS'||'AUT'||'AZE'||'BHS'||'BHR'||'BGD'||'BRB'||'BLR'||'BEL'||'BLZ'||'BEN'||'BMU'||'BTN'||'BOL'||'BES'||'BIH'||'BWA'||'BVT'||'BRA'||'IOT'||'BRN'||'BGR'||'BFA'||'BDI'||'CPV'||'KHM'||'CMR'||'CAN'||'CYM'||'CAF'||'TCD'||'CHL'||'CHN'||'CXR'||'CCK'||'COL'||'COM'||'COD'||'COG'||'COK'||'CRI'||'HRV'||'CUB'||'CUW'||'CYP'||'CZE'||'CIV'||'DNK'||'DJI'||'DMA'||'DOM'||'ECU'||'EGY'||'SLV'||'GNQ'||'ERI'||'EST'||'SWZ'||'ETH'||'FLK'||'FRO'||'FJI'||'FIN'||'FRA'||'GUF'||'PYF'||'ATF'||'GAB'||'GMB'||'GEO'||'DEU'||'GHA'||'GIB'||'GRC'||'GRL'||'GRD'||'GLP'||'GUM'||'GTM'||'GGY'||'GIN'||'GNB'||'GUY'||'HTI'||'HMD'||'VAT'||'HND'||'HKG'||'HUN'||'ISL'||'IND'||'IDN'||'IRN'||'IRQ'||'IRL'||'IMN'||'ISR'||'ITA'||'JAM'||'JPN'||'JEY'||'JOR'||'KAZ'||'KEN'||'KIR'||'PRK'||'KOR'||'KWT'||'KGZ'||'LAO'||'LVA'||'LBN'||'LSO'||'LBR'||'LBY'||'LIE'||'LTU'||'LUX'||'MAC'||'MDG'||'MWI'||'MYS'||'MDV'||'MLI'||'MLT'||'MHL'||'MTQ'||'MRT'||'MUS'||'MYT'||'MEX'||'FSM'||'MDA'||'MCO'||'MNG'||'MNE'||'MSR'||'MAR'||'MOZ'||'MMR'||'NAM'||'NRU'||'NPL'||'NLD'||'NCL'||'NZL'||'NIC'||'NER'||'NGA'||'NIU'||'NFK'||'MNP'||'NOR'||'OMN'||'PAK'||'PLW'||'PSE'||'PAN'||'PNG'||'PRY'||'PER'||'PHL'||'PCN'||'POL'||'PRT'||'PRI'||'QAT'||'MKD'||'ROU'||'RUS'||'RWA'||'REU'||'BLM'||'SHN'||'KNA'||'LCA'||'MAF'||'SPM'||'VCT'||'WSM'||'SMR'||'STP'||'SAU'||'SEN'||'SRB'||'SYC'||'SLE'||'SGP'||'SXM'||'SVK'||'SVN'||'SLB'||'SOM'||'ZAF'||'SGS'||'SSD'||'ESP'||'LKA'||'SDN'||'SUR'||'SJM'||'SWE'||'CHE'||'SYR'||'TWN'||'TJK'||'TZA'||'THA'||'TLS'||'TGO'||'TKL'||'TON'||'TTO'||'TUN'||'TUR'||'TKM'||'TCA'||'TUV'||'UGA'||'UKR'||'ARE'||'GBR'||'UMI'||'USA'||'URY'||'UZB'||'VUT'||'VEN'||'VNM'||'VGB'||'VIR'||'WLF'||'ESH'||'YEM'||'ZMB'||'ZWE'||'ALA';

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