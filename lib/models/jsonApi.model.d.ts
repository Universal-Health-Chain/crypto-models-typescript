import { DidData } from './did.model';
import { DIDCommAttachment } from './didComm.model';
import { DidDocument } from './didDocument.model';
import { VerifiedClaimsAssuranceDLT } from './oidc4ida.claimsVerification.model';
import { MetadataResearch } from './metadata.model';
import { JWKeySet } from './jwk.model';
import { TypePrimaryDoc } from './common.model';
/** JSON-API common data:
 *  - id:  only required if the backend does not generate an ID.
 *  - type: reverse DNS is recommended.
 */
export interface ResourceCommonBase {
    id?: string;
    type?: any;
}
export interface IDTypePair extends ResourceCommonBase {
    id: string;
    type: string;
}
/** Error objects provide additional information about problems encountered while performing an operation.
 *  Error objects MUST be returned as an array keyed by errors in the top level of a JSON:API document.
 *  An error object MAY have the following members:
 *  - status: the HTTP status code applicable to this problem, expressed as a string value.
 *  - code: an application-specific error code, expressed as a string value.
 */
export interface ErrorBaseObject {
    status?: string;
    code?: string;
}
/** Audit metadada for traceability.
 *  Data set by the software application:
 *  - "created": when the creator first generated the data off the blockchain (for example: "2023-02-23T06:35:22Z")
 *  - "updated": when was last modified off the blockchain (eg: "2023-03-16T13:40:06Z").
 *  - "deactivated": true if removed or deactivated (note: the deactivated date is the "updated" timestamp).
 *
 *  Data set by the SC:
 *  - "channel" name of the channel where the data is audited on the blockchain network.
 *  - "txId": Base58 encoded blockchain's transaction identifier (32 bytes).
 *  - "txTime": timestamp of the transaction on the blockchain channel (ISO format).
 */
export interface AuditInfo {
    created?: string;
    updated?: string;
    deactivated?: boolean;
    channel?: string;
    txId?: string;
    txTime?: string;
}
/**
 * - audit: audit information created by both creator, updater and smart-contract (created, updated, deactivated, channel, txId, txTime).
 * - versionId: UNIX milliseconds when the resource was created, other than "txn" in the check element.
 */
export interface MetadataBaseResource {
    audit?: AuditInfo;
    versionId?: string;
}
/**
 * - audit: audit information created by both creator, updater and smart-contract (created, updated, deactivated, channel, txId, txTime).
 * - research: parentId, country_code, jurisdiction, type (reverse DNS) and tags (list of types of resources or other non-personal tags).
 * - versionId: UNIX milliseconds when the resource was created, other than "txn" in the check element.
 */
export interface MetadataResourceObject extends MetadataBaseResource {
    audit?: AuditInfo;
    research?: MetadataResearch;
    versionId?: string;
}
/**
 *  The value of the "links" member MUST be an object (a “links object”)
 *  The optional links member within each resource object contains links related to the resource, such as a web link.
 *
 *  The "links" object context is the top-level object, resource object, or relationship object in which it appears.
 *  A "links" object MUST contain the following member:
 *  - href: a string whose value is a URI-reference [RFC3986 Section 4.1] pointing to the link’s target.
 *
 *  A link object MAY also contain any of the following members:
 *  - "self": link that identifies the resource represented by the resource object.
 *  - rel: a string indicating the link’s relation type. The string MUST be a valid link relation type.
 *  - describedby: a link to a description document (e.g. OpenAPI or JSON Schema) for the link target.
 *  - title: a string which serves as a label for the destination of a link such that it can be used as a human-readable identifier (e.g., a menu entry).
 *  - type: a string indicating the media type of the link’s target.
 *  - hreflang: a string or an array of strings indicating the language(s) of the link’s target. An array of strings indicates that the link’s target is available in multiple languages. Each string MUST be a valid language tag [RFC5646].
 *  - meta: a meta object containing non-standard meta-information about the link.
 *  Note: the type and hreflang members are only hints; the target resource is not guaranteed to be available in the indicated media type or language when the link is actually followed.
 */
export interface LinksObject {
    href: string;
    rel?: string;
    describedBy?: string;
    title?: string;
    type?: string;
    hreflang?: string;
    meta?: object;
}
/**
 *  Error objects: provide additional information about problems encountered while performing an operation.
 *  Error objects MUST be returned as an array keyed by errors in the top level of a JSON:API document.
 *  An error object MAY have the following members, and MUST contain at least one of:
 *  - id: a unique identifier for this particular occurrence of the problem (e.g.: the ID of the Resource Object).
 *  - links: a links object that MAY contain the following members:
 *      - about: a link that leads to further details about this particular occurrence of the problem. When derefenced, this URI SHOULD return a human-readable description of the error.
 *      - type: a link that identifies the type of error that this particular error is an instance of. This URI SHOULD be dereferencable to a human-readable explanation of the general error.
 *  - status: the HTTP status code applicable to this problem, expressed as a string value. This SHOULD be provided.
 *  - code: an application-specific error code, expressed as a string value.
 *  - title: a short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
 *  - detail: a human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
 *  - source: an object containing references to the primary source of the error. It SHOULD include one of the following members or be omitted:
 *      - pointer: a JSON Pointer [RFC6901] to the value in the request document that caused the error [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute]. This MUST point to a value in the request document that exists; if it doesn’t, the client SHOULD simply ignore the pointer.
 *      - parameter: a string indicating which URI query parameter caused the error.
 *      - header: a string indicating the name of a single request header which caused the error.
 *  - meta: a meta object containing non-standard meta-information about the error.
 */
