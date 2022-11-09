/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { TypedId } from "./credentialCommon.model";
import { StandardVC } from "./credentialW3C.model";
import { ProofFullW3C } from "./Proof.model";

// VPBaseWithoutVC does not define "verifiableCredential" (it must to be extended)
export interface VPresentationBaseWithoutVC {
    '@context'?: string[]
    id?: string;
    type?: string[];
    holder?: TypedId;
    proof?: ProofFullW3C[];
}

/** To set any data at 'verifiableCredential' and an array list of 'proof' elements */
export interface StandardVP extends
  VPresentationBaseWithoutVC
{
  verifiableCredential: StandardVC;
}