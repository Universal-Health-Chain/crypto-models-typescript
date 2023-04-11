"use strict";
/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
export interface EvidenceAsset extends
    VerificationCommon
{
    evidence: any;
    meta: {
        did: string;
        digest: DigestResultOpenIdData;
        txn: string;
    }
}*/
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
