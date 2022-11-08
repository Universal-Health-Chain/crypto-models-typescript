import { DidData } from "./did.model";
import { DIDCommAttachment } from "./didComm.model";
export interface RequestObject {
    method: string;
    url: string;
}
export interface TransactionResourceObject {
    attachments?: DIDCommAttachment[];
    attributes?: any;
    didData: DidData;
    id?: string;
    request?: RequestObject;
    type?: string;
}
export interface DIDCommTransactionPayloadBase {
    body: {
        data: TransactionResourceObject[];
        type: string;
    };
}
