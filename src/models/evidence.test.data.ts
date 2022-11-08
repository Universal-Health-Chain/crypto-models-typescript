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
