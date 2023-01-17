import { CommonDataAPI } from "./api.model";
import { MetaFhirOnDLT } from "./fhirBlockchain.model";
import { StandardJWE } from "./jwe.model";
import { EvidenceVerificationOnDLT } from "./openidBlockchain.model";
import { VerificationEvidencesOpenID } from "./openidEvidence.model";
import { ProofCertificationBasic } from "./Proof.model";
/** Both OpenID 'country_code' and FHIR country code for National Identity Documents ('NNxxx') use ISO 3166/ICAO 3-letter codes [ICAO-Doc9303] */
export declare const CountryAlpha3ISO: string;
/** canonicalization algorithm used for generating the digest values */
export interface CanonicalData {
    alg: string;
}
/** It can contain: DICOM, FHIR and/or OMOP */
export interface GenericMinData {
    fhir?: GenericMinFhirDLT;
    omop?: object;
}
/** Only research is allowed for blockchain:
 *  - 'research': FHIR and/or OMOP
 *
 *  NOTE: OMOP is the Observational Medical Outcomes Partnership (OMOP) Common Data Model (OMOP CDM), now in its version 6.0.
 */
export interface RenderedDataOnDLT {
    research?: GenericMinDataOnDLT;
}
/** Only (twin) 'research' data is allowed for blockchain notarization
 *  (SC will do the anomymization and de-identification of the data)
 *  No 'source' data is allowed for blockchain notarization and de-identification (it SHALL be removed)
 *  and it is deleted by the smart-contract if not
 */
export interface RenderedDataToSC {
    research?: GenericMinData;
}
export interface PublicCertificationResponseSC {
    uri: string;
}
export interface PrivateResearchResponseSC {
    uri: string;
    jwe: StandardJWE;
}
/** MIME-type and version for the rendered data (source and research)
 *  - 'mime', e.g.: 'application/fhir+json'
 *  - 'version', e.g.: '4.0.1' (for FHIR R4)
 */
export interface RenderedBaseData {
    mime?: string;
    version?: string;
}
/** Any de-identified FHIR 'resource', 'mime' and 'version' properties.
 *
 *  NOTE: The 'digest' data of the de-identified (twin) resource is not needed
 *  because all the resource is already on blockchain.
 */
export interface GenericMinFhirDLT extends RenderedBaseData {
    resource: object;
}
/** Any de-identified OpenEHR 'resource', 'mime' and 'version' properties.
 *
 *  NOTE: The 'digest' data of the de-identified (twin) resource is not needed
 *  because all the resource is already on blockchain.
 */
export interface GenericMinFhirDLT extends RenderedBaseData {
    resource: object;
}
/** only FHIR resource as data for research on blockchain for now
 *  - fhir: data anonymized and de-identified
 */
export interface GenericMinDataOnDLT {
    fhir?: GenericMinFhirDLT;
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
    creatorId?: string;
    holderId?: string;
    issuerId: string;
    subjectJwk: object;
    subjectId: string;
    writerId: string;
    writerType?: string;
}
/** Define additional data for traceability to the HL7 'status' data (parent object):
 *  - createdAt: unix time in miliseconds
 *  - updatedAt: unix time in miliseconds
 *  - revokedAt: unix time in miliseconds
 *  - replacedAt: unix time in miliseconds
 *  - replacedId: DID of the new data
 *  - deletedAt: when it becomes unavailable to anyone
 */
/** Additional data stored on blockchain for traceability:
 *  - channel?:   string; // blockchain channel, redudant in the UHC DID method
 *  - txn?:       string; // It is the base58 encoded txId (Transaction ID) for Version Control (it can be used as FHIR meta.versionId)
 *  - txTime?:    string; // when it is recorded on blockchain
 */
