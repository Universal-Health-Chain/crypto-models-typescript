import { MessagePayload, DataSecureAbstract } from "./data.message.abstract";
import { PrimaryDocument } from "./jsonApi.model";
import { DataJWT } from "./jwt.model";
import { JWK } from "./jwk.model";
import { DataCompositionAbstract } from "./data.composition.abstract";

// Mock version of the DIDCommMessage for testing
export class DataSecureMocked extends DataSecureAbstract {
    protected content: DataCompositionAbstract;
    protected payload: MessagePayload = {
        id: "",
        type: "",
        body: {}
    };

    setPayloadClaim(claim: string, value: any): void {
        this.payload[claim] = value;
    }

    getPayloadClaim(claim: string): any {
        return this.payload[claim];
    }

    setSender(senderDID: string): void {
        this.payload.from = senderDID;
    }

    getSender(): string | undefined {
        return this.payload.from;
    }

    setBody(primaryDocument: PrimaryDocument): void {
        this.payload.body = primaryDocument;
    }

    getBody(): PrimaryDocument {
        return this.payload.body as PrimaryDocument;
    }

    addRecipients(recipientsPublicJWKs: JWK[]): void {
        this.payload.to = recipientsPublicJWKs.map(jwk => jwk.kid);
    }

    getRecipientsKIDs(): string[] {
        return this.payload.to || [];
    }

    getRecipientPublicJWK(keyID: string): JWK | undefined {
        return this.publicRecipientsJWKs.find(jwk => jwk.kid === keyID);
    }

    async signAndCompactJWT(privateSignatureJWK: JWK): Promise<string> {
        return this.cryptoManager.signature.signAndCompactJWT(this.messageJWT, privateSignatureJWK);
    }

    async encryptAndCompactJWT(): Promise<string> {
        return this.cryptoManager.encryption.encryptAndCompactJWT(this.messageJWT, this.publicRecipientsJWKs);
    }

    async compactJWT(optionalPrivateSignatureJWK?: JWK, shouldEncrypt?: boolean): Promise<string> {
        if (optionalPrivateSignatureJWK) {
            await this.signAndCompactJWT(optionalPrivateSignatureJWK);
        }

        let result: string;
        if (shouldEncrypt) {
            result = await this.encryptAndCompactJWT();
        } else {
            result = await mockedCompactDataJWT(this.messageJWT) as unknown as string;
        }

        return result;
    }    
}

async function mockedCompactDataJWT(dataJWT: DataJWT): Promise<string> {
    return "B64Url(headerBytes).B64Url(payloadBytes).B64Url(signatureBytes)";
}