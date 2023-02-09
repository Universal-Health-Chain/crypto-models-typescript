import { DIDCommAttachment } from "./didComm.model";
import { DidDocument } from "./didDocument.model";
/** CAUTION: The internal `id` is only for the storage provider and it can be different to the *DID*.
 *  Note: the `didData.didDocument.id` will contain the **DID** of the resource object (main identifier).
 */
export interface ResourceObjectBase {
    attachments?: DIDCommAttachment[];
    attributes?: any;
    id?: string;
    meta?: ResourceMetadata;
    relationships?: ResourceRelationships;
    type?: string;
}
/** The `url` field can be a relative URI as per the FHIR specification (e.g.: Observation/<uuid>) */
export interface ResourceRequest {
    method: string;
    url: string;
}
/** Metadata for a JSON:API Resource Object
 *  - created (Conditional): required when creating a resource object, e.g.: "2019-03-23T06:35:22Z"
 *  - updated (Conditional): required when updating a resource object, e.g.: "(c)-08-10T13:40:06Z"
 *  - deactivated (Conditional): required when the resoruce object is disabled (before deleting).
 *  Note: the deactivation date is the "updated" timestamp.
 */
export interface ResourceMetadata {
    created?: string;
    deactivated?: boolean;
    updated?: string;
    tags?: string;
}
/** Relationship of participants and related resource objects in a JSON:API Resource Object */
export interface ResourceRelationships {
    participants?: ParticipantsIdentity;
    related?: any;
}
export interface ParticipantsIdentity {
    author?: DidDocument;
    asserter?: DidDocument;
    recorder?: DidDocument;
    reporter?: DidDocument;
    requester?: DidDocument;
    interpreters?: DidDocument[];
    performers?: DidDocument[];
    subject?: DidDocument;
    holder?: DidDocument;
    writer?: DidDocument;
    recipients?: DidDocument[];
}
