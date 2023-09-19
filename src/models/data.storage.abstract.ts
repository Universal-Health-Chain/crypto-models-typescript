import { IndexedAttributeProtected } from "./data.storage.model";

export abstract class DataStorageAbstract {
    /** Method to write records. */
    public abstract writeRecord(collectionName: string, edvRecord: object): Promise<object | undefined>;

    /** Method to read record by ID. */
    public abstract readRecord(collectionName: string, recordID: string): Promise<object | undefined>;

    /** Method to search (query) records. */
    public abstract queryRecords(collectionName: string, indexedAttributes: IndexedAttributeProtected[]): Promise<object>;

}