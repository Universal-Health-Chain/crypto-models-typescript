/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { VerificationAssuranceOnDLT } from './oidc4ida.verification.model';

/** verified_claims: A single object or an array of objects, each object comprising the following sub-elements:
 *  - claims: REQUIRED. Object that is the container for the Verified Claims about the entity.
 *  - verification: REQUIRED. Object that contains data about the verification process.
 */
export interface VerifiedClaimsAssuranceDLT {
    claims: object; // relevant non-personal claims not included in the verification element
    verification: VerificationAssuranceOnDLT;
}