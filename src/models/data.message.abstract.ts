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
    id: string;     // same as the JWT 'jti' claim (JWT ID).
    type: string;
    body: any;      // e.g.: JSON:API Primary Document, VC, VP, etc.
    from?: string;
    to?: string[];
    exp?: number;   // instead of the optional JWM 'expires_time'
    nbf?: number;   // instead of the optional JWM 'created_time'
    [key: string]: any;
}

/** Note: setBody must use setContent to update the content.resources and then update the body */
export abstract class DataSecureAbstract {
    protected abstract content: DataCompositionAbstract;
    protected messageJWT: DataJWT;
    protected publicRecipientsJWKs: JWK[] = [];
    public cryptoManager: SecureDataAbstract;
    protected defaultExpiration = 0;
    protected compressPayload: boolean; // 'zip' claim in the JWE protected header to deflate (compress) the payload

    constructor(cryptoManager: SecureDataAbstract, zip?: boolean, defaultExpiration?: number, dataJWT?: DataJWT) {
        this.cryptoManager = cryptoManager;
        if (zip) {
            this.compressPayload = zip;
        }
        if (defaultExpiration) {
            this.defaultExpiration = defaultExpiration;
        }
        if (!dataJWT) {
            dataJWT = {
                header: {alg: 'none'},
                payload: {},
                signature: undefined
            }
        }
        this.messageJWT = dataJWT;
    }    
    
    abstract setPayloadClaim(claim: string, value: any): void;
    abstract getPayloadClaim(claim: string): any;
    abstract setSender(senderDID: string): void;
    abstract getSender(): string | undefined;
    // TODO: setBody must use setContent to update the content.resources and then update the body
    abstract setBody(primaryDocument: PrimaryDocument): void;
    abstract getBody(): any;
    abstract addRecipients(recipientsPublicJWKs: JWK[]): void;
    abstract getRecipientsKIDs(): string[];
    abstract getRecipientPublicJWK(keyID: string): JWK | undefined;
    // async methods
    abstract signAndCompactJWT(privateJWK: JWK): Promise<string>;
    abstract encryptAndCompactJWT(): Promise<string>;
    abstract compactJWT(optionalPrivateSignatureJWK?: JWK, shouldEncrypt?: boolean): Promise<string>;
}


