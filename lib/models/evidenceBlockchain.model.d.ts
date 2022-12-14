import { AttachedSignatureDLT, DigestResultOpenIdData } from './Proof.model';
/** W3C Evidence for VCs can be generated by the API from some OpenID evidence stored on blockchain.
 *  See EBSI v2: https://ec.europa.eu/digital-building-blocks/wikis/display/EBSIDOC/Verifiable+Attestation
 *  - id: OPTIONAL. If present, it MUST contain a URL that points to where more information about this instance of evidence can be found (e.g.: urn:unid:uhc:vc:xyz or e.g.: "https://example.edu/evidence/f2aeec97-fc0d-42bf-8ca7-0548192dxyzab")
 *  - type: REQUIRED. Defines the evidence type, e.g.: ["DocumentVerification"], ["id_document"], ["utility_bill"], ["qes"]
 *  - verifier: REQUIRED. Defines entity that has verified documents before Verifiable Attestation issuance, e.g.: "https://example.edu/issuers/14"
 *  - evidenceDocument: REQUIRED. Defines document(s) which have been verified before Verifiable Attestation issuance, e.g.: "DriversLicense" (TODO: can be used HL7 instead?). QUESTION: Should it be the universal ID instead a description? RESPONSE: No, because it is linked to a credentialSubject within a credential
 *  - subjectPresence: REQUIRED. Defines if the Verifiable Attestation Subject was physically present in the course of the verification, e.g.: 'Physical' or 'Digital'
 *  - documentPresence:  REQUIRED. Defines how the document(s) which have been verified before Verifiable Credentials issuance have been provided, e.g.: 'Physical' or 'Digital'
 */
export interface EvidenceW3C {
    id?: string;
    type?: string[];
    verifier?: string;
    evidenceDocument?: string;
    subjectPresence?: string;
    documentPresence?: string;
}
/** Evidence is the certification of the authenticity of some (physical) document, (electronic) record, (electronic) signature, (utility) bill or vouch.
 * OpenID Connect for Identity Assurance 1.0: https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html
 * 5.1.1. Evidence Element - types of evidence:
 * - document: Verification based on any kind of physical or electronic document provided by the End-User.
 * - electronic_record: Verification based on data or information obtained electronically from an approved or recognized source.
 * - vouch: Verification based on an attestation or reference given by an approved or recognized person declaring they believe to the best of their knowledge that the Claim(s) are genuine and true.
 * - utility_bill: Verification based on a utility bill (this is to be deprecated in future releases and implementers are recommended to use the document type instead).
 * - electronic_signature: Verification based on an electronic signature.
 */
export declare type EvidenceObjectDLT = EvidenceElectronicRecordDLT | EvidenceDocumentDLT | EvidenceVouchDLT | EvidenceBillDLT | EvidenceElectronicSignatureDLT;
/** Attachment OpenID has digest.alg and digest.value (Base64 encoded) but FHIR Attachment not */
export interface AttachmentExternalDLT {
    id?: string;
    type?: string;
    digest: DigestResultOpenIdData;
}
/**
 * If the OP (operator) issues a txn, it MUST maintain a corresponding audit trail.
 * Audit trail at least consists of the following details:
 * - the transaction id,
 * - the authentication methods employed, and
 * - the transaction type (e.g. scope values).
 *
 * OpenID 'method' values are:
 * pipp (Physical In-Person Proofing);
 * sripp (Supervised remote In-Person Proofing);
 * eid (Online verification of an electronic ID card);
 * uripp (Unsupervised remote in-person proofing with video capture of the ID document, user self-portrait video and liveness checks).
 * onsite (Electronically onsite reading the document???s chip using an authorization certificate and card access number).
 */
/** Note: While 'verification_process' refers to the identity verification process at the OP (operator),
 *  the 'txn' claim refers to a particular OpenID Connect transaction in which the OP attested the user's verified identity data towards a RP.
 *  'evidence' property can contain IdentityDocEvidenceOpenID, BillEvidenceOpenID and QesEvidenceOpenID objects.
 *  'assurance_level' is the Assurance level associated with the End-User Claims in the respective 'verified_claims' and
 *  its value range depends on the respective 'trust_framework' value, e.g.: eidas can have the identity assurance levels 'low', 'substantial' and 'high'.
 */
