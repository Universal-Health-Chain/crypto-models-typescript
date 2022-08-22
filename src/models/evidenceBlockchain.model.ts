// import { Holder } from './CredentialModel';
import { AttachedSignatureDLT, DigestResultOpenIdData } from './Proof.model';

// NOTE: evidence.verifier.txn is the blockchain's Tx ID certification in Base58 format

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
    id?:                string;
    type?:              string[];
    verifier?:          string;
    evidenceDocument?:  string;
    subjectPresence?:   string;
    documentPresence?:  string;
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
export type EvidenceObjectDLT =
    EvidenceElectronicRecordDLT     // e.g.: VC, SHC, DGC, FHIR record, etc.
    | EvidenceDocumentDLT           // e.g.: evidence of a physical document
    | EvidenceVouchDLT
    | EvidenceBillDLT
    | EvidenceElectronicSignatureDLT;

/** Attachment OpenID has digest.alg and digest.value (Base64 encoded) but FHIR Attachment not */
export interface AttachmentExternalDLT {
    id?:    string; // URN:UHC:OBSERVATION:UUID:<uuid>?
    type?:  string; // 'FHIR', 'SHC','VC' instead of full MIME type
    digest: DigestResultOpenIdData;  // REQUIRED. JSON object representing a cryptographic hash of the document content.
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
 * onsite (Electronically onsite reading the document’s chip using an authorization certificate and card access number).
 */


/** Note: While 'verification_process' refers to the identity verification process at the OP (operator),
 *  the 'txn' claim refers to a particular OpenID Connect transaction in which the OP attested the user's verified identity data towards a RP.
 *  'evidence' property can contain IdentityDocEvidenceOpenID, BillEvidenceOpenID and QesEvidenceOpenID objects.
 *  'assurance_level' is the Assurance level associated with the End-User Claims in the respective 'verified_claims' and
 *  its value range depends on the respective 'trust_framework' value, e.g.: eidas can have the identity assurance levels 'low', 'substantial' and 'high'.
 */
export interface EvidenceVerificationCommon {
    trust_framework?:       string;                 // REQUIRED for OpenID but not stored on blockchain. API will set it based on the (country) (e.g.: 'eidas'). It determines what further data is provided to the RP in the verification element.
    assurance_level?:       string;                 // OPTIONAL (e.g.: 'low', 'substantial' and 'high' for eidas). Assurance level associated with the End-User Claims in the respective verified_claims, depending on the trust_framework.
    assurance_process?:     AssuranceProcessDLT;    // OPTIONAL. JSON object representing the assurance process that was followed
    time?:                  string;                 // OPTIONAL. Time stamp in ISO 8601:2004 [ISO8601-2004] YYYY-MM-DDThh:mm[:ss]TZD format representing the date and time when the identity verification process took place.
    verification_process?:  string;                 // OPTIONAL. Unique reference to the identity verification process as performed by the OP (operator). TODO: this is the Operator login?
}

/** Note: While 'verification_process' refers to the identity verification process at the OP (operator),
 *  the 'txn' claim refers to a particular OpenID Connect transaction in which the OP attested the user's verified identity data towards a RP.
 *  'evidence' property can contain IdentityDocEvidenceOpenID, BillEvidenceOpenID and QesEvidenceOpenID objects.
 *  'assurance_level' is the Assurance level associated with the End-User Claims in the respective 'verified_claims' and
 *  its value range depends on the respective 'trust_framework' value, e.g.: eidas can have the identity assurance levels 'low', 'substantial' and 'high'.
 */
export interface EvidenceVerificationOnDLT extends
    EvidenceVerificationCommon
{
    evidence?:  EvidenceObjectDLT[];    // OpenID evidence if any (e.g.: physical document verification)
}

export interface AssuranceProcessDLT {
    policy?:    string; // OPTIONAL: standard or policy that was followed.
    procedure?: string; // OPTIONAL: specific procedure from the policy that was followed.
    status?:    string; // OPTIONAL: current status of the identity verification process.
}

/** Predefined method values are given in Verification Methods.
 * - pipp (Physical In-Person Proofing)
 * - sripp (Supervised remote In-Person Proofing)
 * - eid (Online verification of an electronic ID card)
 * - uripp (Unsupervised remote in-person proofing with video capture of the ID document, user self-portrait video and liveness checks).
 */
export interface EvidenceDocumentDLT extends
    EvidenceCommonSubElementDLT  // method, time
{
    type:                 'document';               // REQUIRED. Value MUST be set to 'document'. Note: id_document is an alias for document for backward compatibilty purposes but will be deprecated in future releases, implementers are recommended to use document.
    verifier:             VerifierDLT;              // txn is required: legal entity that performed the identity verification on behalf of the OP.
    attachments?:         AttachmentExternalDLT;    // OPTIONAL. Representing proofs of attachments like photocopies of documents or certificates.
    validation_method?:   ValidationMethodDLT;      // OPTIONAL. JSON object representing how the authenticity of the document was determined.
    verification_method?: VerificationMethodDLT;    // OPTIONAL. JSON object representing how the user was proven to be the owner of the claims.
    document_details?:    DocumentDetailsDLT;       // OPTIONAL. Object representing the id document used to perform the identity verification.
}

export interface EvidenceCommonSubElementDLT {
    method:               string;                   // REQUIRED. The method used to verify it: pipp (Physical In-Person Proofing), sripp (Supervised remote In-Person Proofing), eid (Online verification of an electronic ID card), uripp (Unsupervised remote in-person proofing with video capture of the ID document, user self-portrait video and liveness checks). Predefined values are given in Verification Methods
    time?:                string;                   // OPTIONAL. Time stamp in ISO 8601:2004 [ISO8601-2004] YYYY-MM-DDThh:mm[:ss]TZD format representing the date when it was verified
}

export interface ValidationMethodDLT {
    type:       string; // REQUIRED. string;representing the method used to check the authenticity of the document. For information on predefined validation_method values see Section 14.
    policy?:    string; // OPTIONAL. string;representing the standard or policy that was followed.
    procedure?: string; // OPTIONAL. string;representing a specific procedure from the policy that was followed.
    status?:    string; // OPTIONAL. string;representing the current status of the validation.
}

export interface VerificationMethodDLT {
    type:       string; // REQUIRED. string;representing the method used to verify that the user is the person that the document refers to. For information on predefined verification_method values see Section 14.
    policy?:    string; // OPTIONAL. string;representing the standard or policy that was followed.
    procedure?: string; // OPTIONAL. string;representing a specific procedure from the policy that was followed.
    status?:    string; // OPTIONAL. string;representing the current status of the verification.
}

/** 'organization' is the organization ID which performed the verification on behalf of the OP */
export interface VerifierDLT {
    organization:   string; // organization ID which performed the verification on behalf of the OP.
    txn:            string; // evidence transaction ID (base58) for audit.
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
    type:               string;     // REQUIRED. Standardized values are defined in the Identity Documents section. The OP MAY use other than the predefined values in which case the RPs will either be unable to process the assertion, just store this value for audit purposes, or apply bespoken business logic to it.
    date_of_issuance:   string;     // REQUIRED. If this attribute exists for the particular type of document. The date the document was issued as ISO 8601:2004 YYYY-MM-DD format.
    date_of_expiry:     string;     // REQUIRED. If this attribute exists for the particular type of document. The date the document will expire as ISO 8601:2004 YYYY-MM-DD format.
    document_number?:   string;     // OPTIONAL. Unique document ID that was issued to the End-User. This is used on one document and will change if it is reissued, e.g., a passport number, certificate number, etc. Note: number can be used as an alias for 'document_number' for backward compatibilty purposes but will be deprecated in future releases, implementers are recommended to use document_number.
    serial_number?:     string;     // OPTIONAL. Model of document irrespective of any personalization information (usually physical artefacts and is present before personalization).
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
export interface DocumentDetailsDLT extends
    DocumentDetailsBase // type, date_of_issuance, date_of_expiry, document_number, serial_number (model of the document irrespective of any personalization information)
{
    issuer?:            IssuerElectronicRecordDLT;  // OPTIONAL. Object containing information about the issuer of this document.
    personal_number?:   string;                     // OPTIONAL. Holder.id / subjectId
}


/** OpenID 'electronic_record' evidence sub-element base data
 *  to be extended with 'attachments' and 'record' elements for blockchain or OpenID Evidence of Electronic Record
 *  The electronic health record can be about a VC, SHC, DGC, FHIR Bundle or single resource (e.g.: a single medical record).
 *  - 'type': always 'electronic_record.
 *  - 'validation_method': how the authenticity of the document was determined.
 *  - 'verification_method': how the user was proven to be the owner of the claims.
 *  - 'verifier': legal entity that performed the identity verification on behalf of the OP (OpenID Provider)
 *  - 'time': Time stamp in ISO 8601:2004 format representing the date when it was verified.
 */
 export interface EvidenceElectronicRecordBase {
    type?:                'electronic_record';      // REQUIRED but not stored on blockchain in case of FHIR resources (they always are 'electronic_records').
    validation_method?:   ValidationMethodDLT;      // OPTIONAL. JSON object representing how the authenticity of the document was determined.
    verification_method?: VerificationMethodDLT;    // OPTIONAL. JSON object representing how the user was proven to be the owner of the claims.
    verifier?:            VerifierDLT;              // OPTIONAL. A JSON object denoting the legal entity that performed the identity verification on behalf of the OP.
    time?:                string;                   // OPTIONAL. Time stamp in ISO 8601:2004 [ISO8601-2004] YYYY-MM-DDThh:mm[:ss]TZD format representing the date when it was verified
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
export interface EvidenceElectronicRecordDLT extends
    EvidenceElectronicRecordBase    // 'type', 'validation_method', 'verification_method', 'verifier', 'time'
{
    attachments?:   AttachmentExternalDLT[];  // OPTIONAL. Array of JSON objects representing attachments like photocopies of documents or certificates.
    record?:        ElectronicRecordDLT;      // JSON object representing the id document used to perform the id verification
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
    type:               string;             // REQUIRED. string;denoting the type of electronic record. See https://bitbucket.org/openid/ekyc-ida/wiki/identifiers
    created_at?:        string;             // OPTIONAL. The time the record was created as ISO 8601:2004 [ISO8601-2004] YYYY-MM-DDThh:mm[:ss]TZD format    date_of_expiry?:    string; // REQUIRED. If this attribute exists for the particular type of document. The date the document will expire as ISO 8601:2004 YYYY-MM-DD format.
    date_of_expiry?:    string;             // OPTIONAL. The date the evidence will expire as ISO 8601:2004 [ISO8601-2004] YYYY-MM-DD format.
    source?:            IssuerElectronicRecordBase; // OPTIONAL. Issuer as source of the record (can have jurisdiction and )
    personal_number?:   string;                     // OPTIONAL. Subject DID URI (it can be also the holder ID).
}

/** OpenID 'electronic_record' evidence sub-element can be about a VC, SHC of DGC.
 *  - 'type': String denoting the type of electronic record. It can be a predefined value (idcard, etc) or 'vc', 'shc', 'dgc', 'fhir', etc (see 'Electronic Records' at https://bitbucket.org/openid/ekyc-ida/wiki/identifiers)
 *  - 'created_at' is the issued property.
 *  - 'date_of_expiry' it the periodEnd.
 *  NOTE:
 *  - 'personal_number' (subject DID) is excluded for now? (it is also the same as the 'holder.id' property in VC).
 */
export interface ElectronicRecordDLT extends
    ElectronicRecordBase    // 'type', 'personal_number', 'created_at', 'date_of_expiry'
{
    source?: IssuerElectronicRecordDLT; // OPTIONAL. Issuer as source of the record (API can set the name and jurisdiction for the OpenID source element)
}

// TODO: IssuerElectronicRecordOpenID with personal_number

/** Issuer's anonymized information (can be used for research purposes) */
export interface IssuerElectronicRecordBase {
    country_code?:  string; // ISO 3166/ICAO 3-letter codes [ICAO-Doc9303]
    region?:        string; // ISO: State, province, prefecture, or region component.
    // postal_code?:string; // Zip code or postal code component.
}

/** It replaces the issuer 'name' by 'id' and 'type' (for blockchain)
 *  and also includes 'country' and 'region' (but not 'postal_code', 'locality' or 'stree_address').
 */
export interface IssuerElectronicRecordDLT extends
    IssuerElectronicRecordBase
{
    id?:            string; // custom UHC property instead of 'name'
    type?:          string; // custom UHC property
}

/** It may include all elements of the OpenID Connect address Claim. */
export interface IssuerElectronicRecordOpenID extends
    IssuerElectronicRecordBase
{
    name:               string; // instead of blockchain's id and type.
    formatted?:         string; // Full mailing address.
    street_address?:    string; // MAY include house number, street name, Post Office Box, and multi-line extended street address information. This field MAY contain multiple lines, separated by newlines. Newlines can be represented either as a carriage return/line feed pair ("\r\n") or as a single line feed character ("\n")
    locality?:          string; // City or locality component.
    postal_code?:       string; // Zip code or postal code component.
    jurisdiction?:      string;
    country?:           string; // Country name from 'country_code' ISO.

}

/** OpenID 'vouch' evidence sub-element */
export interface EvidenceVouchBase {
    type:                   'vouch';                // REQUIRED. Value MUST be set to 'vouch'.
    validation_method?:     ValidationMethodDLT;    // OPTIONAL. Object representing how the authenticity of the document was determined.
    verification_method?:   VerificationMethodDLT;  // OPTIONAL. Object representing how the user was proven to be the owner of the claims.
    verifier?:              VerifierDLT;            // OPTIONAL. Object denoting the legal entity that performed the identity verification on behalf of the OP.
    time?:                  string;                 // OPTIONAL. Time stamp in ISO 8601:2004 [ISO8601-2004] YYYY-MM-DDThh:mm[:ss]TZD format representing the date when it was verified
}

/** OpenID 'vouch' evidence sub-element */
export interface EvidenceVouchDLT extends
    EvidenceVouchBase   // type, validation_method, verification_method, verifier, time
{
    attachments?:   AttachmentExternalDLT[];    // OPTIONAL. Array of JSON objects representing attachments like photocopies of documents or certificates.
    attestation?:   VoucherAttestationDLT;      // OPTIONAL. Object representing the attestation that is the basis of the vouch.
}

/** reference_number is the vouch ID,
 * personal_number is the holder.id (not for blockchain storage)
 * and writerId SHALL be mandatory on blockchain.
 */
 export interface VoucherAttestationBase {
    type:               string; // REQUIRED. Type of vouch. See https://bitbucket.org/openid/ekyc-ida/wiki/identifiers
    date_of_issuance:   string; // REQUIRED. If this attribute exists for the particular type of document. The date the document was issued as ISO 8601:2004 YYYY-MM-DD format.
    date_of_expiry:     string; // REQUIRED. If this attribute exists for the particular type of document. The date the document will expire as ISO 8601:2004 YYYY-MM-DD format.
    reference_number?:  string; // OPTIONAL. Vouch ID.
    personal_number?:   string; // OPTIONAL. holder.id or subjecId (in OpenID it can be a national identification number, personal identity number, citizen number, social security number, driver number, account number, customer number, licensee number, etc.)
}

/** 'organization' SHOULD be a mandatory OrganizationId and occupation SHOULD be the PractitionerRoleId */
export interface VoucherIssuerDLT {
    occupation?:    string; // OPTIONAL. Occupation or other authority of the person giving the vouch/reference.
    organization?:  string; // OPTIONAL. Name of the organization the voucher is representing
}

/** 'voucher.organization' SHOULD be a mandatory OrganizationId and
 * 'voucher.occupation 'SHOULD be the PractitionerRoleId
 */
export interface VoucherAttestationDLT extends
    VoucherAttestationBase  // type, date_of_issuance, date_of_expiry, reference_number
{
    voucher?:   VoucherIssuerDLT;   // OPTIONAL. Object containing information about the entity giving the vouch. This object consists of the following properties:
}

/** OpenID 'utility_bill' evidence sub-element with 'method', 'time', 'type' and 'date' properties */
export interface EvidenceBillBase extends
    EvidenceCommonSubElementDLT  // method, time
{
    type:           'utility_bill';             // REQUIRED: fixed to 'utility_bill'.
    // provider:    ProviderOpenID;             // REQUIRED: object identifying the respective provider that issued the bill.
    date?:          string;                     // date when this bill was issued: ISO 8601:2004 YYYY-MM-DD formatted string.
}

/** OpenID 'utility_bill' evidence sub-element.
 * 'issuerOrg' is the ID of the provider that issued the bill
 * and it can be converted to the 'provider' element by the API.
 * It also contains 'method', 'time', 'type', 'date' and external 'attachments' with 'digest.alg' and 'digest.value'.
 */
export interface EvidenceBillDLT extends
    EvidenceBillBase  // 'method', 'time', 'type', 'date' and external 'attachments' with 'digest.alg' and 'digest.value'
{
    // provider:    ProviderOpenID;             // REQUIRED: object identifying the respective provider that issued the bill.
    issuerOrg:      string;                     // REQUIRED: ID of the provider that issued the bill.
    attachments?:   AttachmentExternalDLT[];    // OPTIONAL. Array of JSON objects representing attachments like photocopies of documents or certificates.
}

/** OpenID 'electronic_signature' evidence sub-element
 * 'serial_number' can be the DID of the public key for doing the verification process instead of the serial number of a certificate.
 */
export interface EvidenceElectronicSignatureBase{
    type:           'electronic_signature'; // REQUIRED: Fixed to 'electronic_signature'
    signature_type: string;                 // REQUIRED. Type of signature used as evidence. The value range might be restricted by the respective trust framework.
    issuer:         string;                 // REQUIRED. Certification authority that issued the signer's certificate.
    serial_number:  string;                 // REQUIRED. DID#KID or Serial number of the certificate used to sign.
    created_at:     string;                 // REQUIRED. The time the signature was created as ISO 8601:2004 YYYY-MM-DDThh:mm:ss±hh format
}

/** OpenID 'electronic_signature' evidence sub-element
 * 'serial_number' can be the DID of the public key for doing the verification process instead of the serial number of a certificate.
 * It also contains 'type', 'signature_type', 'issuer', 'serial_number', 'created_at' and external 'attachments' with 'digest.alg' and 'digest.value'.
 */
export interface EvidenceElectronicSignatureDLT extends
    EvidenceElectronicSignatureBase // 'type', 'signature_type', 'issuer', 'serial_number', 'created_at'
{
    attachments?:   AttachedSignatureDLT[];   // OPTIONAL. Array of JSON objects containing signatures, e.g. 'jws' or 'Ed25519' signature types.
}

/** Electronic Record types in OpenID + vc, shc, dgc, fhir */
export enum EvidenceElectronicRecordTypeUHC {
    // UHC electronic record types
    vc = 'vc',      // Verifiable Credential record.
    shc = 'shc',    // Smart Health Card record.
    dgc = 'dgc',    // EU Digital Green Certificate record.
    fhir = 'fhir',  // FHIR record.

