import { EvidenceDocumentDLT } from './oidc4ida.document.model';
import { EvidenceElectronicRecordDLT } from './oidc4ida.electronicRecord.model';
/** Note: While 'verification_process' refers to the identity verification process at the OP (operator),
 *  the 'txn' claim refers to a particular OpenID Connect transaction in which the OP attested the user's verified identity data towards a RP.
 *  'evidence' property can contain IdentityDocEvidenceOpenID, BillEvidenceOpenID and QesEvidenceOpenID objects.
 *  'assurance_level' is the Assurance level associated with the End-User Claims in the respective 'verified_claims' and
 *  its value range depends on the respective 'trust_framework' value, e.g.: eidas can have the identity assurance levels 'low', 'substantial' and 'high'.
 */
export interface VerificationCommon {
    trust_framework: string;
    assurance_level?: string;
    assurance_process?: AssuranceProcessDLT;
    time?: string;
    verification_process?: string;
}
export interface AssuranceProcessDLT {
    policy?: string;
    procedure?: string;
    status?: string;
}
/** Note: While 'verification_process' refers to the identity verification process at the OP (operator),
 *  the 'txn' claim refers to a particular OpenID Connect transaction in which the OP attested the user's verified identity data towards a RP.
 *  'evidence' property can contain IdentityDocEvidenceOpenID, BillEvidenceOpenID and QesEvidenceOpenID objects.
 *  'assurance_level' is the Assurance level associated with the End-User Claims in the respective 'verified_claims' and
 *  its value range depends on the respective 'trust_framework' value, e.g.: eidas can have the identity assurance levels 'low', 'substantial' and 'high'.
 */
export interface VerificationAssuranceOnDLT extends VerificationCommon {
    evidence?: (EvidenceElectronicRecordDLT | EvidenceDocumentDLT)[];
}
