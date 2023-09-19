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
exports.CryptoManagerMock = void 0;
const data_secure_abstract_1 = require("./data.secure.abstract");
class CryptoManagerMock extends data_secure_abstract_1.SecureDataAbstract {
    setClientDB(clientDB) {
        throw new Error("Method not implemented.");
    }
    sign(dataBytes, privateSignatureBytes, alg) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Uint8Array([1, 2, 3]); // mock return value
        });
    }
    signAndCompactJWT(data, privateJWK) {
        return __awaiter(this, void 0, void 0, function* () {
            return "mockedCompactJWS"; // mock return value
        });
    }
    encrypt(plaintext, publicRecipientsJWKs) {
        return __awaiter(this, void 0, void 0, function* () {
            return "mockedEncryptedData"; // mock return value
        });
    }
    encryptAndCompactJWT(data, publicRecipientsJWKs) {
        return __awaiter(this, void 0, void 0, function* () {
            return "mockedCompactJWE"; // mock return value
        });
    }
    verify(dataBytes, publicSignatureBytes, alg) {
        return __awaiter(this, void 0, void 0, function* () {
            return true; // mock return value, signature always valid
        });
    }
    verifyCompactJWT(data, privateJWK) {
        return __awaiter(this, void 0, void 0, function* () {
            return true; // mock return value, JWT always valid
        });
    }
    decrypt(plaintext, publicRecipientsJWKs) {
        return __awaiter(this, void 0, void 0, function* () {
            return "mockedDecryptedData"; // mock return value
        });
    }
    decryptDataJWE(data, publicRecipientsJWKs) {
        return __awaiter(this, void 0, void 0, function* () {
            return "mockedDecryptedJWEData"; // mock return value
        });
    }
}
exports.CryptoManagerMock = CryptoManagerMock;
//# sourceMappingURL=joseCrypto.mock.js.map