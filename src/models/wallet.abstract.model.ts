import { SecureDataAbstract } from "./data.secure.abstract";
import { IDTypePair } from "./jsonApi.model";
import { DataStorageBase, IndexAttributeUnprotected, IndexProtected, IndexedAttributeProtected, SecureStorageData } from "./data.storage.model";
import { DataCompositionAbstract, DataCompositionBase } from "./data.composition.abstract";
import { DataStorageAbstract } from "./data.storage.abstract";

export abstract class WalletAbstract extends SecureDataAbstract {
    public abstract composer: DataCompositionAbstract;

    constructor(storageTools: DataStorageAbstract, hmacKeyBytes: Uint8Array, hmacKeyInfo: IDTypePair, cryptographicEncryption: any, cryptographicSignature: any) {
        super(storageTools, hmacKeyBytes, hmacKeyInfo, cryptographicEncryption, cryptographicSignature);
    }

    /** Creates the encrypted record to be stored in the database */
    protected async generateRecord(specification: string): Promise<SecureStorageData | undefined> {
        const plaintext = JSON.stringify(this.composer.toSpecification(specification));
        return await this.encryptRecord(plaintext);
    }

    /** The record can be an unencrypted 'plaintext' or 'content', but also an encrypted 'ciphertext' */
    protected abstract encryptRecord(compactStrOrObject: string | object): Promise<SecureStorageData | undefined>;

    protected abstract computeIndexedAttribute(newAttributeIndex: IndexAttributeUnprotected): Promise<IndexedAttributeProtected>;

    protected abstract createIndex(uniqueAttributes: string[], nonUniqueAttributes: string[]): Promise<IndexProtected>;

    /** Method to write the data of the composition on the storage */
    public async writeComposition(specification: string, collectionName: string,uniqueAttributes: string[], nonUniqueAttributes: string[]): Promise<SecureStorageData | undefined> {
        const storageData = await this.generateRecord(specification);
        // setting the indexed data
        const attributesIndex = await this.createIndex(uniqueAttributes, nonUniqueAttributes);
        (storageData as SecureStorageData).indexed = attributesIndex;
        // done
        return await super.storage.writeRecord(collectionName, storageData);
    }

    // TODO: importComposition(specification: string, data: any[])

}
