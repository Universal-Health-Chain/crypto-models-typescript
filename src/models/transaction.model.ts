/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { DidData } from "./did.model";
import { DIDCommAttachment } from "./didComm.model";
import { IDTypePair, MetadataResourceObject, ResourceObjectWithDIDCommAttachmentsAndJWKS, ResourceRequest } from "./jsonApi.model";
import { StandardJWE } from "./jwe.model";

/** The `didData.didDocument.id` field is required and it is the **DID** of the resource object (main identifier).
 *  CAUTION: The internal `id` is only for the storage provider and it can be different to the DID.
 */
export interface TxResourceObject extends
    ResourceObjectWithDIDCommAttachmentsAndJWKS // attachments, attributes, id, type
{
    attachments?: DIDCommAttachment[];
    attributes?: any;
    didData: DidData; // the DID is in the "didData.didDocument.id"
    id?: string; // this "id" can be internal for the storage provider and different to the DID
    metadata?: MetadataResourceObject;
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
        data: TxResourceObject[],
        type: "transaction";
    },
    client_id: string; // who is the creator of this version of the Primary Document.
    subject: string; // DID of the target entity, e.g.: an organization, professional or patient DID.
}

/** Transaction: see https://gitlab.com/universal-health-chain/backend/org-management-service/-/blob/main/endpoints/cds/v1/resources/transaction/README.md)
 *  - the "aud" (audience) is the target endpoint URL.
 *  Example: `http://localhost:8006/cds-<co`untry>/v1/resources/transaction/commit`
 *  - the "body" is a JSON:API "Primary Document" containing the resouce objects in the "data" property.
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
 export interface TxDIDCommPayloadFull extends
    TxDIDCommPayloadBase
{
    aud: string;
    body: { // JSON:API "Primary Document" containing the resouce objects in the "data" property.
        data: TxResourceObject[], // resource objects as per the JSON:API "Primary Document"
        id?: string; // optional: unique for the client application to identify the transaction internally.
        type: "transaction";
    },
    client_id: string;
    exp: number;
    jti?: string; // same as the storage document "_id"
    nbf: number;
    response_type: "data";
    response_mode: string; // "jwt", "form_post.jwt" ("didcomm/v2" will be possible too)
    scope: "openid";
    subject: string; // DID of the target entity, e.g.: an organization, professional or patient DID.
    type: string; // TODO: REVIEW "data+jar", "didcomm-jar-api-transaction"...
}

/** If the data is less than the chunk size, it is embedded directly into the content.
 *  Otherwise, the data is sharded into chunks by the client, and each chunk is encrypted and sent to the server.
 *  In this case, content contains a manifest-like listing of URIs to individual chunks (integrity-protected by [HASHLINK].
 *  Required fields are "created" and "status".
 *  - created (REQUIRED): UNIX epoch time (miliseconds) instead of ISO datetime, required when creating a document.
 *  - status (REQUIRED): valid status for the composition are "preliminary", "amended", "final" or "error" (FHIR specification).
 *  - contentType (Conditional): MIME type, required when data is sharded into chunks (e.g.: "didcomm-plain+json").
 *  - tags (Conditional): non-personal data, it is required when the content data is created. The tags can be removed from the metadata and stored in the encrypted index.
 *  - sectionCode (Conditional): required code for a health section or document category in a personal wallet.
 *  - sectionSystem (Conditional): default is "http://loinc.org" (health section or health document category).
 *  - updated (Conditional): UNIX epoch time (miliseconds) instead of ISO datetime, required when updating a document; it can be used as the version of the composition.
 *  - deactivated (Conditional): required when the storage object is disabled (before deleting).
 *  Note: the deactivation date is the "updated" timestamp.      
 */
 export interface TxCompositionMetadata {
    // Encrypted Data Vaults (EDV) specification
    contentType?:   string; // the data can be sharded into chunks, it specifies the MIME type of the data.
    
    // From UHC
    sectionCode?:   string; // health section or document category.
    sectionSystem?: string; // LOINC by default when it is not defined.
    status:         string; // "preliminary", "amended", "final" or "error" (FHIR specification)

    // From DidDocumentMetadata
    created:        number;     // UNIX epoch time (miliseconds) instead of ISO datetime.
    deactivated?:   boolean;    // note: the deactivation date is the "updated" timestamp.      
    updated?:       number;     // UNIX epoch time (miliseconds) instead of ISO datetime; it can be used as the version of the composition.
    
    // TODO: tags can be removed from the metadata and stored in the encrypted index.
    tags?:          string[];   // non-personal data is set as tags for each resource object, such as "department", "profile", "location", FHIR resource types, "SHC", "DGC", "COVID-19", etc.
}

