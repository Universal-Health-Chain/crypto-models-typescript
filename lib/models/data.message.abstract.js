"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSecureAbstract = void 0;
/** Note: setBody must use setContent to update the content.resources and then update the body */
class DataSecureAbstract {
    constructor(cryptoManager, zip, defaultExpiration, dataJWT) {
        this.publicRecipientsJWKs = [];
        this.defaultExpiration = 0;
        this.cryptoManager = cryptoManager;
        if (zip) {
            this.compressPayload = zip;
        }
        if (defaultExpiration) {
            this.defaultExpiration = defaultExpiration;
        }
        if (!dataJWT) {
            dataJWT = {
                header: { alg: 'none' },
                payload: {},
                signature: undefined
            };
        }
        this.messageJWT = dataJWT;
    }
}
exports.DataSecureAbstract = DataSecureAbstract;
//# sourceMappingURL=data.message.abstract.js.map