    // OpenID electronic record types
    bankAccount = 'bank_account',               // https: //openid.net/record/bank_account 	        A record of a bank account from a recognized banking institution.
    utilityAccount = 'utility_account',         // https: //openid.net/record/utility_account 	    A record of an account from a recognized utility provider.
    mortgageAccount = 'mortgage_account',       // https: //openid.net/record/mortgage_account 	    A record of a mortgage from a recognized mortgage provider.
    loanAccount = 'loan_account',               // https: //openid.net/record/loan_account 	        A record of a loan from a recognized loan provider.
    tax = 'tax',                                // https: //openid.net/record/tax 	                A record from a country's tax authority.
    socialSecurity = 'social_security',         // https: //openid.net/record/social_security 	    A record from a country's social security authority.
    birthRegister = 'birth_register',           // https://openid.net/record/birth_register 	    A record from an official register of births.
    adoptionRegister = 'adoption_register',     // https: //openid.net/record/adoption_register 	A record from an official register of adoptions.
    marriageRegister  = 'marriage_register',    // https: //openid.net/record/marriage_register 	A record from an official register of marriages.
    education = 'education',                    // https: //openid.net/record/education 	        A authoritative record of a person having received specific education or has passed a test or series of tests.
    military = 'military',                      // https: //openid.net/record/military 	            A military personnel record.
    voterRegister = 'voter_register',           // https: //openid.net/record/voter_register        A record from an official register of voters.

