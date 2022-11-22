/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { StandardJWE } from "./jwe.model";
import { CommonPayloadJWM } from "./jwm.model";

export enum MimeTypeDIDCommFull {
    encrypted   = 'application/didcomm-encrypted+json', // for Authcrypted and/or anoncrypted, also for Signed and anoncrypted.
    signed      = 'application/didcomm-signed+json',
    plaintext   = 'application/didcomm-plain+json'
}

export enum MimeTypeDIDComm {
    encrypted   = 'didcomm-encrypted+json', // for Authcrypted and/or anoncrypted, also for Signed and anoncrypted.
    signed      = 'didcomm-signed+json',
    plaintext   = 'didcomm-plain+json'
}

export const TypeAcceptsDIDCommV2   = "didcomm/v2"

/** A DIDComm encrypted message is an encrypted JWM (JSON Web Messages) and hides its content from all but authorized recipients,
 *  discloses and proves the sender to exactly and only those recipients, and provides integrity guarantees.
 *  https://github.com/decentralized-identity/didcomm-messaging/blob/master/docs/spec-files/message_structure.md
 *
 *  The body of a DIDComm message is the JSON 'body' object into a JWM message.
 *
 *  Headers in DIDComm Messaging are intended to be extensible in much the same way that headers in HTTP or SMTP are extensible.
 *  A few headers are predefined:
 *  - attachments: OPTIONAL. See attachments.
 *  - body: REQUIRED. The body attribute contains all the message type specific attributes of the message type indicated in the type attribute. This attribute MUST be present, even if empty. It MUST be a JSON object conforming to RFC 7159.
 *  - id: REQUIRED. Message ID. The id attribute value MUST be unique to the sender.
 *  - type: REQUIRED. Plaintext message type ('<message-type-uri>'), useful for message handling in application-level protocols. The type attribute value MUST be a valid Message Type URI, that when resolved gives human readable information about the message. The attribute's value SHOULD predict the content in the body of the message.
 *  - typ: OPTIONAL. Media type of the JWM content (application/didcomm-encrypted+json, application/didcomm-signed+json OR application/didcomm-plain+json).
 *  - from: OPTIONAL: when the message is to be encrypted via anoncrypt. REQUIRED when the message is encrypted via authcrypt. Sender identifier. The from attribute MUST be a string that is a valid DID or DID URL (without the fragment component) which identifies the sender of the message. When a message is encrypted, the sender key MUST be authorized for encryption by this DID. Authorization of the encryption key for this DID MUST be verified by message recipient with the proper proof purposes. When the sender wishes to be anonymous using authcrypt, it is recommended to use a new DID created for the purpose to avoid correlation with any other behavior or identity. Peer DIDs are lightweight and require no ledger writes, and therefore a good method to use for this purpose. See the message authentication section for additional details.
 *  - to: OPTIONAL. Identifier(s) for recipients. MUST be an array of strings where each element is a valid DID or DID URL (without the fragment component) that identifies a member of the message's intended audience. These values are useful for recipients to know which of their keys can be used for decryption. It is not possible for one recipient to verify that the message was sent to a different recipient.
 *  - thid: OPTIONAL: Thread identifier. Uniquely identifies the thread that the message belongs to. If not included, the id property of the message MUST be treated as the value of the thid.
 *  - pthid: OPTIONAL. Parent thread identifier. If the message is a child of a thread the pthid will uniquely identify which thread is the parent.
 *  - created_time: OPTIONAL. Message Created Time. The created_time attribute is used for the sender to express when they created the message, expressed in UTC Epoch Seconds (seconds since 1970-01-01T00:00:00Z UTC) [link](1970-01-01T00:00:00Z UTC). This attribute is informative to the recipient, and may be relied on by protocols.
 *  - expires_time: OPTIONAL. Message Expired Time. The expires_time attribute is used for the sender to express when they consider the message to be expired, expressed in UTC Epoch Seconds (seconds since 1970-01-01T00:00:00Z UTC) [link](1970-01-01T00:00:00Z UTC). This attribute signals when the message is considered no longer valid by the sender. When omitted, the message is considered to have no expiration by the sender.
 */
