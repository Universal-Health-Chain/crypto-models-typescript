import { DataCompositionAbstract } from "./data.composition.abstract";
import { SecureDataAbstract } from "./data.secure.abstract";
import { PrimaryDocument } from "./jsonApi.model";
import { JWK } from "./jwk.model";
import { DataJWT } from "./jwt.model";
/** Using "exp" for the expiration time and "nbf" for creation time
 *  as in the JWT for Verifiable Credentials and SMART Health Cards.
 *  Note: the JWT "jti" and the DIDComm "id" claims represents the same (they are interchangeable)
 */
export interface MessagePayload {
    id: string;
    type: string;
    body: any;
    from?: string;
    to?: string[];
    exp?: number;
    nbf?: number;
    [key: string]: any;
}
/** Note: setBody must use setContent to update the content.resources and then update the body */
export declare abstract class DataSecureAbstract {
    protected abstract content: DataCompositionAbstract;
    protected messageJWT: DataJWT;
    protected publicRecipientsJWKs: JWK[];
    cryptoManager: SecureDataAbstract;
    protected defaultExpiration: number;
    protected compressPayload: boolean;
    constructor(cryptoManager: SecureDataAbstract, zip?: boolean, defaultExpiration?: number, dataJWT?: DataJWT);
    abstract setPayloadClaim(claim: string, value: any): void;
    abstract getPayloadClaim(claim: string): any;
    abstract setSender(senderDID: string): void;
    abstract getSender(): string | undefined;
    abstract setBody(primaryDocument: PrimaryDocument): void;
    abstract getBody(): any;
    abstract addRecipients(recipientsPublicJWKs: JWK[]): void;
    abstract getRecipientsKIDs(): string[];
    abstract getRecipientPublicJWK(keyID: string): JWK | undefined;
    abstract signAndCompactJWT(privateJWK: JWK): Promise<string>;
    abstract encryptAndCompactJWT(): Promise<string>;
    abstract compactJWT(optionalPrivateSignatureJWK?: JWK, shouldEncrypt?: boolean): Promise<string>;
}