    populationRegister = 'population_register', // https://openid.net/record/population_register 	A record from an official population register.
    prisonRecord = 'prison_record',             // https: //openid.net/record/prison_record 	    A record from an institution or authority for the confinement of persons who have been deprived of their liberty following a criminal conviction by a judicial process.
}

/** Documents (physical, non electronic records) to certify the evidence in OpenID + custom UHC document types */
export enum EvidenceDocumentTypeUHC {
    // OpenID document (physical) types
    bankStatement = 'bank_statement',                       // https://openid.net/document/bank_statement 	        Bank statement from a recognized banking institution.
    utilityStatement = 'utility_statement',                 // https://openid.net/document/utility_statement 	    Statement from a recognized utility provider.
    mortgageStatement = 'mortgage_statement',               // https://openid.net/document/mortgage_statement 	    Statement from a recognized mortgage provider.
    loanStatement = 'loan_statement',                       // https://openid.net/document/loan_statement 	        Statement from a recognized loan provider.
    taxStatement = 'tax_statement',                         // https://openid.net/document/tax_statement 	        Statement from a country's tax authority.
    socialSecurityStatement = 'social_security_statement',  // https://openid.net/document/social_security_statement Statement from a country's social security authority.
    birthCertificate = 'birth_certificate',                 // https://openid.net/document/birth_certificate        Official document certifying the circumstances of a birth.
    adoptionCertificate = 'adoption_certificate',           // https://openid.net/document/adoption_certificate 	Official document certifying the circumstances of an adoption.
    marriageCertificate = 'marriage_certificate',           // https://openid.net/document/marriage_certificate 	Official document certifying the circumstances of a marriage.
    educationCertificate = 'education_certificate',         // https://openid.net/document/education_certificate 	Document certifying that a person has received specific education or has passed a test or series of tests.
    militaryId = 'military_id',                             // https://openid.net/document/military_id 	            An official military identity document issued by a country's government to its service personnel.
    voterId = 'voter_id',                                   // https://openid.net/document/voter_id 	            An official voter identity document.

