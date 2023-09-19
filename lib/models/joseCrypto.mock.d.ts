import { SecureDataAbstract } from "./data.secure.abstract";
import { StandardJWE } from "./jwe.model";
import { DataJWT } from "./jwt.model";
import { JWK } from "./jwk.model";
export declare class CryptoManagerMock extends SecureDataAbstract {
    setClientDB(clientDB: any): void;
    sign(dataBytes: Uint8Array, privateSignatureBytes: Uint8Array, alg?: string): Promise<Uint8Array>;
    signAndCompactJWT(data: DataJWT, privateJWK: JWK): Promise<string>;
    encrypt(plaintext: string, publicRecipientsJWKs: JWK[]): Promise<string>;
    encryptAndCompactJWT(data: DataJWT, publicRecipientsJWKs: JWK[]): Promise<string>;
    verify(dataBytes: Uint8Array, publicSignatureBytes: Uint8Array, alg?: string): Promise<boolean>;
    verifyCompactJWT(data: DataJWT, privateJWK: JWK): Promise<boolean>;
    decrypt(plaintext: string, publicRecipientsJWKs: JWK[]): Promise<string>;
    decryptDataJWE(data: StandardJWE, publicRecipientsJWKs: JWK[]): Promise<string>;
}
