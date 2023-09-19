import { MessagePayload, DataSecureAbstract } from "./data.message.abstract";
import { PrimaryDocument } from "./jsonApi.model";
import { JWK } from "./jwk.model";
import { DataCompositionAbstract } from "./data.composition.abstract";
export declare class DataSecureMocked extends DataSecureAbstract {
    protected content: DataCompositionAbstract;
    protected payload: MessagePayload;
    setPayloadClaim(claim: string, value: any): void;
    getPayloadClaim(claim: string): any;
    setSender(senderDID: string): void;
    getSender(): string | undefined;
    setBody(primaryDocument: PrimaryDocument): void;
    getBody(): PrimaryDocument;
    addRecipients(recipientsPublicJWKs: JWK[]): void;
    getRecipientsKIDs(): string[];
    getRecipientPublicJWK(keyID: string): JWK | undefined;
    signAndCompactJWT(privateSignatureJWK: JWK): Promise<string>;
    encryptAndCompactJWT(): Promise<string>;
    compactJWT(optionalPrivateSignatureJWK?: JWK, shouldEncrypt?: boolean): Promise<string>;
}