export interface EvidenceVerificationCommon {
    trust_framework?: string;
    assurance_level?: string;
    assurance_process?: AssuranceProcessDLT;
    time?: string;
    verification_process?: string;
}
/** Note: While 'verification_process' refers to the identity verification process at the OP (operator),
 *  the 'txn' claim refers to a particular OpenID Connect transaction in which the OP attested the user's verified identity data towards a RP.
 *  'evidence' property can contain IdentityDocEvidenceOpenID, BillEvidenceOpenID and QesEvidenceOpenID objects.
 *  'assurance_level' is the Assurance level associated with the End-User Claims in the respective 'verified_claims' and
 *  its value range depends on the respective 'trust_framework' value, e.g.: eidas can have the identity assurance levels 'low', 'substantial' and 'high'.
 */
export interface EvidenceVerificationOnDLT extends EvidenceVerificationCommon {
    evidence?: EvidenceObjectDLT[];
}
export interface AssuranceProcessDLT {
    policy?: string;
    procedure?: string;
    status?: string;
}
/** Predefined method values are given in Verification Methods (https://bitbucket.org/openid/ekyc-ida/wiki/identifiers)
 * - pipp (Physical In-Person Proofing)
 * - sripp (Supervised remote In-Person Proofing)
 * - eid (Online verification of an electronic ID card)
 * - uripp (Unsupervised remote in-person proofing with video capture of the ID document, user self-portrait video and liveness checks).
 */
export interface EvidenceDocumentDLT extends EvidenceCommonSubElementDLT {
    attachments?: AttachmentExternalDLT;
    check_details?: EvidenceCheckData[];
    document_details?: DocumentDetailsDLT;
    method: string;
    time?: string;
    type: 'document';
    verifier: VerifierDLT;
}
export interface EvidenceCommonSubElementDLT {
    method: string;
    time?: string;
}
/** CheckDetails is a JSON array representing the checks done in relation to the evidence.
 *  When present this array MUST have at least one member.
 *  https://bitbucket.org/openid/ekyc-ida/wiki/identifiers
 *  - check_method: REQUIRED. String representing the check done, this includes processes such as checking the authenticity of the document, or verifying the user's biometric against an identity document. For information on predefined check_details values see Section 14.
 *  - organization: OPTIONAL. String denoting the legal entity that performed the check. This SHOULD be included if the OP did not perform the check itself.
 *  - txn: OPTIONAL. Identifier referring to the identity verification transaction. The OP MUST ensure that this is present when evidence_ref element is used. The OP MUST ensure that the transaction identifier can be resolved into transaction details during an audit.
 *  - time: OPTIONAL. Time stamp in ISO 8601 [ISO8601] YYYY-MM-DDThh:mm[:ss]TZD format representing the date when the check was completed.
 */
export interface EvidenceCheckData {
    check_method: string;
    organization?: string;
    txn?: string;
    time?: string;
}
/** 'organization' is the organization ID which performed the verification on behalf of the OP */
export interface VerifierDLT {
    organization: string;
    txn?: string;
}
/** OpenID 'document' evidence sub-element.
 * - 'type' of the (physical) document (standarized).
 * - 'date_of_issuance' is the date the document was issued as ISO 8601:2004 YYYY-MM-DD format.
 * - 'date_of_expiry' is the date the document will expire as ISO 8601:2004 YYYY-MM-DD format.
 * - 'serial_number' is the model of the document irrespective of any personalization information (usually physical artefacts and is present before personalization).
 * - 'document_number' is the unique document ID that was issued to the End-User and will change if it is reissued, e.g., a passport number, certificate number, etc.
 *  Note: number can be used as an alias for 'document_number' for backward compatibilty purposes but will be deprecated in future releases, implementers are recommended to use document_number.
 */