/** Unencrypted composition data to be encrypted before being stored and sent to an external Encrypted Data Vault (EDV).
 *  When creating a draft, the required properties are: `id`, `indexed`, `meta.created`, `meta.status`.
 *  - the `indexed` element contains safe or unsafe index of attributes (`name` and `value`).
 *  - the `id` property is the external EDV record ID (16 bits), it can be generated deterministically.
 *  - the `_id` property is the internal identifier self-generated by the DB (PouchDB, CouchDB, MongoDB).
 *  - the `meta` property contains:
 *      - created (REQUIRED): UNIX epoch time (miliseconds) instead of ISO datetime, required when creating a document.
 *      - status (REQUIRED): valid status for the composition are "preliminary", "amended", "final" or "error" (FHIR specification).
 *      - contentType (Conditional): MIME type, required when data is sharded into chunks (e.g.: "didcomm-plain+json").
 *      - tags (Conditional): non-personal data, it is required when the content data is created. 
 *      - sectionCode (Conditional): required code for a health section or document category in a personal wallet.
 *      - sectionSystem (Conditional): default is "http://loinc.org" (health section or health document category).
 *      - updated (Conditional): UNIX epoch time (miliseconds) instead of ISO datetime, required when updating a document; it can be used as the version of the composition.
 *      - deactivated (Conditional): required when the storage object is disabled (before deleting).
 *  Note: the deactivation date is the "updated" timestamp.
 */
export interface TxCompositionBase { // old StorageBase
    "_deleted"?:    boolean;                // internal PouchDB / CouchDB when deleting a document.
    "_id":          string;                 // internal PouchDB / CouchDB / MongoDB object ID, distinct to the external record "id".
    "_rev"?:        string;                 // internal PouchDB / CouchDB version ID (automatically generated).
    id?:            string;                 // external EDV record ID (16 bits), it can be generated deterministically.
    indexed?:       any;                    // safe or unsafe index of attributes (`name` and `value`).
    meta?:          TxCompositionMetadata;  // "created" and "status" are required
}

/** Unencrypted composition data to be encrypted before being stored and sent to an external Encrypted Data Vault (EDV).
 *  When creating a draft, the required properties are: `_id`, `index` (`title` attribute), `meta.created`, `meta.status`.
 * - the `content` property contains the unencrypted DIDComm payload (with additional "body", "body.data[]" and "body.data[].attributes" properties).
 * - the `indexed` property contains unsafe index of attributes (`name` and `value`), not protected by HMAC.
 * - the `meta` property contains:
 *      - created (REQUIRED): UNIX epoch time (miliseconds) instead of ISO datetime, required when creating a document.
 *      - status (REQUIRED): valid status for the composition are "preliminary", "amended", "final" or "error" (FHIR specification).
 *      - contentType (Conditional): MIME type, required when data is sharded into chunks (e.g.: "didcomm-plain+json").
 *      - tags (Conditional): non-personal data, it is required when the content data is created. 
 *      - sectionCode (Conditional): required code for a health section or document category in a personal wallet.
 *      - sectionSystem (Conditional): default is "http://loinc.org" (health section or health document category).
 *      - updated (Conditional): UNIX epoch time (miliseconds) instead of ISO datetime, required when updating a document; it can be used as the version of the composition.
 *      - deactivated (Conditional): required when the storage object is disabled (before deleting).
 *  Note: the deactivation date is the "updated" timestamp.
 */
