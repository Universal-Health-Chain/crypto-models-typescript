/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { EvidenceDocumentDLT } from './oidc4ida.document.model';
import { EvidenceElectronicRecordDLT } from './oidc4ida.electronicRecord.model';

/** Note: While 'verification_process' refers to the identity verification process at the OP (operator),
 *  the 'txn' claim refers to a particular OpenID Connect transaction in which the OP attested the user's verified identity data towards a RP.
 *  'evidence' property can contain IdentityDocEvidenceOpenID, BillEvidenceOpenID and QesEvidenceOpenID objects.
 *  'assurance_level' is the Assurance level associated with the End-User Claims in the respective 'verified_claims' and
 *  its value range depends on the respective 'trust_framework' value, e.g.: eidas can have the identity assurance levels 'low', 'substantial' and 'high'.
 */
export interface VerificationCommon {
    trust_framework:        string;                  // REQUIRED. API will set it as 'UHC' or based on the country (e.g.: 'eidas'). It determines what further data is provided to the RP in the verification element.
    assurance_level?:       string;                 // OPTIONAL (e.g.: 'low', 'substantial' and 'high' for eidas). Assurance level associated with the End-User Claims in the respective verified_claims, depending on the trust_framework.
    assurance_process?:     AssuranceProcessDLT;    // OPTIONAL. JSON object representing the assurance process that was followed
    time?:                  string;                 // OPTIONAL. Time stamp in ISO 8601:2004 [ISO8601-2004] YYYY-MM-DDThh:mm[:ss]TZD format representing the date and time when the identity verification process took place.
    verification_process?:  string;                 // OPTIONAL. Unique reference to the identity verification process as performed by the OP (operator). TODO: this is the Operator login?
}

export interface AssuranceProcessDLT {
    policy?:    string; // OPTIONAL: standard or policy that was followed.
    procedure?: string; // OPTIONAL: specific procedure from the policy that was followed.
    status?:    string; // OPTIONAL: current status of the identity verification process.
}

/** Note: While 'verification_process' refers to the identity verification process at the OP (operator),
 *  the 'txn' claim refers to a particular OpenID Connect transaction in which the OP attested the user's verified identity data towards a RP.
 *  'evidence' property can contain IdentityDocEvidenceOpenID, BillEvidenceOpenID and QesEvidenceOpenID objects.
 *  'assurance_level' is the Assurance level associated with the End-User Claims in the respective 'verified_claims' and
 *  its value range depends on the respective 'trust_framework' value, e.g.: eidas can have the identity assurance levels 'low', 'substantial' and 'high'.
 */
export interface VerificationAssuranceOnDLT extends
    VerificationCommon
{
    evidence?:  (EvidenceElectronicRecordDLT | EvidenceDocumentDLT)[];    // OpenID evidence if any (e.g.: physical document verification)
}