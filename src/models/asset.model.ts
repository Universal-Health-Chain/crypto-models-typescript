import { MetaFhirOnDLT } from "./fhirBlockchain.model";
import { StandardJWE } from "./jwe.model";
import { EvidenceVerificationOnDLT } from "./openidBlockchain.model";
import { ProofCertificationBasic } from "./Proof.model";

/** Both OpenID 'country_code' and FHIR country code for National Identity Documents ('NNxxx') use ISO 3166/ICAO 3-letter codes [ICAO-Doc9303] */
export const CountryAlpha3ISO:string = 'AFG'||'ALB'||'DZA'||'ASM'||'AND'||'AGO'||'AIA'||'ATA'||'ATG'||'ARG'||'ARM'||'ABW'||'AUS'||'AUT'||'AZE'||'BHS'||'BHR'||'BGD'||'BRB'||'BLR'||'BEL'||'BLZ'||'BEN'||'BMU'||'BTN'||'BOL'||'BES'||'BIH'||'BWA'||'BVT'||'BRA'||'IOT'||'BRN'||'BGR'||'BFA'||'BDI'||'CPV'||'KHM'||'CMR'||'CAN'||'CYM'||'CAF'||'TCD'||'CHL'||'CHN'||'CXR'||'CCK'||'COL'||'COM'||'COD'||'COG'||'COK'||'CRI'||'HRV'||'CUB'||'CUW'||'CYP'||'CZE'||'CIV'||'DNK'||'DJI'||'DMA'||'DOM'||'ECU'||'EGY'||'SLV'||'GNQ'||'ERI'||'EST'||'SWZ'||'ETH'||'FLK'||'FRO'||'FJI'||'FIN'||'FRA'||'GUF'||'PYF'||'ATF'||'GAB'||'GMB'||'GEO'||'DEU'||'GHA'||'GIB'||'GRC'||'GRL'||'GRD'||'GLP'||'GUM'||'GTM'||'GGY'||'GIN'||'GNB'||'GUY'||'HTI'||'HMD'||'VAT'||'HND'||'HKG'||'HUN'||'ISL'||'IND'||'IDN'||'IRN'||'IRQ'||'IRL'||'IMN'||'ISR'||'ITA'||'JAM'||'JPN'||'JEY'||'JOR'||'KAZ'||'KEN'||'KIR'||'PRK'||'KOR'||'KWT'||'KGZ'||'LAO'||'LVA'||'LBN'||'LSO'||'LBR'||'LBY'||'LIE'||'LTU'||'LUX'||'MAC'||'MDG'||'MWI'||'MYS'||'MDV'||'MLI'||'MLT'||'MHL'||'MTQ'||'MRT'||'MUS'||'MYT'||'MEX'||'FSM'||'MDA'||'MCO'||'MNG'||'MNE'||'MSR'||'MAR'||'MOZ'||'MMR'||'NAM'||'NRU'||'NPL'||'NLD'||'NCL'||'NZL'||'NIC'||'NER'||'NGA'||'NIU'||'NFK'||'MNP'||'NOR'||'OMN'||'PAK'||'PLW'||'PSE'||'PAN'||'PNG'||'PRY'||'PER'||'PHL'||'PCN'||'POL'||'PRT'||'PRI'||'QAT'||'MKD'||'ROU'||'RUS'||'RWA'||'REU'||'BLM'||'SHN'||'KNA'||'LCA'||'MAF'||'SPM'||'VCT'||'WSM'||'SMR'||'STP'||'SAU'||'SEN'||'SRB'||'SYC'||'SLE'||'SGP'||'SXM'||'SVK'||'SVN'||'SLB'||'SOM'||'ZAF'||'SGS'||'SSD'||'ESP'||'LKA'||'SDN'||'SUR'||'SJM'||'SWE'||'CHE'||'SYR'||'TWN'||'TJK'||'TZA'||'THA'||'TLS'||'TGO'||'TKL'||'TON'||'TTO'||'TUN'||'TUR'||'TKM'||'TCA'||'TUV'||'UGA'||'UKR'||'ARE'||'GBR'||'UMI'||'USA'||'URY'||'UZB'||'VUT'||'VEN'||'VNM'||'VGB'||'VIR'||'WLF'||'ESH'||'YEM'||'ZMB'||'ZWE'||'ALA';

