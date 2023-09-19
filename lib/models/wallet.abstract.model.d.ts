import { SecureDataAbstract } from "./data.secure.abstract";
import { IDTypePair } from "./jsonApi.model";
import { IndexAttributeUnprotected, IndexProtected, IndexedAttributeProtected, SecureStorageData } from "./data.storage.model";
import { DataCompositionAbstract } from "./data.composition.abstract";
import { DataStorageAbstract } from "./data.storage.abstract";
export declare abstract class WalletAbstract extends SecureDataAbstract {
    abstract composer: DataCompositionAbstract;
    constructor(storageTools: DataStorageAbstract, hmacKeyBytes: Uint8Array, hmacKeyInfo: IDTypePair, cryptographicEncryption: any, cryptographicSignature: any);
    /** Creates the encrypted record to be stored in the database */
    protected generateRecord(specification: string): Promise<SecureStorageData | undefined>;
    /** The record can be an unencrypted 'plaintext' or 'content', but also an encrypted 'ciphertext' */
    protected abstract encryptRecord(compactStrOrObject: string | object): Promise<SecureStorageData | undefined>;
    protected abstract computeIndexedAttribute(newAttributeIndex: IndexAttributeUnprotected): Promise<IndexedAttributeProtected>;
    protected abstract createIndex(uniqueAttributes: string[], nonUniqueAttributes: string[]): Promise<IndexProtected>;
    /** Method to write the data of the composition on the storage */
    writeComposition(specification: string, collectionName: string, uniqueAttributes: string[], nonUniqueAttributes: string[]): Promise<SecureStorageData | undefined>;
}
