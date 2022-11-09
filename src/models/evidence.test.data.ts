/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { EvidenceVerificationCommon } from "./evidenceBlockchain.model";
import { DigestResultOpenIdData } from "./Proof.model";

// assetId = did
export interface EvidenceAsset extends 
    EvidenceVerificationCommon
{
    evidence: any;
    meta: {
        did: string;
        digest: DigestResultOpenIdData;
        txn: string;
    }
}