/** NOTES:
 * The summary of codes is added by the API when reading a resource (instead of duplicating data on blockchain).
 * Metadata provides technical and workflow context to the resource.
 * The 'source' property is overwritted with the performer practitionerRoleId by the smart contract.
 * (instead of removing 'source' and creating another 'performer' property).
 */

/** JSON-API common data */
export interface CommonDataAPI {
    id?:        string;             // REQURIED: UUID v4 (the URN can be created using the country for world area and the state info from meta.research).
    type?:      any;  // e.g.: FHIR resource type (e.g.: 'Bundle' or 'Immunization').
}

// --- FROM CLAIMS ---

/** canonicalization algorithm used for generating the digest values */
export interface CanonicalData {
    alg:    string; // algorithm used to generate the input data for the hash function.
}


// --- FROM COMMON TREE MODELS ---

/** It can contain: DICOM, FHIR and/or OMOP */
export interface GenericMinData {
    // dicom?: object;                 // parsed DICOM data, only for medical images
    fhir?:  GenericMinFhirDLT;
    omop?:  object;                 // OMOP data
}

/** Only (twin) 'research' data is allowed for blockchain notarization
 *  (SC will do the anomymization and de-identification of the data)
 *  No 'source' data is allowed for blockchain notarization and de-identification (it SHALL be removed)
 *  and it is deleted by the smart-contract if not
 */
export interface RenderedDataToSC {
    // no 'source' data is allowed for blockchain notarization and de-identification, it SHALL be removed
    research?: GenericMinData
}

// --- FROM API ---

export interface PublicCertificationResponseSC {
    uri: string; // the public URN to verify the resource.
}

export interface PrivateResearchResponseSC {
    uri: string; // the public URN to verify the resource.
    jwe: StandardJWE;   // encrypted notification to the recipient.
}

// -- NEW ---

/** MIME-type and version for the rendered data (source and research)
 *  - 'mime', e.g.: 'application/fhir+json'
 *  - 'version', e.g.: '4.0.1' (for FHIR R4)   
 */
 export interface RenderedBaseData {
    mime?:      string;
    version?:   string;
}

/** Any de-identified FHIR 'resource', 'mime' and 'version' properties.
 *
 *  NOTE: The 'digest' data of the de-identified (twin) resource is not needed
 *  because all the resource is already on blockchain.
 */
export interface GenericMinFhirDLT extends 
    RenderedBaseData
{
    resource: 	object; // any de-identified FHIR resource.
}

/** Any de-identified OpenEHR 'resource', 'mime' and 'version' properties.
 *
 *  NOTE: The 'digest' data of the de-identified (twin) resource is not needed
 *  because all the resource is already on blockchain.
 */
 export interface GenericMinFhirDLT extends 
 RenderedBaseData
{
 resource: 	object; // any de-identified FHIR resource.
}

/** only FHIR resource as data for research on blockchain for now
 *  - fhir: data anonymized and de-identified
 */
export interface GenericMinDataOnDLT {
    fhir?:  GenericMinFhirDLT;
}

/** This is for sending data to the Smart contracts when doing
 *  the public data notarization and the data de-identification for research:
 *  - creatorId: practitionerRole or device DID.
 *  - issuerId: organization DID.
 *  - holderId: DID in case of different to the subject DID.
 *  - subjectJwk: recipient's public Kyber JSON Web Key (JWK).
 *  - subjectId: patient's DID.
 *  - writerId: practitionerRole or device DID (deprecated perfomer).
 *  - writerType: redundant in UHC.
 */
 export interface ParticipantsCertification {
    creatorId?:         string; // DID
    holderId?:          string; // DID
    issuerId:           string; // DID
    subjectJwk: object; // public JSON Web Key (JWK)
    subjectId:          string; // DID
    writerId:           string; // DID
    writerType?:        string; // redundant in UHC
}

/** Define additional data for traceability to the HL7 'status' data (parent object):
 *  - createdAt: unix time in miliseconds
 *  - updatedAt: unix time in miliseconds
 *  - revokedAt: unix time in miliseconds
 *  - replacedAt: unix time in miliseconds
 *  - replacedId: DID of the new data
 *  - deletedAt: when it becomes unavailable to anyone
 */