export interface DocumentDetailsBase {
    date_of_expiry: string;
    date_of_issuance: string;
    document_number?: string;
    serial_number?: string;
    type: string;
}
/** JSON object representing the document used to perform the identity verification.
 *  - type: REQUIRED. Standardized values are defined in the Identity Documents section. The OP MAY use other than the predefined values in which case the RPs will either be unable to process the assertion, just store this value for audit purposes, or apply bespoken business logic to it.
 *  - personal_number: OPTIONAL. It is the subject's DID URI (can be also the holder).
 *  - issuer: OPTIONAL. JSON object containing information about the issuer of this document.
 *  - date_of_issuance: REQUIRED. If this attribute exists for the particular type of document. The date the document was issued as ISO 8601:2004 YYYY-MM-DD format.
 *  - date_of_expiry: REQUIRED. If this attribute exists for the particular type of document. The date the document will expire as ISO 8601:2004 YYYY-MM-DD format.
 *  - document_number: OPTIONAL. Unique document ID that was issued to the End-User. This is used on one document and will change if it is reissued, e.g., a passport number, certificate number, etc. Note: number can be used as an alias for 'document_number' for backward compatibilty purposes but will be deprecated in future releases, implementers are recommended to use document_number.
 *  - serial_number: OPTIONAL. Model of document irrespective of any personalization information (usually physical artefacts and is present before personalization).
 */
export interface DocumentDetailsDLT extends DocumentDetailsBase {
    issuer?: IssuerElectronicRecordDLT;
    personal_number?: string;
}
/** OpenID 'electronic_record' evidence sub-element base data
 *  to be extended with 'attachments' and 'record' elements for blockchain or OpenID Evidence of Electronic Record
 *  The electronic health record can be about a VC, SHC, DGC, FHIR Bundle or single resource (e.g.: a single medical record).
 *  - 'type': always 'electronic_record.
 *  - 'check_details': OPTIONAL. Checks done in relation to the evidence. https://bitbucket.org/openid/ekyc-ida/wiki/identifiers
 *  - 'verifier': legal entity that performed the identity verification on behalf of the OP (OpenID Provider)
 *  - 'time': Time stamp in ISO 8601:2004 format representing the date when it was verified.
 */
export interface EvidenceElectronicRecordBase {
    check_details?: EvidenceCheckData[];
    time?: string;
    type?: 'electronic_record';
    verifier?: VerifierDLT;
}
/** OpenID 'electronic_record' evidence sub-element for blockchain.
 *  The electronic health record can be about a VC, SHC, DGC, FHIR Bundle or single resource (e.g.: a single medical record).
 *  - 'record': 'source' (issuer), 'personal_number' (subject's DID), 'created_at', 'date_of_expiry', 'type' ('idcard' or 'vc', 'shc', 'dgc', 'fhir', etc: see 'Electronic Records' at https://bitbucket.org/openid/ekyc-ida/wiki/identifiers)
 *  - 'attachments': only external attachments are allowed for blockchain certification (no inline data)
 *  - 'type': always 'electronic_record.
 *  - 'validation_method': how the authenticity of the document was determined.
 *  - 'verification_method': how the user was proven to be the owner of the claims.
 *  - 'verifier': legal entity that performed the identity verification on behalf of the OP (OpenID Provider)
 *  - 'time': Time stamp in ISO 8601:2004 format representing the date when it was verified.
 *
 *  NOTE: 'document_details' is not for electronic records (use 'record' instead).
 */
export interface EvidenceElectronicRecordDLT extends EvidenceElectronicRecordBase {
    attachments?: AttachmentExternalDLT[];
    record?: ElectronicRecordDLT;
}
/** OpenID 'electronic_record' evidence sub-element can be about an ID card, VC, SHC, DGC, etc.
 *  - 'type': can be 'idcard', 'vc', 'shc', 'dgc', 'fhir', etc (see 'Electronic Records' at https://bitbucket.org/openid/ekyc-ida/wiki/identifiers)
 *  - 'created_at': is the same as 'validFrom' property in a W3C credential.
 *  - 'date_of_expiry': it the same as 'validUntil' in a W3C credential.
 *  - 'personal_number' is the subject's DID URI, similar to 'holder.id' property in a W3C credential.
 *
 *  NOTE: 'personal_number' (subject DID URI) is not excluded for now?
 */
