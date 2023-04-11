import { TypedId } from "./credentialCommon.model";
import { ProofEBSIv2 } from "./proof.model";
import { EvidenceW3C } from "./openidBlockchain.model";
/** CredentialEBSI uses EBSI proofs (JWS) and both W3C Credential v1 and v2 'iat', 'nbf' and 'exp'
 *  see https://www.w3.org/TR/vc-data-model/
 *  Note 1: It is expected that the next version of the specification will add the "validFrom" property
 *  and will deprecate the "issuanceDate" property in favor of the new "issued" property.
 *  Implementers are advised that the "validFrom" and "issued" properties are reserved and use for any other purpose is discouraged.
 *  Note 2: It is expected that the next version of the specification will add the "validUntil" property in a way that deprecates,
 *  but preserves backwards compatibility with the "expirationDate" property.
 *  Implementers are advised that the "validUntil" property is reserved and its use for any other purpose is discouraged.
 */
export interface CredentialEBSI {
    issuanceDate?: string;
    expirationDate?: string;
    issued?: string;
    validFrom?: string;
    validUntil?: string;
    context?: string[];
    iD?: string;
    type?: string[];
    credentialSubject?: any;
    holder?: TypedId;
    issuer?: string;
    proof?: ProofEBSIv2[];
    status?: TypedId;
    schemas?: TypedId;
    evidences?: EvidenceW3C;
    termsOfUse?: TypedId;
    refreshService?: TypedId;
}