/* use the MetaDidDocument for traceability
export interface EventsInfoOnDLT {
    createdAt?:     number; // unix time in miliseconds
    updatedAt?:     number; // unix time in miliseconds
    revokedAt?:     number; // unix time in miliseconds
    replacedAt?:    number; // unix time in miliseconds
    replacedId?:    string; // DID of the new data
    deletedAt?:     string; // 
}
*/

/** Additional data stored on blockchain for traceability:
 *  - channel?:   string; // blockchain channel, redudant in the UHC DID method
 *  - txn?:       string; // It is the base58 encoded txId (Transaction ID) for Version Control (it can be used as FHIR meta.versionId)
 *  - txTime?:    string; // when it is recorded on blockchain
 */
export interface TraceOnDLT {
    channel?:   string; // blockchain channel, redudant in the UHC DID method
    txn?:       string; // It is the base58 encoded txId (Transaction ID) for Version Control (it can be used as FHIR meta.versionId)
    txTime?:    string; // when it is recorded on blockchain
    /* moved to events
    createdAt?: number; // unix time in miliseconds
    updatedAt?: number; // unix time in miliseconds
    revokedAt?: number; // unix time in miliseconds
    replacedAt?: number; // unix time in miliseconds
    replacedId?: number; // DID of the new data
    deletedAt?: number; // when it becomes unavailable to anyone    
    */
}

/**
 *  - claims: child claims from the parent JSON data.
 *  - digest: digest data of the parent's JSON data 'attributes' (parent's 'attributes.identifier.did' SHALL exist for entrophy)
 *  - signatures: they can be converted for both W3C Proof and FHIR Provenance / Signature
 *  and it contains all the W3C Proof properties plus addition digest of the signature (if the signature data is not stored on blockchain)
 *  - status: HL7 status (other is possible)
 *  - events: data for traceability, additional to the HL7 'status' data.
 *  - notarization: credential, DGC, FHIR, OMOP, openEHR, and/or SHC.
 *  - participants: creatorId, holderId, issuerId, subjectId, subjectJwk, writerId, writerType.
 *  - openId: 'trust_framework', 'assurance_level', 'assurance_process', 'time', 'verification_process', 'evidence': array of OpenID evidences, following the OpenID standard (evidence instead of evidences)
 *  - trace: channel, txn, txTime
 *
 *  NOTE: evidences are added later when extending it (e.g.: physical document verification)
 */
 export interface VerificationOnDLT extends
    ProofCertificationBasic
{
    status?:        string;                         // HL7 status (other is possible)
    // use MetaDidDocument for traceability
    // events?:     EventsInfoOnDLT;                // data for traceability, additional to the HL7 'status' data.
    notarization?:  NotarizationHealthDLT;            // credential, DGC, FHIR, OMOP, openEHR, and/or SHC.
    participants?:  ParticipantsCertification;      // creatorId, holderId, issuerId, subjectId, subjectJwk, writerId, writerType.
    openId?:        EvidenceVerificationOnDLT; // 'trust_framework', 'assurance_level', 'assurance_process', 'time', 'verification_process', 'evidence': array of OpenID evidences, following the OpenID standard (evidence instead of evidences)
    trace?:         TraceOnDLT;                     // channel, txn, txTime
}

/**
 *  - canonical: 'alg' applies for all digest certifications (but each signature type can use a diferent one)
 *  - fhir: claims, digest, evidences, signatures (not rendered data: resource, fullUrl, mime or version)
 *  - omop: claims, digest, evidences, signatures (todo: create custom Notarization structure)
 *  - openEHR: claims, digest, evidences, signatures (todo: create custom Notarization structure)
 *  - shc: claims, digest, evidences (todo: create custom Notarization structure)
 *  - dgc: claims, digest, evidences (todo: create custom Notarization structure)
 *  - credential: claims, digest, evidences (todo: create custom Notarization structure)
 */
 export interface NotarizationHealthDLT {    
    canonical?:     CanonicalData;          // it applies for all digest notarizations (but each signature type can use a diferent one)
    // dicom?: DataSourceCertificationOnDLT; // only for medical images
    fhir?:          ProofCertificationBasic;   // todo: create custom NotarizationFHIR (includes evidences, if any)
    omop?:          ProofCertificationBasic;   // todo: create custom NotarizationOMOP
    openEHR?:       ProofCertificationBasic;   // todo: create custom NotarizationOpenEHR
    shc?:           ProofCertificationBasic;   // todo: create custom NotarizationSHC without signatures
    dgc?:           ProofCertificationBasic;   // todo: create custom NotarizationDGC without signatures
    credential?:    ProofCertificationBasic;   // todo: create custom NotarizationVC without signatures
}


