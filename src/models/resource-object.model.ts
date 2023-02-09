/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { DIDCommAttachment } from "./didComm.model";
import { DidDocument } from "./didDocument.model";

/** CAUTION: The internal `id` is only for the storage provider and it can be different to the *DID*.
 *  Note: the `didData.didDocument.id` will contain the **DID** of the resource object (main identifier).
 */
export interface  ResourceObjectBase {
    attachments?:   DIDCommAttachment[];            // credentials or evidences
    attributes?:    any;                            // JSON data
    id?:            string;                         // it can be used by the smart-contracts for pseudo-anonymization
    meta?:          ResourceMetadata;         // e.g.: created timestamp (it can be different on the frontend app and in the backend service)
    relationships?: ResourceRelationships;    // e.g.: author (client_id)
    type?:          string;                         // e.g.: 
}

/** The `url` field can be a relative URI as per the FHIR specification (e.g.: Observation/<uuid>) */
export interface ResourceRequest {
    method: string;
    url: string; // in FHIR it can be a relative URI (e.g.: Observation/<uuid>)
}

/** Metadata for a JSON:API Resource Object
 *  - created (Conditional): required when creating a resource object, e.g.: "2019-03-23T06:35:22Z"
 *  - updated (Conditional): required when updating a resource object, e.g.: "(c)-08-10T13:40:06Z"
 *  - deactivated (Conditional): required when the resoruce object is disabled (before deleting).
 *  Note: the deactivation date is the "updated" timestamp.      
 */
 export interface ResourceMetadata {
    // From DidDocumentMetadata
    created?:       string;     // e.g.: "2019-03-23T06:35:22Z"
    deactivated?:   boolean;    // note: the deactivation date is the "updated" timestamp.      
    updated?:       string;     // e.g.: "(c)-08-10T13:40:06Z"
    tags?:          string;     // list of types of resources or other non-personal tags.
}

/** Relationship of participants and related resource objects in a JSON:API Resource Object */
export interface ResourceRelationships{
    participants?:  ParticipantsIdentity; // e.g.: author, performer, etc.
    related?:       any;    // e.g.: encounter, etc.
}

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