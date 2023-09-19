import { IndexedAttributeProtected } from "./data.storage.model";
export declare abstract class DataStorageAbstract {
    /** Method to write records. */
    abstract writeRecord(collectionName: string, edvRecord: object): Promise<object | undefined>;
    /** Method to read record by ID. */
    abstract readRecord(collectionName: string, recordID: string): Promise<object | undefined>;
    /** Method to search (query) records. */
    abstract queryRecords(collectionName: string, indexedAttributes: IndexedAttributeProtected[]): Promise<object>;
}