/** It does not have attributes, text, relationships, record, but research:
 *  - twin: true if de-identified research data (twin) already exists
 *  - meta: FHIR meta properties, summary or 'index' (codes, customTags), research (country, state, systemVersion, sectionCode, sectionSystem and serviceType).
 *  - verification:  'status', 'participants', 'evidences' (no record or inline attachments but digest), 'notarization' data
 *  - rendered: it contains de-identified research (twin) data but not the original resources
 * 
 *  NOTE: 'participants' are now in the 'verification' data for blockchain notarization, the public keys will be removed by the SC.
 */
export interface DataToPrivateResearchSC extends
    CommonDataAPI  // id, type
{
    meta?:          MetadataPrivateAssetOnDLT;  // FHIR meta properties, summary or 'index' (codes, customTags), research (country, state, systemVersion, sectionCode, sectionSystem and serviceType).
    rendered?:      RenderedDataToSC;           // without source or summary
    twin?:          boolean;                    // true or false, it is created by the smart-contract but not by the API.
    verification?:  VerificationOnDLT;          // 'status', 'participants', 'evidences' (no record or inline attachments but digest), 'notarization' data
}

/** This is for sending data to the Smart contracts when doing
 *  the public data notarization and the data de-identification for research:
 *  - issuerId: organization DID.
 *  - holderId: DID in case of different to the subject DID.
 *  - subjectJwk: recipient's public Kyber JSON Web Key (JWK).
 *  - subjectId: patient's DID.
 *  - writerId: practitionerRole or device DID (deprecated perfomer).
 *  - writerType: redundant in UHC.
 *  - record: the FHIR resource (among other data is possible)
 *  - country: only for research purposes 
 *  - state: only for research purposes 
 *  - validFrom: unix time in miliseconds (not ISO string), it is not mandatory in all cases
 *  - validUntil: unix time in miliseconds (not ISO string), it is not mandatory in all cases
 *  - recordTitle:
 *  - notePatient:
 *  - noteFamily:
 *  - notePractitioner:
 */
export interface CertificationInputAPI extends
    ParticipantsCertification // DIDs of issuer, writer, subject, holder and recipient's public JWK.
{
    record:             any;    // health record data, e.g.: the FHIR resource
    country:            string; // for research
    state:              string; // for research
    validFrom?:         number; // miliseconds, it is not mandatory in all cases
    validUntil?:        number; // miliseconds, it is not mandatory in all cases
    recordTitle?:       string; // attached title to the health record data
    notePatient?:       string; // patient's payload annotation text
    noteFamily?:        string; // familiy member's payload annotation text
    notePractitioner?:  string; // practitioner's payload annotation text
}

/** In general, public data on blockchain cannot have attributes,
 *  but some exceptions are public MedicationDispense, MedicationPrescription, Organization...
 *
 *  The public Electronic record asset for public notarization / certification on blockchain containing:
 *  - meta: only 'fhir' data such as versionId, lastUpdated, security, source (overwritted with the performer practitionerRoleId by the smart contract).
 *  - twin: true if de-identified research data (twin) already exists
 *  - verification:  'status', 'participants', 'evidences' (no record or inline attachments but digest), 'notarization' data
 *
 *  NOTE: medication smart-contracts do not use 'twin' because the non personal data for traceability
 *  is already certified in the public ledger by the private smart-contract (public smart-contract does not exists in those cases).
 */
export interface PublicAssetRecordOnDLT 
    // it does not extends CommonDataAPI because 'id' and 'type' are not stored on the blockchain.
{ 
    // attributes: DataAttributesPublicOnDLT;
    meta?:          MetadataPublicAssetOnDLT;       // only 'fhir' but not 'research'
    twin?:          boolean;                        // to know if its digital twin was already anonymized and stored for research.
    verification?:  VerificationOnDLT;   // status, txn, canAlg, holder, issuerOrg, proof (for both private FHIR, private VC, public VC). 
}