export interface DIDCommMessage extends
    CommonPayloadJWM
{
    attachments?:   DIDCommAttachment[];    // OPTIONAL. See Attachments for detail.
    pthid?:         string;                 // OPTIONAL. Parent thread identifier. If the message is a child of a thread the pthid will uniquely identify which thread is the parent.
    thid?:          string;                 // OPTIONAL: Thread identifier. Uniquely identifies the thread that the message belongs to. If not included, the id property of the message MUST be treated as the value of the thid.
}

/*
It is common for DIDComm messages to supplement formalized structure with arbitrary data — images, documents, or types of media not yet invented. Such content is “attached” to DIDComm messages in much the same way that attachments work in email.

Attachments are contained within a list in the attachments header.

Each attachment is described with an instance of a JSON object that has the following structure.

    id: [optional but recommended] Identifies attached content within the scope of a given message, so it can be referenced. For example, in a message documenting items for sale on an auction website, there might be a field named front_view that contains the value #attachment1; this would reference an attachment to the message with id equal to attachment1. If omitted, then there is no way to refer to the attachment later in the thread, in error messages, and so forth. Because the id of an attachment is used to compose URIs, this value should be brief and MUST consist entirely of unreserved URI characters – meaning that it is not necessary to percent encode the value to incorporate it in a URI.
    description: [optional] A human-readable description of the content.
    filename: A hint about the name that might be used if this attachment is persisted as a file. It is not required, and need not be unique. If this field is present and media_type is not, the extension on the filename may be used to infer a MIME type.
    media_type: [optional] Describes the media type of the attached content.
    format: [optional] Further describes the format of the attachment if the media_type is not sufficient.
    lastmod_time: [optional] A hint about when the content in this attachment was last modified.
    data: A JSON object that gives access to the actual content of the attachment. Contains enough of the following subfields to allow access to the data:
        jws: [optional] A JWS in detached content mode, where the payload field of the JWS maps to base64 or to something fetchable via links. This allows attachments to be signed. The signature need not come from the author of the message.
        hash: [optional] The hash of the content encoded in multi-hash format. Used as an integrity check for the attachment, and MUST be used if the data is referenced via the links data attribute.
        links: [optional] A list of zero or more locations at which the content may be fetched. This allows content to be attached by reference instead of by value.
        base64: [optional] Base64url-encoded data, when representing arbitrary content inline instead of via links.
        json: [optional] Directly embedded JSON data, when representing content inline instead of via links, and when the content is natively conveyable as JSON.
    byte_count: [optional] mostly relevant when content is included by reference instead of by value. Lets the receiver guess how expensive it will be, in time, bandwidth, and storage, to fully fetch the attachment.
*/

/** A JSON object that gives access to the actual content of the attachment.
 *  Contains enough of the following subfields to allow access to the data:
 *  - jws: [optional] A JWS in detached content mode, where the payload field of the JWS maps to base64 or to something fetchable via links. This allows attachments to be signed. The signature need not come from the author of the message.
 *  - hash: [optional] The hash of the content encoded in multi-hash format. Used as an integrity check for the attachment, and MUST be used if the data is referenced via the links data attribute.
 *  - links: [optional] A list of zero or more locations at which the content may be fetched. This allows content to be attached by reference instead of by value.
 *  - base64: [optional] Base64url-encoded data, when representing arbitrary content inline instead of via links.
 *  - json: [optional] Directly embedded JSON data, when representing content inline instead of via links, and when the content is natively conveyable as JSON.
 */
export interface DIDCommAttachmentContent extends
    DIDCommAttachmentContentBlockchain
{
    jws?:   string;     // detached content mode (for signature verification), payload field of the JWS maps to base64 or to something fetchable via links.
    hash?:  string;     // The hash of the content encoded in multi-hash format. Used as an integrity check for the attachment, and MUST be used if the data is referenced via the links data attribute.
    links?: string[];   // A list of zero or more locations at which the content may be fetched. This allows content to be attached by reference instead of by value.
    base64?:string;     // Base64url-encoded data, when representing arbitrary content inline instead of via links.
    json?:  object;     // Directly embedded JSON data, when representing content inline instead of via links, and when the content is natively conveyable as JSON.
}