export interface ErrorResourceObject {
    id?: string;
    links?: LinksObject;
    status?: string;
    code?: string;
    title?: string;
    detail?: string;
    source?: {
        pointer?: string;
        parameter?: string;
        header?: string;
    };
    meta?: object;
}
/** The `url` field can be a relative URI as per the FHIR specification (e.g.: Observation/<uuid>) */
export interface ResourceRequest {
    method: string;
    url: string;
}
/** TODO: review "related" data .
 *  - "participants": DID Documents of different types of participants.
 *  Note: MUST have "href" and can have additional "related" link data https://jsonapi.org/format/#document-links
 */
export interface ResourceRelationships {
    links?: object;
    participants?: ParticipantsIdentity;
    related?: any;
}
/** DID Documents (with DID and public keys) of the participants related to the JSON:API resource object
 *  (to verify signatures and encrypt information by using the public keys)
 *  - author of a FHIR Composition
 *  - asserter of a FHIR AllergyIntollerance
 *  - recorder of a FHIR AllergyIntollerance
 *  - reporter of a FHIR Prescription
 *  - requester of a FHIR Prescription
 *  - interpreters of a FHIR Observation
 *  - performers of a FHIR Observation
 *  - subject of a FHIR Observation
 *  - holder of a resource object (e.g.: patient)
 *  - writer is the federated member storing the resource in the blockchain.
 *  - recipients are additional recipients authorized (legal guardians, caregivers, etc.).
*/
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
/** CAUTION: The internal `id` is only for the storage provider and it can be different to the *DID*.
 *  Note: the `didData.didDocument.id` will contain the **DID** of the resource object (main identifier).
 */
export interface ResourceObjectBase {
    attributes?: any;
    id?: string;
    meta?: MetadataResourceObject;
    relationships?: ResourceRelationships;
    type?: string;
}
/** The `didData.didDocument.id` field is required and it is the **DID** of the resource object (main identifier).
 *  CAUTION: The internal `id` is only for the storage provider and it can be different to the DID.
 */
export interface ResourceObjectWithDIDCommAttachmentsAndJWKS extends ResourceObjectSC {
    attachments?: DIDCommAttachment[];
    jwks?: JWKeySet;
}
/** The `didData.didDocument.id` field is required and it is the **DID** of the resource object (main identifier).
 *  CAUTION: The internal `id` is only for the storage provider and it can be different to the DID.
 */
export interface ResourceObjectSC extends ResourceObjectBase {
    didData?: DidData;
    meta?: MetadataResourceObject;
    request?: ResourceRequest;
    researchStatus?: boolean;
    type?: string;
    verified_claims?: VerifiedClaimsAssuranceDLT;
}
/**
 *  - attachments: use for unprocessed, embedded raw data (e.g. assurance of PDF or JPEG files)
 *  - attributes: non-FHIR data source attributes (e.g.: schema.org, openEHR)
 *  - didData: DID document and DID metadata.
 *  - fullUrl: FHIR resource's URL in the patient's portal.
 *  - included: de-identified resources for clinical research or other additional resources (e.g.: departments and employess of an organization)
 *  - jwks: history of public keys
 *  - meta: for example, creation timestamp (it can be different on the frontend app and in the backend service).
 *  - request: same as FHIR request (it has method and url).
 *  - relationships: relationships object with the DID Documents of the "participants" and additional "related" resources
 *  - researchStatus: true when the anonymized and de-identifed attributes were already stored for research (avoid duplicated data for research).
 *  - resource: FHIR resource
 *  - type: reverse DNS, e.g.: "org.hl7.fhir.r4.observation".
 *  - verified_claims: created by the API or SC for hash and claims of both raw data and standardized data
 */
export interface ResourceObjectExtended extends ResourceObjectWithDIDCommAttachmentsAndJWKS {
    attachments?: DIDCommAttachment[];
    attributes?: any;
    didData?: DidData;
    fullUrl?: string;
    included?: ResourceObjectSC[];
    jwks?: JWKeySet;
    meta?: MetadataResourceObject;
    relationships?: ResourceRelationships;
    request?: ResourceRequest;
    researchStatus?: boolean;
    resource?: object;
    type?: string;
    verified_claims?: VerifiedClaimsAssuranceDLT;
}
/** - data: array of resource objects
 *  - type: type of resource objects and primary document (e.g.: "org.hl7.fhir.bundle.transaction+json-api" or "org.schema+json-api").
 */
export interface PrimaryDocBase {
    data: ResourceObjectExtended[];
    type: TypePrimaryDoc;
}
/** - data: array of resource objects.
 *  - errors (optional): array of error objects.
 *  - type: type of resource objects and primary document (e.g.: "org.hl7.fhir.bundle.transaction+json-api" or "org.schema+json-api").
 */
export interface PrimaryDocFromSC extends PrimaryDocBase {
    data: ResourceObjectExtended[];
    error?: ErrorResourceObject[];
    type: TypePrimaryDoc;
}
/** - data: array of resource objects.
 *  - errors (optional): array of error objects.
 *  - id (optional): unique for the client application to identify the resource (e.g.: hash of the DID or URI for pseudo-anonymization)
 *  - type: type of resource objects and primary document (e.g.: "org.hl7.fhir.bundle.transaction+json-api" or "org.schema+json-api").
 */
export interface PrimaryDoc extends PrimaryDocFromSC {
    id?: string;
}
