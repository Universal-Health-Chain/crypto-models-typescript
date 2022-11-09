/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { CredentialEBSI } from "./credentialEBSI.model";
import { ProofEBSIv2 } from "./Proof.model";
import { CredentialStatusExtensionResolve } from "./credentialCommon.model";

/** To set any data at 'credentialSubject' and an array list of 'proof' elements */
export interface StandardVC extends
    CredentialEBSI
{
    credentialStatus?:  CredentialStatusExtensionResolve;
    proof?:             ProofEBSIv2 | any; // one or more EBSI proofs or other proof types (use ProofFullW3C in that case)
}