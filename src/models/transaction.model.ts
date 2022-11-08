import { DidData } from "./did.model";
import { DIDCommAttachment } from "./didComm.model";

export interface RequestObject {
    method: string;
    url: string; // in FHIR it can be a relative URI (e.g.: Observation/<uuid>)
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
        data: TransactionResourceObject[],
        type: string;
    }
}