export interface ElectronicRecordBase {
    type: string;
    created_at?: string;
    date_of_expiry?: string;
    source?: IssuerElectronicRecordBase;
    personal_number?: string;
}
/** OpenID 'electronic_record' evidence sub-element can be about a VC, SHC of DGC.
 *  - 'type': String denoting the type of electronic record. It can be a predefined value (idcard, etc) or 'vc', 'shc', 'dgc', 'fhir', etc (see 'Electronic Records' at https://bitbucket.org/openid/ekyc-ida/wiki/identifiers)
 *  - 'created_at' is the issued property.
 *  - 'date_of_expiry' it the periodEnd.
 *  NOTE:
 *  - 'personal_number' (subject DID) is excluded for now? (it is also the same as the 'holder.id' property in VC).
 */
export interface ElectronicRecordDLT extends ElectronicRecordBase {
    source?: IssuerElectronicRecordDLT;
}
/** Issuer's anonymized information (can be used for research purposes) */
export interface IssuerElectronicRecordBase {
    country_code?: string;
    region?: string;
}
/** It replaces the issuer 'name' by 'id' and 'type' (for blockchain)
 *  and also includes 'country' and 'region' (but not 'postal_code', 'locality' or 'stree_address').
 */
export interface IssuerElectronicRecordDLT extends IssuerElectronicRecordBase {
    id?: string;
    type?: string;
}
/** It may include all elements of the OpenID Connect address Claim. */
export interface IssuerElectronicRecordOpenID extends IssuerElectronicRecordBase {
    name: string;
    formatted?: string;
    street_address?: string;
    locality?: string;
    postal_code?: string;
    jurisdiction?: string;
    country?: string;
}
/** OpenID 'vouch' evidence sub-element */
export interface EvidenceVouchBase {
    check_details?: EvidenceCheckData[];
    time?: string;
    type: 'vouch';
    verifier?: VerifierDLT;
}
/** OpenID 'vouch' evidence sub-element */
export interface EvidenceVouchDLT extends EvidenceVouchBase {
    attachments?: AttachmentExternalDLT[];
    attestation?: VoucherAttestationDLT;
}
/** reference_number is the vouch ID,
 * personal_number is the holder.id (not for blockchain storage)
 * and writerId SHALL be mandatory on blockchain.
 */
export interface VoucherAttestationBase {
    type: string;
    date_of_issuance: string;
    date_of_expiry: string;
    reference_number?: string;
    personal_number?: string;
}
/** 'organization' SHOULD be a mandatory OrganizationId and occupation SHOULD be the PractitionerRoleId */
export interface VoucherIssuerDLT {
    occupation?: string;
    organization?: string;
}
/** 'voucher.organization' SHOULD be a mandatory OrganizationId and
 * 'voucher.occupation 'SHOULD be the PractitionerRoleId
 */
export interface VoucherAttestationDLT extends VoucherAttestationBase {
    voucher?: VoucherIssuerDLT;
}
/** OpenID 'utility_bill' evidence sub-element with 'method', 'time', 'type' and 'date' properties */
export interface EvidenceBillBase extends EvidenceCommonSubElementDLT {
    type: 'utility_bill';
    date?: string;
}
/** OpenID 'utility_bill' evidence sub-element.
 * 'issuerOrg' is the ID of the provider that issued the bill
 * and it can be converted to the 'provider' element by the API.
 * It also contains 'method', 'time', 'type', 'date' and external 'attachments' with 'digest.alg' and 'digest.value'.
 */