    genderCertificate = 'gender_certificate',               // https://openid.net/document/gender_certificate       Official document certifying that a person has satisfied the criteria for legal recognition in the acquired gender.
    firearmPermit = 'firearm_permit',                       // https://openid.net/document/firearm_permit           Official document permitting an individual to use or own a firearm.
    pilotPermit = 'pilot_permit',                           // https://openid.net/document/pilot_permit             Official document permitting an individual to operate an aircraft.
    visa = 'visa',                                          // https://openid.net/document/visa                     Document that grants the holder official permission to enter, leave or stay in a country.

    idCard = 'idcard',                                      // https://openid.net/document/idcard 	An identity document issued by a country's government for the purpose of identifying a citizen.
    passport = 'passport',                                  // https://openid.net/document/passport             A passport is a travel document, usually issued by a country's government, that certifies the identity and nationality of its holder primarily for the purpose of international travel. (see OxfordPassport).
    drivingPermit = 'driving_permit',   	                // https://openid.net/document/driving_permit       Official document permitting an individual to operate motorized vehicles. In the absence of a formal identity document, a driver's license may be accepted in many countries for identity verification.
    residencePermit = 'residence_permit',                   // https://openid.net/document/residence_permit     Official document permitting an individual to reside within a particular jurisdiction.