export interface TraceOnDLT {
    channel?: string;
    txn?: string;
    txTime?: string;
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
export interface VerificationOnDLT extends ProofCertificationBasic {
    status?: string;
    notarization?: NotarizationHealthDLT;
    participants?: ParticipantsCertification;
    openId?: EvidenceVerificationOnDLT;
    trace?: TraceOnDLT;
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
    canonical?: CanonicalData;
    fhir?: ProofCertificationBasic;
    omop?: ProofCertificationBasic;
    openEHR?: ProofCertificationBasic;
    shc?: ProofCertificationBasic;
    dgc?: ProofCertificationBasic;
    credential?: ProofCertificationBasic;
}
/** It does not have attributes, text, relationships, record, but research:
 *  - twin: true if de-identified research data (twin) already exists
 *  - meta: FHIR meta properties, summary or 'index' (codes, customTags), research (country, state, systemVersion, sectionCode, sectionSystem and serviceType).
 *  - verification:  'status', 'participants', 'evidences' (no record or inline attachments but digest), 'notarization' data
 *  - rendered: it contains de-identified research (twin) data but not the original resources
 *
 *  NOTE: 'participants' are now in the 'verification' data for blockchain notarization, the public keys will be removed by the SC.
 */
export interface DataToPrivateResearchSC extends CommonDataAPI {
    meta?: MetadataPrivateAssetOnDLT;
    rendered?: RenderedDataToSC;
    twin?: boolean;
    verification?: VerificationOnDLT;
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
export interface CertificationInputAPI extends ParticipantsCertification {
    record: any;
    country: string;
    state: string;
    validFrom?: number;
    validUntil?: number;
    recordTitle?: string;
    notePatient?: string;
    noteFamily?: string;
    notePractitioner?: string;
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
export interface PublicAssetRecordOnDLT {
    meta?: MetadataPublicAssetOnDLT;
    twin?: boolean;
    verification?: VerificationOnDLT;
}
/** The 'meta' property is a set of metadata that provides technical and workflow context to the resource.
 *  It contains:
 *  - 'research': country, state, systemVersion, section, serviceType and
 *  - 'fhir': versionId, lastUpdated, security, source (overwritted with the performer practitionerRoleId by the smart contract).
 *
 * NOTE: The summary of codes will be added by the API if needed, instead of duplicating data on blockchain.
 */
export interface MetadataFullOnDLT extends MetadataPublicAssetOnDLT {
    research?: MetadataGeographicOnDLT;
    permissions?: {
        scope?: string;
    };
}
/** The 'meta' property is a set of metadata that provides technical and workflow context to the resource.
 *  It contains:
 *  - 'research': country, state, systemVersion, section, serviceType and
 *  - 'fhir': versionId, lastUpdated, security, source (overwritted with the performer practitionerRoleId by the smart contract).
 *
 * NOTE: The summary of codes will be added by the API if needed, instead of duplicating data on blockchain.
 */
export interface MetadataPrivateAssetOnDLT extends MetadataPublicAssetOnDLT {
    research?: ResearchMetadataOnDLT;
    fhir?: MetaFhirOnDLT;
}
/** The 'meta' property is a set of metadata that provides technical and workflow context to the resource.
 * It contains:
 *  - 'fhir': versionId, lastUpdated, security, source (overwritted with the performer practitionerRoleId by the smart contract).
 */
export interface MetadataPublicAssetOnDLT {
    fhir?: MetaFhirOnDLT;
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
export interface ResearchMetadataOnDLT extends MetadataGeographicOnDLT {
    sectionCode?: string;
    sectionSystem?: string;
    serviceType?: string;
    systemVersion?: string;
}
/** Country SHALL be mandatory for both research and public certification
 *  to know the channel, but it is not stored when doing public certification.
 */
export interface MetadataGeographicOnDLT {
    country?: typeof CountryAlpha3ISO;
    state?: string;
}
/**
 *  - status: HL7 status (other is possible)
 *  - events: data for traceability, additional to the HL7 'status' data.
 *  - claims: child claims from the parent JSON data.
 *  - digest: digest data of the parent's JSON data 'attributes' (parent's 'attributes.identifier.did' SHALL exist for entrophy)
 *  - signatures: they can be converted for both W3C Proof and FHIR Provenance / Signature
 *  and it contains all the W3C Proof properties plus addition digest of the signature (if the signature data is not stored on blockchain)
 *  - notarization: credential, DGC, FHIR, OMOP, openEHR, and/or SHC.
 *  - participants: creatorId, holderId, issuerId, subjectId, subjectJwk, writerId, writerType.
 *  - openId: 'trust_framework', 'assurance_level', 'assurance_process', 'time', 'verification_process', 'evidence': array of OpenID evidences, following the OpenID standard (evidence instead of evidences)
 *  - trace: channel, txn, txTime
 *
 *  NOTE: evidences are added later when extending it (e.g.: physical document verification)
 */
export interface VerificationEHR extends ProofCertificationBasic {
    status?: string;
    notarization?: VerificationEHR;
    participants?: ParticipantsCertification;
    openId?: VerificationEvidencesOpenID;
    trace?: TraceOnDLT;
}
/** It contains:
 *  - 'id' (the resource ID) and 'type' (e.g.: 'Observation'): not stored on blockchain.
 *  - 'record.fhir': the original FHIR resource provided in the input.
 *  - 'record.shc': optional SMART Health Card.
 *  - 'record.vc': optional Verifiable Credential.
 *  - 'twin': to know if its digital twin was already anonymized and stored for research.
 *  - 'verification' element with:
 *      - 'evidence': array of OpenID evidences, following the OpenID standard (evidence instead of evidences).
 *      - 'trust_framework', 'assurance_level', 'assurance_process', 'time', 'verification_process' (OpenID properties).
 *      - 'canAlg', 'holder', 'issuerOrg', 'typeHL7', 'time' and 'writerDID' or 'writer' (with id and type).
 *  - 'meta'
 *      - 'fhir': versionId, lastUpdated, security, source (replaced with the writerId by the blockchain).
 *      - 'research': country, state, among others.
 *      - 'permissions': only for PractitonerRole.
 *
 *  NOTE: It does not include 'relationships': issuerOrgDID, performerId, performerType, holderId, subjectId are in the attributes.
 */
export interface CertificationDataOutput extends CommonDataAPI {
    twin: boolean;
    meta: MetadataFullOnDLT;
    verification?: VerificationEHR;
    record?: any;
}
