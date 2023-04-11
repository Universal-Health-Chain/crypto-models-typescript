/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { TypedId } from "./credentialCommon.model";
import { ProofEBSIv2 } from "./proof.model";
import { EvidenceW3C } from "./openidBlockchain.model"

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
	// IssuanceDate is Issued and ExpirationDate is ValidUntil
	issuanceDate?:      string;     // "iat" in JWS: when it is emitted (deprecated by 'issued' in the v2).
	expirationDate?:    string;     // "exp" in JWS; deprecated by 'validUntil' in the v2.
	issued?:            string;     // "iat" in JWS: when it is emitted (deprecates issuanceDate)
	validFrom?:         string ;    // "nbf" in JWS: when it becomes to be usable
	validUntil?:        string ;    // "exp" in JWS; deprecates expirationDate
	context?:           string[];
	iD?:                string;
	type?:              string[];
	credentialSubject?: any; // Subject can be a string, map, slice of maps, struct (Subject or any custom), slice of structs.
	holder?:            TypedId;
	issuer?:            string;
	proof?:             ProofEBSIv2[];
	status?:            TypedId;
	schemas?:           TypedId;
	evidences?:         EvidenceW3C;
	termsOfUse?:        TypedId;
	refreshService?:    TypedId;
	// not using Aries CustomFields
}
  