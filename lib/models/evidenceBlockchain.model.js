"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvidenceDocumentTypeUHC = exports.EvidenceElectronicRecordTypeUHC = void 0;
/** Electronic Record types in OpenID + vc, shc, dgc, fhir */
var EvidenceElectronicRecordTypeUHC;
(function (EvidenceElectronicRecordTypeUHC) {
    // UHC electronic record types
    EvidenceElectronicRecordTypeUHC["vc"] = "vc";
    EvidenceElectronicRecordTypeUHC["shc"] = "shc";
    EvidenceElectronicRecordTypeUHC["dgc"] = "dgc";
    EvidenceElectronicRecordTypeUHC["fhir"] = "fhir";
    // OpenID electronic record types
    EvidenceElectronicRecordTypeUHC["bankAccount"] = "bank_account";
    EvidenceElectronicRecordTypeUHC["utilityAccount"] = "utility_account";
    EvidenceElectronicRecordTypeUHC["mortgageAccount"] = "mortgage_account";
    EvidenceElectronicRecordTypeUHC["loanAccount"] = "loan_account";
    EvidenceElectronicRecordTypeUHC["tax"] = "tax";
    EvidenceElectronicRecordTypeUHC["socialSecurity"] = "social_security";
    EvidenceElectronicRecordTypeUHC["birthRegister"] = "birth_register";
    EvidenceElectronicRecordTypeUHC["adoptionRegister"] = "adoption_register";
    EvidenceElectronicRecordTypeUHC["marriageRegister"] = "marriage_register";
    EvidenceElectronicRecordTypeUHC["education"] = "education";
    EvidenceElectronicRecordTypeUHC["military"] = "military";
    EvidenceElectronicRecordTypeUHC["voterRegister"] = "voter_register";
    EvidenceElectronicRecordTypeUHC["populationRegister"] = "population_register";
    EvidenceElectronicRecordTypeUHC["prisonRecord"] = "prison_record";
})(EvidenceElectronicRecordTypeUHC = exports.EvidenceElectronicRecordTypeUHC || (exports.EvidenceElectronicRecordTypeUHC = {}));
/** Documents (physical, non electronic records) to certify the evidence in OpenID + custom UHC document types */
var EvidenceDocumentTypeUHC;
(function (EvidenceDocumentTypeUHC) {
    // OpenID document (physical) types
    EvidenceDocumentTypeUHC["bankStatement"] = "bank_statement";
    EvidenceDocumentTypeUHC["utilityStatement"] = "utility_statement";
    EvidenceDocumentTypeUHC["mortgageStatement"] = "mortgage_statement";
    EvidenceDocumentTypeUHC["loanStatement"] = "loan_statement";
    EvidenceDocumentTypeUHC["taxStatement"] = "tax_statement";
    EvidenceDocumentTypeUHC["socialSecurityStatement"] = "social_security_statement";
    EvidenceDocumentTypeUHC["birthCertificate"] = "birth_certificate";
    EvidenceDocumentTypeUHC["adoptionCertificate"] = "adoption_certificate";
    EvidenceDocumentTypeUHC["marriageCertificate"] = "marriage_certificate";
    EvidenceDocumentTypeUHC["educationCertificate"] = "education_certificate";
    EvidenceDocumentTypeUHC["militaryId"] = "military_id";
    EvidenceDocumentTypeUHC["voterId"] = "voter_id";
    EvidenceDocumentTypeUHC["genderCertificate"] = "gender_certificate";
    EvidenceDocumentTypeUHC["firearmPermit"] = "firearm_permit";
    EvidenceDocumentTypeUHC["pilotPermit"] = "pilot_permit";
    EvidenceDocumentTypeUHC["visa"] = "visa";
    EvidenceDocumentTypeUHC["idCard"] = "idcard";
    EvidenceDocumentTypeUHC["passport"] = "passport";
    EvidenceDocumentTypeUHC["drivingPermit"] = "driving_permit";
    EvidenceDocumentTypeUHC["residencePermit"] = "residence_permit";
    // UHC custom document (physical) types
    EvidenceDocumentTypeUHC["healthInsuranceCard"] = "health_insurance_card";
    EvidenceDocumentTypeUHC["idCardForeigners"] = "idcard_foreigners";
    EvidenceDocumentTypeUHC["idCardEmergency"] = "emergency_idcard";
    EvidenceDocumentTypeUHC["idCardRefugees"] = "idcard_refugees";
    EvidenceDocumentTypeUHC["idCardApatrids"] = "idcard_apatrids";
    EvidenceDocumentTypeUHC["idCardReplacement"] = "replacement_idcard";
    EvidenceDocumentTypeUHC["certificateSuspensionDeportation"] = "certificate_of_suspension_of_deportation";
    // These should be 'electronic_record' instead of 'document'?
    EvidenceDocumentTypeUHC["electronicResidencePermit"] = "erp";
    EvidenceDocumentTypeUHC["electronicResidencePermitReplacement"] = "erp_replacement";
})(EvidenceDocumentTypeUHC = exports.EvidenceDocumentTypeUHC || (exports.EvidenceDocumentTypeUHC = {}));
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
