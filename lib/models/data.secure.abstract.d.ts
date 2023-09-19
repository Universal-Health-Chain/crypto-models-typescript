import { DataStorageAbstract } from "./data.storage.abstract";
import { IDTypePair } from "./jsonApi.model";
import { StandardJWE } from "./jwe.model";
import { JWK } from "./jwk.model";
import { DataJWT } from "./jwt.model";
export declare abstract class CryptographicBaseAbstract {
    protected publicJWK: JWK;
    protected privateKeyBytes: Uint8Array;
    constructor();
    /** Initializes public and private keys. */
    protected abstract newKeys(seedBytes?: Uint8Array): Promise<JWK>;
    /** Sets the public and private keys to be used. */
    protected setKeys(publicJWK: JWK, privateKeyBytes: Uint8Array): void;
    /** Returns the public JWK */
    getPublicJWK(): JWK;
    /** Returns the public Key ID ('kid') */
    getKeyID(): string;
}
export declare abstract class CryptographicSignature extends CryptographicBaseAbstract {
    /** sign receives and returns bytes */
    abstract sign(dataBytes: Uint8Array, privateSignatureBytes: Uint8Array, alg?: string): Promise<Uint8Array>;
    /** signAndCompactJWT receives JWT data and returns a compact JWS (JWT) */
    abstract signAndCompactJWT(data: DataJWT, privateJWK: JWK): Promise<string>;
    /** verify receives signature bytes and returns true or false */
    abstract verify(dataBytes: Uint8Array, publicSignatureBytes: Uint8Array, alg?: string): Promise<boolean>;
    /** verifyCompactJWT receives JWT data to verify the signature and returns true or false */
    abstract verifyCompactJWT(data: DataJWT, privateJWK: JWK): Promise<boolean>;
}
export declare abstract class CryptographicEncryption extends CryptographicBaseAbstract {
    /** encrypt receives plaintext and returns the ciphertext (stringified data but not a compact JWE) */
    abstract encrypt(plaintext: string, publicRecipientsJWKs: JWK[]): Promise<string>;
    /** encrypt receives JWT data and returns a compact JWE representation */
    abstract encryptAndCompactJWT(data: DataJWT, publicRecipientsJWKs: JWK[]): Promise<string>;
    /** decrypt receives ciphertext and returns the plaintext (stringified data but not an object) */
    abstract decrypt(plaintext: string, publicRecipientsJWKs: JWK[]): Promise<string>;
    /** encrypt receives JWT data and returns a compact JWE representation */
    abstract decryptDataJWE(data: StandardJWE, publicRecipientsJWKs: JWK[]): Promise<string>;
}
/** Implements asynchronous methods
 *  TODO: implement CBOR methods
 */
export declare abstract class SecureDataAbstract {
    clientDB: any;
    storage: DataStorageAbstract;
    signature: CryptographicSignature;
    encryption: CryptographicEncryption;
    protected hmacKeyBytes: Uint8Array;
    protected hmacKeyInfo: IDTypePair;
    constructor(storageTools: DataStorageAbstract, hmacKeyBytes: Uint8Array, hmacKeyInfo: IDTypePair, cryptographicEncryption: CryptographicEncryption, cryptographicSignature: CryptographicSignature);
    /** Method to set the client DB for data storage */
    abstract setClientDB(clientDB: any): void;
}
