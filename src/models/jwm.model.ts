/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

export interface CommonPayloadJWM {
    body:           any;        // REQUIRED. The body attribute contains all the message type specific attributes of the message type indicated in the type attribute. This attribute MUST be present, even if empty. It MUST be a JSON object conforming to RFC 7159.
    created_time?:  string;     // OPTIONAL. Message Created Time. The created_time attribute is used for the sender to express when they created the message, expressed in UTC Epoch Seconds (seconds since 1970-01-01T00:00:00Z UTC) [link](1970-01-01T00:00:00Z UTC). This attribute is informative to the recipient, and may be relied on by protocols.
    expires_time?:  string;     // OPTIONAL. Message Expired Time. The expires_time attribute is used for the sender to express when they consider the message to be expired, expressed in UTC Epoch Seconds (seconds since 1970-01-01T00:00:00Z UTC) [link](1970-01-01T00:00:00Z UTC). This attribute signals when the message is considered no longer valid by the sender. When omitted, the message is considered to have no expiration by the sender.
    from?:          string;     // OPTIONAL: when the message is to be encrypted via anoncrypt. REQUIRED when the message is encrypted via authcrypt. Sender identifier. The from attribute MUST be a string that is a valid DID or DID URL (without the fragment component) which identifies the sender of the message. When a message is encrypted, the sender key MUST be authorized for encryption by this DID. Authorization of the encryption key for this DID MUST be verified by message recipient with the proper proof purposes. When the sender wishes to be anonymous using authcrypt, it is recommended to use a new DID created for the purpose to avoid correlation with any other behavior or identity. Peer DIDs are lightweight and require no ledger writes, and therefore a good method to use for this purpose. See the message authentication section for additional details.
    id:             string;     // REQUIRED. Message ID. The id attribute value MUST be unique to the sender.
    to?:            string[];   // OPTIONAL. Identifier(s) for recipients. MUST be an array of strings where each element is a valid DID or DID URL (without the fragment component) that identifies a member of the message's intended audience. These values are useful for recipients to know which of their keys can be used for decryption. It is not possible for one recipient to verify that the message was sent to a different recipient.
    type:           string;     // REQUIRED. Plaintext message type ('<message-type-uri>'), useful for message handling in application-level protocols. The type attribute value MUST be a valid Message Type URI, that when resolved gives human readable information about the message. The attribute's value SHOULD predict the content in the body of the message.
}

export interface StandardPayloadJWM extends
    CommonPayloadJWM
{
    reply_to?:      string;     // OPTIONAL. Define who a response to the message should be sent to
    reply_url?:     string;     // OPTIONAL. Define a url to which a response to the message can be sent (StringOrURI value)
    thread_id?:     string;     // OPTIONAL: to associate the JWM to a group of related messages often referred to as a thread.
}