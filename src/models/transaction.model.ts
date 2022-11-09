/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

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

/** Transaction: see https://gitlab.com/universal-health-chain/backend/org-management-service/-/blob/main/endpoints/cds/v1/resources/transaction/README.md)
 *  - the "body" contains a JSON:API Primary Document.
 *  - the "client_id" contans what profile (wallet) has created the draft version or the final document.
 *  Example:
 *  `did:legal:healthcare:ES:::Organization:uuid:e7f01da5-7cd4-4e7c-993f-f83659684a94:HealthcareService:uuid:097c1d6c-4622-4511-a908-4417edda459c:Practitioner:uuid:77166e58-d08b-42b8-8370-480f82feded3:PractitionerRole:oid|2.16.840.1.113883.18.108|MD::Device::<multihash(pushNotificationToken)>`
 *  - the "subject" refers to the target DID, e.g.: an organition, professional or patient DID.
 *
 *  Note: both ID ("_id"), version ("_rev") are in the parent StorageBase object (from the database)
 */
export interface DIDCommTransactionPayloadBase {
    body: {
        data: TransactionResourceObject[],
        type: "transaction";
    },
    client_id: string; // who is the creator of this version of the Primary Document.
    subject: string; // DID of the target entity, e.g.: an organization, professional or patient DID.
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
 export interface DIDCommTransactionPayloadFull extends
    TransactionResourceObject
{
    aud: string;
    body: {
        data: TransactionResourceObject[],
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
    type: "data+jar";
}