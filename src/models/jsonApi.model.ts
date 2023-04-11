/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { DidData } from './did.model';
import { DIDCommAttachment } from './didComm.model';
import { DidDocument } from './didDocument.model';
import { VerifiedClaimsAssuranceDLT } from './oidc4ida.claimsVerification.model';
import { MetadataResearch } from './metadata.model';

/** JSON-API common data:
 *  - id:  only required if the backend does not generate an ID.
 *  - type: reverse DNS is recommended.
 */
export interface ResourceCommonBase {
    id?:        string; // only required if the backend does not generate an ID.
    type?:      any;    // reverse DNS is recommended.
}

/** Error objects provide additional information about problems encountered while performing an operation.
 *  Error objects MUST be returned as an array keyed by errors in the top level of a JSON:API document.
 *  An error object MAY have the following members:
 *  - status: the HTTP status code applicable to this problem, expressed as a string value.
 *  - code: an application-specific error code, expressed as a string value.
 */
 export interface ErrorBaseObject{
    status?:    string;
    code?:      string;
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
    // sent to the SC (same as in DidDocumentMetadata)
    created?:       string;     // when the creator first generated the data (for example: "2023-02-23T06:35:22Z")
    updated?:       string;     // when was last modified (eg: "2023-03-16T13:40:06Z")
    deactivated?:   boolean;    // true if removed or deactivated (note: the deactivated date is the "updated" timestamp).
    
    // set by the SC (NOTE: the researchStatus is a root property in the resource object)
    channel?:       string;     // blockchain channel
    txId?:          string;     // Base58(txId)
    txTime?:        string;     // When the resource was written on the public ledger (ISO timestamp).
}

/**
 * - audit: audit information created by both creator, updater and smart-contract (created, updated, deactivated, channel, txId, txTime).
 * - research: parentId, country_code, jurisdiction, type (reverse DNS) and tags (list of types of resources or other non-personal tags).
 * - versionId: UNIX milliseconds when the resource was created, other than "txn" in the check element.
 */
export interface MetadataResourceObject {
    // audit info created by both creator, updater and smart-contract.
    audit?:         AuditInfo
    // specific data for both searchs and research
    research?:      MetadataResearch; // specific data for both searchs and research such as country_code, jurisdiction, tags (list of types of resources or other non-personal tags).
    // from FHIR meta
    versionId?:     string;         // UNIX milliseconds when the resource was created, other than "txn" in the check element.
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
        pointer?: string; // e.g.: "/data" for a primary data object, or "/data/attributes/title"
        parameter?: string;
        header?: string;
    };
    meta?: object;
}

/** The `url` field can be a relative URI as per the FHIR specification (e.g.: Observation/<uuid>) */
export interface ResourceRequest {
    method: string;
    url: string; // in FHIR it can be a relative URI (e.g.: Observation/<uuid>)
}

/** Relationship of participants and related resource objects in a JSON:API Resource Object */
export interface ResourceRelationships {
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
    // from Composition
    author?:        DidDocument;    // DID of the creator (e.g.: a practitioner role, device, patient, legal guardian, organization)

    // from AllergyIntollerance
    asserter?:      DidDocument;    // DID of the source of the information (e.g.: a practitioner role, an "issuer" service, an organization)
    recorder?:      DidDocument;    // Who recorded the resource object, such as the DID of a "client_id" (FAPI Security Profile specificatiton)

    // from Prescription
    reporter?:      DidDocument;    // it mixes FHIR R4 'informationSource' and 'reportedReference'
    requester?:     DidDocument;    // who is the cause of the resource object creation

    // from Observation
    interpreters?:  DidDocument[];  // who did the evaluation of the data included in the resource object.
    performers?:    DidDocument[];  // who did some part in the resource object data.
    subject?:       DidDocument;    // who the resource object is about, such as the DID of a practitioner role or customer ("sub" field in the FAPI Security Profile specificatiton)

    // for smart-contracts
    holder?:        DidDocument;    // DID of the owner of the resource object (it can be different to the subject).
    writer?:        DidDocument;    // DID of the blockchain member writing data in the ledger.

    // authorized recipients by the subject or holder (e.g.: patient or legal guardians)
    recipients?:    DidDocument[];// DID of legal guardians, caregivers, etc.
}

/** CAUTION: The internal `id` is only for the storage provider and it can be different to the *DID*.
 *  Note: the `didData.didDocument.id` will contain the **DID** of the resource object (main identifier).
 */
export interface ResourceObjectBase {
    attributes?:    any;                    // use for processed data 
    id?:            string;
    meta?:          MetadataResourceObject; // e.g.: created timestamp (it can be different on the frontend app and in the backend service).
    relationships?: ResourceRelationships;
    type?:          string;                 // reverse DNS, e.g.: "org.hl7.fhir.R5.Observation".
}

export interface ResourceObjectWithDIDCommAttachments extends
    ResourceObjectBase
{
    attachments?:   DIDCommAttachment[];
}


export interface  ResourceObjectSC extends
    ResourceObjectBase
{
    // attachments?:    DIDCommAttachment[];        // use for unprocessed, embedded raw data (e.g. assurance of PDF or JPEG files)
    didData?:           DidData;                    // DID resolution data and DID metadata.
    meta?:              MetadataResourceObject;     // e.g.: created timestamp (it can be different on the frontend app and in the backend service).
    request?:           ResourceRequest;            // same as FHIR request (it has method and url).
    researchStatus?:    boolean;                    // true when the anonymized and de-identifed attributes were already stored for research (avoid duplicated data for research).
    type?:              string;                     // reverse DNS, e.g.: "org.hl7.fhir.R5.Observation".
    verified_claims?:   VerifiedClaimsAssuranceDLT; // created by the API or SC for hash and claims of both raw data and standardized data
}

export interface  ResourceObjectExtended extends
    ResourceObjectWithDIDCommAttachments, ResourceObjectSC
{
    attachments?:       DIDCommAttachment[];        // use for unprocessed, embedded raw data (e.g. assurance of PDF or JPEG files)
    attributes?:        any;                        // use for standardized attributes from raw data (e.g.: schema.org or FHIR attributes)
    didData?:           DidData;                    // DID resolution data and DID metadata.
    included?:          ResourceObjectSC[];         // include attributes of additional resources (e.g.: departments and employess of an organization)
    request?:           ResourceRequest;            // same as FHIR request (it has method and url).
    researchStatus?:    boolean;                    // true when the anonymized and de-identifed attributes were already stored for research (avoid duplicated data for research).
    type?:              string;                     // reverse DNS, e.g.: "org.hl7.fhir.R5.Observation".
    verified_claims?:   VerifiedClaimsAssuranceDLT; // created by the API or SC for hash and claims of both raw data and standardized data
}

export enum PrimaryDocType {
    batch = 'batch',
    collection = 'collection',
    document = 'document',
    transaction = 'transaction'
}

export enum MethodHTTP {
    create = 'POST', // it generates a new ID for the resource (overwrites a given ID).
    delete = 'DELETE',
    read = 'GET',
    update = 'PUT' // it can be used to create a resource with a given ID.
}

export type PrimaryDocTypes = PrimaryDocType.batch | PrimaryDocType.collection | PrimaryDocType.document | PrimaryDocType.transaction;

export interface PrimaryDocSC {
    data: ResourceObjectExtended[];
    error?: ErrorResourceObject[];
    type: PrimaryDocTypes; // 'batch' | 'collection' | 'document' | 'transaction'
}