/**
 * id: it should be brief and MUST consist entirely of unreserved URI characters
 * description: a human-readable description of the content.
 * filename: a hint about the name that might be used if this attachment is persisted as a file. If this field is present and media_type is not, the extension on the filename may be used to infer a MIME type.
 * media_type: describes the media type of the attached content.
 * format: further describes the format of the attachment if the media_type is not sufficient.
 * lastmod_time: a hint about when the content in this attachment was last modified.
 * data: a JSON object that gives access to the actual content of the attachment.
 * byte_count: lets the receiver guess how expensive it will be, in time, bandwidth, and storage, to fully fetch the attachment.
*/
export interface DIDCommAttachment{
    id?:            string; // it should be brief and MUST consist entirely of unreserved URI characters
    description?:   string; // [optional] A human-readable description of the content.
    filename?:      string; // A hint about the name that might be used if this attachment is persisted as a file. If this field is present and media_type is not, the extension on the filename may be used to infer a MIME type.
    media_type?:    string; // Describes the media type of the attached content.
    format?:        string; // Further describes the format of the attachment if the media_type is not sufficient.
    lastmod_time?:  string; // A hint about when the content in this attachment was last modified.
    data?:          DIDCommAttachmentContent; // A JSON object that gives access to the actual content of the attachment.
    byte_count?:    number; // Lets the receiver guess how expensive it will be, in time, bandwidth, and storage, to fully fetch the attachment.
}

/**
 * media_type: describes the media type of the attached content.
 * format: further describes the format of the attachment if the media_type is not sufficient.
 * data: only the hash in multihash format
*/
export interface DIDCommAttachmentBlockchain{
    media_type?:    string; // Describes the media type of the attached content.
    format?:        string; // Further describes the format of the attachment if the media_type is not sufficient.
    data?:          DIDCommAttachmentContentBlockchain; // only the hash in multihash format
}

// Only the hash in multihash format
export interface DIDCommAttachmentContentBlockchain {
    hash?:  string;     // The hash of the content encoded in multi-hash format. Used as an integrity check for the attachment, and MUST be used if the data is referenced via the links data attribute.
}

/** JWE deciphered for a concrete recipient */
/*
export interface PlainCompactJWM {
    protected:      ProtectedDataJWE;
    unprotected?:   UnprotectedDataJWE;
    recipient:      RecipientUnprotectedDataJWE;
    plaintext:      any;
}
*/

export interface DecipheredDIDCommJWE extends
    StandardJWE
{
    plaintext:      DIDCommMessage;
}

/** DIDComm Messaging is based on DIDs and their associated DID Documents.
 *  DID Rotation serves a very specific and narrow need to switch from one DID method to another.
 *  When a DID is rotated, the new DID is put into immediate use encrypting the message,
 *  and one additional attribute MUST be included as a message header:
 *  - from_prior: REQUIRED. A JWT, with sub: new DID and iss: prior DID, with a signature from a key authorized by prior DID.
 */
export interface DIDCommRotation extends
    DIDCommMessage
{
    from_prior: string; // REQUIRED. A JWT, with sub: new DID and iss: prior DID, with a signature from a key authorized by prior DID.
}

/*

{
    "type": "<sometype>",
    "to": ["did:example:mediator"],
    "body":{
        "attachment_id": "1",
        "encrypted_details": {
            "id": "x",
            "encrypted_to": "",
            "other_details": "about attachment"
        }
    },
    "attachments": [
        {
			"id": "1",
            "description": "example b64 encoded attachment",
            "data": {
            	"base64": "WW91ciBob3ZlcmNyYWZ0IGlzIGZ1bGwgb2YgZWVscw=="
        	}
        },{
			"id": "2",
            "description": "example linked attachment",
            "data": {
            	"hash": "<multi-hash>",
                "links": ["https://path/to/resource"]
        	}
        },{
			"id": "x",
            "description": "example encrypted DIDComm message as attachment",
            "media_type": "application/didcomm-encrypted+json",
            "data": {
            	"json": {
                    //jwe json structure
                }
        	}
        }
    ]
}


*/