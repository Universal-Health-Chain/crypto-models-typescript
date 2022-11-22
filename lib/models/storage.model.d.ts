import { DIDCommTransactionPayloadBase } from "./transaction.model";
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
export interface MetaTxComposition {
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
    "content": DIDCommTransactionPayloadBase;
    "meta": MetaTxComposition;
}
