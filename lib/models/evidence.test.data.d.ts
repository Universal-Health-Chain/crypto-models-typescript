import { EvidenceVerificationCommon } from "./evidenceBlockchain.model";
import { DigestResultOpenIdData } from "./Proof.model";
export interface EvidenceAsset extends EvidenceVerificationCommon {
    evidence: any;
    meta: {
        did: string;
        digest: DigestResultOpenIdData;
        txn: string;
    };
}