export interface TxCompositionUnencrypted extends
    TxCompositionBase
{
    content?:   TxDIDCommPayloadBase;   // decrypted payload, it can be encrypted as the `jwe` element before being stored.
    indexed?:   IndexUnsafe;            // unsafe index of attributes (`name` and `value`), not protected by HMAC.
}

/** Decrypted indexed attributes, they SHALL be encrypted before being stored.
 *  The `title` attribute MUST exist (human readable title for the composition)
 */
export interface IndexUnsafe {
    attributes: IndexAttributeUnsafe[]; // the `title` attribute MUST exist.
}

/** Unsafe indexed attributes can be protected by HMAC and used to perform efficient searching
 *  to protect the privacy of entities that are storing information in the data vault.
 *  When creating a document composition, index properties MAY be used to perform efficient searches.
 */
export interface IndexAttributeUnsafe {
    name: string;
    value: string;
    unique?: boolean
}

/** Safe indexed attributes can be created and used to perform efficient searching
 *  while protecting the privacy of entities that are storing information in the data vault.
 *  When creating an encrypted document composition, blinded index properties MAY be used to perform efficient searches.
 */
export interface IndexedAttributeSafe {
    name: string;
    value: string;
    unique?: boolean
}

/** IndexedDataHMAC represents a collection of indexed attributes, all of which share a common MAC algorithm and key.
 *  This format is based on https://identity.foundation/confidential-storage/#creating-encrypted-indexes.
 *  Encrypted indexes can be created and used to perform efficient searching
 *  while protecting the privacy of entities that are storing information in the data vault.
 *  When creating an encrypted resource, blinded index properties MAY be used to perform efficient searches.
 *  - "attributes" contains the indexed attributes (HMAC protected)
 *  - "hmac" contains both HMAC key "id" (e.g. `did:ex:12345#key1`) and "type" (e.g. `Sha256HmacKey2019`).
 *  - "sequence" ...
 */
export interface IndexSafe {
    attributes: IndexedAttributeSafe[]; // HMAC attribute name and value
    hmac:       IDTypePair;
    sequence:   number;
}

/** Encrypted composition data to be stored on an Encrypted Data Vault (EDV).
 *  When creating a draft, the required properties are: `_id`, `indexed` (`title` attribute), `meta.created`, `meta.status`.
 * - the `jwe` element contains the encrypted data ('cipertext property).
 * - the `indexed` element contains safe indexed attributes (HMAC).
 * - the `meta` element contains:
 *      - status (REQUIRED): valid status for the composition are "preliminary", "amended", "final" or "error" (FHIR specification).
 *      - created (REQUIRED): UNIX epoch time (miliseconds) instead of ISO datetime, required when creating a document.
 *      - deactivated (Conditional): required when the storage object is disabled (before deleting).
 *      - updated (Conditional): UNIX epoch time (miliseconds) instead of ISO datetime, required when updating a document; it can be used as the version of the composition.
 *      - contentType (Conditional): MIME type, required when data is sharded into chunks (e.g.: "didcomm-plain+json").
 *      - sectionCode (Conditional): required code for a health section or document category in a personal wallet.
 *      - sectionSystem (Conditional): default is "http://loinc.org" (health section or health document category).
 *      - tags (Conditional): non-personal data, it is required when the content data is created. 
 *  Note: the deactivation date is the "updated" timestamp.
 */
export interface TxCompositionEncrypted extends // note: old StorageBase
    TxCompositionBase
{  
    indexed?:       IndexSafe;              // safe indexed attributes (HMAC).
    jwe?:           StandardJWE;            // encrypted data
}