"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureDataAbstract = exports.CryptographicEncryption = exports.CryptographicSignature = exports.CryptographicBaseAbstract = void 0;
class CryptographicBaseAbstract {
    constructor() {
        this.publicJWK = {};
    }
    /** Sets the public and private keys to be used. */
    setKeys(publicJWK, privateKeyBytes) {
        this.publicJWK = publicJWK;
        this.privateKeyBytes = privateKeyBytes;
    }
    /** Returns the public JWK */
    getPublicJWK() {
        return this.publicJWK;
    }
    /** Returns the public Key ID ('kid') */
    getKeyID() {
        return this.getPublicJWK().kid ? this.getPublicJWK().kid : '';
    }
}
exports.CryptographicBaseAbstract = CryptographicBaseAbstract;
class CryptographicSignature extends CryptographicBaseAbstract {
}
exports.CryptographicSignature = CryptographicSignature;
class CryptographicEncryption extends CryptographicBaseAbstract {
}
exports.CryptographicEncryption = CryptographicEncryption;
/** Implements asynchronous methods
 *  TODO: implement CBOR methods
 */
class SecureDataAbstract {
    constructor(storageTools, hmacKeyBytes, hmacKeyInfo, cryptographicEncryption, cryptographicSignature) {
        this.storage = storageTools;
        this.hmacKeyBytes = hmacKeyBytes;
        this.hmacKeyInfo = hmacKeyInfo;
        this.signature = cryptographicSignature;
        this.encryption = cryptographicEncryption;
    }
}
exports.SecureDataAbstract = SecureDataAbstract;
//# sourceMappingURL=data.secure.abstract.js.map