import { SecureDataAbstract } from "./data.secure.abstract";
import { StandardJWE } from "./jwe.model";
import { DataJWT } from "./jwt.model";
import { JWK } from "./jwk.model";

export class CryptoManagerMock extends SecureDataAbstract {
    setClientDB(clientDB: any): void {
        throw new Error("Method not implemented.");
    }

    async sign(dataBytes: Uint8Array, privateSignatureBytes: Uint8Array, alg?: string): Promise<Uint8Array> {
        return new Uint8Array([1, 2, 3]); // mock return value
    }

    async signAndCompactJWT(data: DataJWT, privateJWK: JWK): Promise<string> {
        return "mockedCompactJWS"; // mock return value
    }

    async encrypt(plaintext: string, publicRecipientsJWKs: JWK[]): Promise<string> {
        return "mockedEncryptedData"; // mock return value
    }

    async encryptAndCompactJWT(data: DataJWT, publicRecipientsJWKs: JWK[]): Promise<string> {
        return "mockedCompactJWE"; // mock return value
    }

    async verify(dataBytes: Uint8Array, publicSignatureBytes: Uint8Array, alg?: string): Promise<boolean> {
        return true; // mock return value, signature always valid
    }

    async verifyCompactJWT(data: DataJWT, privateJWK: JWK): Promise<boolean> {
        return true; // mock return value, JWT always valid
    }

    async decrypt(plaintext: string, publicRecipientsJWKs: JWK[]): Promise<string> {
        return "mockedDecryptedData"; // mock return value
    }

    async decryptDataJWE(data: StandardJWE, publicRecipientsJWKs: JWK[]): Promise<string> {
        return "mockedDecryptedJWEData"; // mock return value
    }
}