export interface EvidenceBillDLT extends EvidenceBillBase {
    issuerOrg: string;
    attachments?: AttachmentExternalDLT[];
}
/** OpenID 'electronic_signature' evidence sub-element
 * 'serial_number' can be the DID of the public key for doing the verification process instead of the serial number of a certificate.
 */
export interface EvidenceElectronicSignatureBase {
    type: 'electronic_signature';
    signature_type: string;
    issuer: string;
    serial_number: string;
    created_at: string;
}
/** OpenID 'electronic_signature' evidence sub-element
 * 'serial_number' can be the DID of the public key for doing the verification process instead of the serial number of a certificate.
 * It also contains 'type', 'signature_type', 'issuer', 'serial_number', 'created_at' and external 'attachments' with 'digest.alg' and 'digest.value'.
 */
export interface EvidenceElectronicSignatureDLT extends EvidenceElectronicSignatureBase {
    attachments?: AttachedSignatureDLT[];
}
export interface EvidenceAsset extends EvidenceVerificationCommon {
    evidence: any;
    meta: {
        did: string;
        digest: DigestResultOpenIdData;
        txn: string;
    };
}
/** Electronic Record types in OpenID + vc, shc, dgc, fhir */
export declare enum EvidenceElectronicRecordTypeUHC {
    vc = "vc",
    shc = "shc",
    dgc = "dgc",
    fhir = "fhir",
    bankAccount = "bank_account",
    utilityAccount = "utility_account",
    mortgageAccount = "mortgage_account",
    loanAccount = "loan_account",
    tax = "tax",
    socialSecurity = "social_security",
    birthRegister = "birth_register",
    adoptionRegister = "adoption_register",
    marriageRegister = "marriage_register",
    education = "education",
    military = "military",
    voterRegister = "voter_register",
    populationRegister = "population_register",
    prisonRecord = "prison_record"
}
/** Documents (physical, non electronic records) to certify the evidence in OpenID + custom UHC document types */
export declare enum EvidenceDocumentTypeUHC {
    bankStatement = "bank_statement",
    utilityStatement = "utility_statement",
    mortgageStatement = "mortgage_statement",
    loanStatement = "loan_statement",
    taxStatement = "tax_statement",
    socialSecurityStatement = "social_security_statement",
    birthCertificate = "birth_certificate",
    adoptionCertificate = "adoption_certificate",
    marriageCertificate = "marriage_certificate",
    educationCertificate = "education_certificate",
    militaryId = "military_id",
    voterId = "voter_id",
    genderCertificate = "gender_certificate",
    firearmPermit = "firearm_permit",
    pilotPermit = "pilot_permit",
    visa = "visa",
    idCard = "idcard",
    passport = "passport",
    drivingPermit = "driving_permit",
    residencePermit = "residence_permit",
    healthInsuranceCard = "health_insurance_card",
    idCardForeigners = "idcard_foreigners",
    idCardEmergency = "emergency_idcard",
    idCardRefugees = "idcard_refugees",
    idCardApatrids = "idcard_apatrids",
    idCardReplacement = "replacement_idcard",
    certificateSuspensionDeportation = "certificate_of_suspension_of_deportation",
    electronicResidencePermit = "erp",
    electronicResidencePermitReplacement = "erp_replacement"
}
/** The Evidence asset can store one evidence per each type; the API can convert them to an array of OpenID Evidences.
 * 'typeHL7' can be 'NNESP', 'DL', etc. and it is the W3C's 'evidenceDocument' property.
 * 'typeOpenID' contains OpenID Evidence types, e.g.: ["document"], ["utility_bill"], ["electronic_signature"] instead of ["DocumentVerification"].
 */
/** The Evidence asset can store one evidence per each type; the API can convert them to an array of OpenID Evidences.
 * 'typeHL7' can be 'NNESP', 'DL', etc. and it is the W3C's 'evidenceDocument' property.
 * 'typeOpenID' contains OpenID Evidence types, e.g.: ["document"], ["utility_bill"], ["electronic_signature"] instead of ["DocumentVerification"].
 */
