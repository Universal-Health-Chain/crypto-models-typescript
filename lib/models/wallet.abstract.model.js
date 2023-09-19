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
exports.WalletAbstract = void 0;
const data_secure_abstract_1 = require("./data.secure.abstract");
class WalletAbstract extends data_secure_abstract_1.SecureDataAbstract {
    constructor(storageTools, hmacKeyBytes, hmacKeyInfo, cryptographicEncryption, cryptographicSignature) {
        super(storageTools, hmacKeyBytes, hmacKeyInfo, cryptographicEncryption, cryptographicSignature);
    }
    /** Creates the encrypted record to be stored in the database */
    generateRecord(specification) {
        return __awaiter(this, void 0, void 0, function* () {
            const plaintext = JSON.stringify(this.composer.toSpecification(specification));
            return yield this.encryptRecord(plaintext);
        });
    }
    /** Method to write the data of the composition on the storage */
    writeComposition(specification, collectionName, uniqueAttributes, nonUniqueAttributes) {
        const _super = Object.create(null, {
            storage: { get: () => super.storage }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const storageData = yield this.generateRecord(specification);
            // setting the indexed data
            const attributesIndex = yield this.createIndex(uniqueAttributes, nonUniqueAttributes);
            storageData.indexed = attributesIndex;
            // done
            return yield _super.storage.writeRecord(collectionName, storageData);
        });
    }
}
exports.WalletAbstract = WalletAbstract;
//# sourceMappingURL=wallet.abstract.model.js.map