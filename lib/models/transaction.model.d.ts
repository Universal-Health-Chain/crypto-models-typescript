import { DidData } from "./did.model";
import { DIDCommAttachment } from "./didComm.model";
import { ResourceObjectBase, ResourceRequest } from "./resource-object.model";
/** The `didData.didDocument.id` field is required and it is the **DID** of the resource object (main identifier).
 *  CAUTION: The internal `id` is only for the storage provider and it can be different to the DID.
 */
export interface TxResourceObject extends ResourceObjectBase {
    attachments?: DIDCommAttachment[];
    attributes?: any;
    didData: DidData;
    id?: string;
    request?: ResourceRequest;
    type?: string;
}
/** Transaction: see https://gitlab.com/universal-health-chain/backend/org-management-service/-/blob/main/endpoints/cds/v1/resources/transaction/README.md)
 *  - the "body" contains a JSON:API Primary Document.
 *  - the "client_id" contans what profile (wallet) has created the draft version or the final document.
 *  Example:
 *  `did:legal:healthcare:ES:::Organization:uuid:e7f01da5-7cd4-4e7c-993f-f83659684a94:HealthcareService:uuid:097c1d6c-4622-4511-a908-4417edda459c:Practitioner:uuid:77166e58-d08b-42b8-8370-480f82feded3:PractitionerRole:oid|2.16.840.1.113883.18.108|MD::Device::<multihash(pushNotificationToken)>`
 *  - the "subject" refers to the target DID, e.g.: an organition, professional or patient DID.
 *
 *  Note: both ID ("_id"), version ("_rev") are in the parent StorageBase object (from the database)
 */
export interface TxDIDCommPayloadBase {
    body: {
        data: TxResourceObject[];
        type: "transaction";
    };
    client_id: string;
    subject: string;
}
/** Transaction: see https://gitlab.com/universal-health-chain/backend/org-management-service/-/blob/main/endpoints/cds/v1/resources/transaction/README.md)
 *  - the "aud" (audience) is the target endpoint URL.
 *  Example: `http://localhost:8006/cds-<co`untry>/v1/resources/transaction/commit`
 *  - the "body" contains a JSON:API Primary Document.
 *  - the "client_id" contans what profile (wallet) has created the draft version or the final document.
 *  Example:
 *  `did:legal:healthcare:ES:::Organization:uuid:e7f01da5-7cd4-4e7c-993f-f83659684a94:HealthcareService:uuid:097c1d6c-4622-4511-a908-4417edda459c:Practitioner:uuid:77166e58-d08b-42b8-8370-480f82feded3:PractitionerRole:oid|2.16.840.1.113883.18.108|MD::Device::<multihash(pushNotificationToken)>`
 *  - the "exp" property has a lifetime of no longer than 60 minutes after the "nbf" property (UNIX seconds).
 *  - the "jti" can be the same as the storage document "_id"
 *  - the "nbf" is no longer than 60 minutes in the past (UNIX seconds).
 *  - the "scope" contains "openid"
 *  - the "subject" refers to DID of the target entity, e.g.: an organization, professional or patient DID.
 *  - the "type" is set in UHC as "data+jar" to predict the content of the message
 */
export interface TxDIDCommPayloadFull extends TxDIDCommPayloadBase {
    aud: string;
    body: {
        data: TxResourceObject[];
        id?: string;
        type: "transaction";
    };
    client_id: string;
    exp: number;
    jti?: string;
    nbf: number;
    response_type: "data";
    response_mode: string;
    scope: "openid";
    subject: string;
    type: "data+jar";
}
/** Required "contentType", "compositionStatus" and "tags".
 *  - contentType (REQUIRED): MIME type.
 *  - compositionStatus (REQUIRED): "preliminary", "amended", "final" (frontend should not use the "error" status).
 *  - tags (REQUIRED): non-personal data such as a list of FHIR resources, "SHC", "DGC", "COVID-19" tag, etc.
 *  - sectionCode (Conditional): code for the health section or document category.
 *  - sectionSystem (Conditional): default is LOINC.
 *  - created (Conditional): required when creating a document, e.g.: "2019-03-23T06:35:22Z"
 *  - updated (Conditional): required when updating a document, e.g.: "2022-08-10T13:40:06Z"
 *  - deactivated (Conditional): required when the storage object is disabled (before deleting).
 *  Note: the deactivation date is the "updated" timestamp.
 */
export interface TxCompositionMetadata {
    contentType: string;
    compositionStatus: string;
    sectionCode?: string;
    sectionSystem?: string;
    created?: string;
    deactivated?: boolean;
    updated?: string;
    tags?: string;
}
/** "_id", "meta.created", "meta.contentType", "meta.compositionStatus" and "meta.tags" are required when creating a draft in the local storage.
 * The "content" property contains the DIDComm payload (with additional "body", "body.data[]" and "body.data[].attributes" properties).
 * The "meta" property contains:
 *  - created (REQUIRED): required when creating a document, e.g.: "2019-03-23T06:35:22Z"
 *  - compositionStatus (REQUIRED): "preliminary", "amended", "final" (frontend should not use the "error" status).
 *  - contentType (REQUIRED): MIME type (e.g.: "didcomm-plain+json")
 *  - tags (REQUIRED): non-personal data such as a list of FHIR resources, "SHC", "DGC", "COVID-19" tag, etc.
 *  - sectionCode (REQUIRED): code for the health section or document category.
 *  - sectionSystem (Conditional): default is LOINC.
 *  - updated (Conditional): required when updating a document, e.g.: "2022-08-10T13:40:06Z"
 *  - deactivated (Conditional): required when the storage object is disabled (before deleting).
 *  Note: the deactivation date is the "updated" timestamp.
 */
export interface TxCompositionBase {
    "_deleted"?: boolean;
    "_id": string;
    "_rev"?: string;
    "content": TxDIDCommPayloadBase;
    "meta": TxCompositionMetadata;
}