    // UHC custom document (physical) types
    healthInsuranceCard  = 'health_insurance_card',         // from JP
    idCardForeigners = 'idcard_foreigners',                 // from DE
    idCardEmergency = 'emergency_idcard',                   // from DE: ID Card issued by a government to foreign nationals as passports replacement.
    idCardRefugees = 'idcard_refugees',                     // from DE: ID Card issued by a government to refugees as passports replacement.
    idCardApatrids = 'idcard_apatrids',                     // from DE: ID Card issued by a government to refugees as passports replacement.
    idCardReplacement = 'replacement_idcard',               // from DE: ID Card replacement document issued by a government to foreign nationals
    certificateSuspensionDeportation = 'certificate_of_suspension_of_deportation', 	// from DE: identity document issued to refugees in case of suspension of deportation that are marked as "id card replacement".

    // These should be 'electronic_record' instead of 'document'?
    electronicResidencePermit = 'erp',                          // from DE
    electronicResidencePermitReplacement = 'erp_replacement',   // from DE
}

// ------------------------


/** The Evidence asset can store one evidence per each type; the API can convert them to an array of OpenID Evidences.
 * 'typeHL7' can be 'NNESP', 'DL', etc. and it is the W3C's 'evidenceDocument' property.
 * 'typeOpenID' contains OpenID Evidence types, e.g.: ["document"], ["utility_bill"], ["electronic_signature"] instead of ["DocumentVerification"].
 */
/*
 export interface EvidenceUHC extends
 EvidenceAssetOnDLT
{
 id?:    string; // the evidence id is not stored within the asset because the blockchain stores it internally
}
*/

/** The Evidence asset can store one evidence per each type; the API can convert them to an array of OpenID Evidences.
 * 'typeHL7' can be 'NNESP', 'DL', etc. and it is the W3C's 'evidenceDocument' property.
 * 'typeOpenID' contains OpenID Evidence types, e.g.: ["document"], ["utility_bill"], ["electronic_signature"] instead of ["DocumentVerification"].
 */
/*
export interface EvidenceAssetOnDLT extends
    EvidenceVerificationBase,    // trust_framework, assurance_level, assurance_process, time, verification_process
    CertificationDLT           // 'canAlg', 'holder', 'issuerOrg', 'typeHL7', 'time' and 'writerDID' or 'writer' (with id and type).
{
 // documentPresence?:   string; // It is the same as the Voucher Attestation 'type' property ('written_attestation' or 'digital_attestation') or Document / Bill 'method' property (pipp, sripp, eid, uripp), instead of simply 'Physical' or 'Digital'
 // evidence:            EvidenceObjectDLT   // instead of an array it is a concrete evidence
 evidence: {
     eRecord?:   EvidenceElectronicRecordDLT     // e.g.: VC, SHC, DGC, FHIR record, etc., it has 'type', 'validation_method', 'verification_method', 'verifier', 'time'
     doc?:       EvidenceDocumentDLT             // (physical) document does not have attachments. It has 'document_details' ('issuer', 'type', 'date_of_issuance', 'date_of_expiry', 'document_number', 'serial_number' as model of the document) and 'type', 'issuer', 'country', 'validFrom', 'validUntil'
     vouch?:     EvidenceVouchDLT
     bill?:      EvidenceBillDLT                 // providerId and date when the bill was issued
     eSign?:     EvidenceElectronicSignatureDLT  // this is a proof?
 };
}*/