/* Not allowed 'scope' nor 'capabilityChain' as input 'meta' in the smart contract */


// ---- META DATA ----

/** The 'meta' property is a set of metadata that provides technical and workflow context to the resource.
 *  It contains:
 *  - 'research': country, state, systemVersion, section, serviceType and
 *  - 'fhir': versionId, lastUpdated, security, source (overwritted with the performer practitionerRoleId by the smart contract).
 *
 * NOTE: The summary of codes will be added by the API if needed, instead of duplicating data on blockchain.
 */
 export interface MetadataFullOnDLT extends 
    MetadataPublicAssetOnDLT
 {
    research?:  MetadataGeographicOnDLT;
    permissions?: {
        // scopes?: string[];
        scope?:  string;    // UNID meta data: OpenID scope, only for practitionerRole
    }
}

/** The 'meta' property is a set of metadata that provides technical and workflow context to the resource.
 *  It contains:
 *  - 'research': country, state, systemVersion, section, serviceType and
 *  - 'fhir': versionId, lastUpdated, security, source (overwritted with the performer practitionerRoleId by the smart contract).
 *
 * NOTE: The summary of codes will be added by the API if needed, instead of duplicating data on blockchain.
 */
 export interface MetadataPrivateAssetOnDLT extends 
    MetadataPublicAssetOnDLT
 {
    research?:  ResearchMetadataOnDLT,  // country, state, systemVersion, section, serviceType
    fhir?:      MetaFhirOnDLT           // versionId, lastUpdated, security, source (replaced with the writerId)
    // scope?:  string;                 // UNID meta data: OpenID scope, only for practitionerRole
    // scopes?: string[];
}

/** The 'meta' property is a set of metadata that provides technical and workflow context to the resource.
 * It contains:
 *  - 'fhir': versionId, lastUpdated, security, source (overwritted with the performer practitionerRoleId by the smart contract).
 */
export interface MetadataPublicAssetOnDLT {
    fhir?:      MetaFhirOnDLT           // versionId, lastUpdated, security, source (replaced with the writerId)
}

/** It contains:
 *  - 'record': the original FHIR resource provided in the input.
 *  - 'shc': optional SMART Health Card.
 *  - 'vc': optional Verifiable Credential.
 *  - 'twin': to know if its digital twin was already anonymized and stored for research.
 *  - 'verification' element with:
 *      - 'evidence' (array of OpenID evidences).
 *      - 'trust_framework', 'assurance_level', 'assurance_process', 'time', 'verification_process' (OpenID properties).
 *      - 'canAlg', 'holder', 'issuerOrg', 'typeHL7', 'time' and 'writerDID' or 'writer' (with id and type).
 */

/** country, state, systemVersion, sectionCode, sectionSystem and serviceType.
 * 'txn' is not here but in the 'verification' element.
 * 'index' elements (codes and customTags) are not here to avoid data duplication on blockchain.
 */
export interface ResearchMetadataOnDLT extends
    MetadataGeographicOnDLT     // country, state
{
    sectionCode?:   string;     // OPTIONAL for DLT, but requiered for resources. Code (LOINC by default) for the health section or document category.
    sectionSystem?: string;     // OPTIONAL. 'http://loinc.org' by default (default is not stored on blockchain).
    serviceType?:   string;     // OPTIONAL. Creator healthcare service kind, see http://terminology.hl7.org/CodeSystem/service-type
    systemVersion?: string;     // OPTIONAL. It is the same as 'fhirVersion' in SHC. '4.0.1' is the default value if not provided (default is not stored on blockchain)
}

/** Country SHALL be mandatory for both research and public certification
 *  to know the channel, but it is not stored when doing public certification.
 */
export interface MetadataGeographicOnDLT {
    country?:   typeof CountryAlpha3ISO;    // ISO 3 letter, same as OpenID and FHIR national identity sdocument NNxxx (e.g.: ESP)
    state?:     string;                     // ISO (e.g.: ES-CL)
}
