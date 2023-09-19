"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSecureMocked = void 0;
const data_message_abstract_1 = require("./data.message.abstract");
// Mock version of the DIDCommMessage for testing
class DataSecureMocked extends data_message_abstract_1.DataSecureAbstract {
    constructor() {
        super(...arguments);
        this.payload = {
            id: "",
            type: "",
            body: {}
        };
    }
    setPayloadClaim(claim, value) {
        this.payload[claim] = value;
    }
    getPayloadClaim(claim) {
        return this.payload[claim];
    }
    setSender(senderDID) {
        this.payload.from = senderDID;
    }
    getSender() {
        return this.payload.from;
    }
    setBody(primaryDocument) {
        this.payload.body = primaryDocument;
    }
    getBody() {
        return this.payload.body;
    }
    addRecipients(recipientsPublicJWKs) {
        this.payload.to = recipientsPublicJWKs.map(jwk => jwk.kid);
    }
    getRecipientsKIDs() {
        return this.payload.to || [];
    }
    getRecipientPublicJWK(keyID) {
        return this.publicRecipientsJWKs.find(jwk => jwk.kid === keyID);
    }
    signAndCompactJWT(privateSignatureJWK) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cryptoManager.signature.signAndCompactJWT(this.messageJWT, privateSignatureJWK);
        });
    }
    encryptAndCompactJWT() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cryptoManager.encryption.encryptAndCompactJWT(this.messageJWT, this.publicRecipientsJWKs);
        });
    }
    compactJWT(optionalPrivateSignatureJWK, shouldEncrypt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (optionalPrivateSignatureJWK) {
                yield this.signAndCompactJWT(optionalPrivateSignatureJWK);
            }
            let result;
            if (shouldEncrypt) {
                result = yield this.encryptAndCompactJWT();
            }
            else {
                result = (yield mockedCompactDataJWT(this.messageJWT));
            }
            return result;
        });
    }
}
exports.DataSecureMocked = DataSecureMocked;
function mockedCompactDataJWT(dataJWT) {
    return __awaiter(this, void 0, void 0, function* () {
        return "B64Url(headerBytes).B64Url(payloadBytes).B64Url(signatureBytes)";
    });
}
//# sourceMappingURL=data.message.abstract.mock.js.map