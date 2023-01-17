"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryAlpha3ISO = void 0;
/** Both OpenID 'country_code' and FHIR country code for National Identity Documents ('NNxxx') use ISO 3166/ICAO 3-letter codes [ICAO-Doc9303] */
exports.CountryAlpha3ISO = 'AFG' || 'ALB' || 'DZA' || 'ASM' || 'AND' || 'AGO' || 'AIA' || 'ATA' || 'ATG' || 'ARG' || 'ARM' || 'ABW' || 'AUS' || 'AUT' || 'AZE' || 'BHS' || 'BHR' || 'BGD' || 'BRB' || 'BLR' || 'BEL' || 'BLZ' || 'BEN' || 'BMU' || 'BTN' || 'BOL' || 'BES' || 'BIH' || 'BWA' || 'BVT' || 'BRA' || 'IOT' || 'BRN' || 'BGR' || 'BFA' || 'BDI' || 'CPV' || 'KHM' || 'CMR' || 'CAN' || 'CYM' || 'CAF' || 'TCD' || 'CHL' || 'CHN' || 'CXR' || 'CCK' || 'COL' || 'COM' || 'COD' || 'COG' || 'COK' || 'CRI' || 'HRV' || 'CUB' || 'CUW' || 'CYP' || 'CZE' || 'CIV' || 'DNK' || 'DJI' || 'DMA' || 'DOM' || 'ECU' || 'EGY' || 'SLV' || 'GNQ' || 'ERI' || 'EST' || 'SWZ' || 'ETH' || 'FLK' || 'FRO' || 'FJI' || 'FIN' || 'FRA' || 'GUF' || 'PYF' || 'ATF' || 'GAB' || 'GMB' || 'GEO' || 'DEU' || 'GHA' || 'GIB' || 'GRC' || 'GRL' || 'GRD' || 'GLP' || 'GUM' || 'GTM' || 'GGY' || 'GIN' || 'GNB' || 'GUY' || 'HTI' || 'HMD' || 'VAT' || 'HND' || 'HKG' || 'HUN' || 'ISL' || 'IND' || 'IDN' || 'IRN' || 'IRQ' || 'IRL' || 'IMN' || 'ISR' || 'ITA' || 'JAM' || 'JPN' || 'JEY' || 'JOR' || 'KAZ' || 'KEN' || 'KIR' || 'PRK' || 'KOR' || 'KWT' || 'KGZ' || 'LAO' || 'LVA' || 'LBN' || 'LSO' || 'LBR' || 'LBY' || 'LIE' || 'LTU' || 'LUX' || 'MAC' || 'MDG' || 'MWI' || 'MYS' || 'MDV' || 'MLI' || 'MLT' || 'MHL' || 'MTQ' || 'MRT' || 'MUS' || 'MYT' || 'MEX' || 'FSM' || 'MDA' || 'MCO' || 'MNG' || 'MNE' || 'MSR' || 'MAR' || 'MOZ' || 'MMR' || 'NAM' || 'NRU' || 'NPL' || 'NLD' || 'NCL' || 'NZL' || 'NIC' || 'NER' || 'NGA' || 'NIU' || 'NFK' || 'MNP' || 'NOR' || 'OMN' || 'PAK' || 'PLW' || 'PSE' || 'PAN' || 'PNG' || 'PRY' || 'PER' || 'PHL' || 'PCN' || 'POL' || 'PRT' || 'PRI' || 'QAT' || 'MKD' || 'ROU' || 'RUS' || 'RWA' || 'REU' || 'BLM' || 'SHN' || 'KNA' || 'LCA' || 'MAF' || 'SPM' || 'VCT' || 'WSM' || 'SMR' || 'STP' || 'SAU' || 'SEN' || 'SRB' || 'SYC' || 'SLE' || 'SGP' || 'SXM' || 'SVK' || 'SVN' || 'SLB' || 'SOM' || 'ZAF' || 'SGS' || 'SSD' || 'ESP' || 'LKA' || 'SDN' || 'SUR' || 'SJM' || 'SWE' || 'CHE' || 'SYR' || 'TWN' || 'TJK' || 'TZA' || 'THA' || 'TLS' || 'TGO' || 'TKL' || 'TON' || 'TTO' || 'TUN' || 'TUR' || 'TKM' || 'TCA' || 'TUV' || 'UGA' || 'UKR' || 'ARE' || 'GBR' || 'UMI' || 'USA' || 'URY' || 'UZB' || 'VUT' || 'VEN' || 'VNM' || 'VGB' || 'VIR' || 'WLF' || 'ESH' || 'YEM' || 'ZMB' || 'ZWE' || 'ALA';
// TODO: align CertificationDataOutput with ResourceObject
// TODO: align CertificationInputAPI with ResourceObject
/* It has:
 *  - 'source' (DICOM, FHIR, SHC, DGC, VC and/or OMOP)
 *  - 'summary' (it can be used both for generating new records or to simplify a record from distinct data formats)
 *  - 'research' (DICOM, FHIR and/or OMOP)
 *
 *  NOTE: OMOP is the Observational Medical Outcomes Partnership (OMOP) Common Data Model (OMOP CDM), now in its version 6.0.
 
export interface RenderedDataOnEHR extends
    RenderedDataOnDLT
{
    source?:    GenericSourceData; // DICOM, FHIR, SHC, DGC, VC and/or OMOP
    summary?:   any;                // it can be used both for generating new records or to simplify a record from distinct data formats
}
*/ 
