/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { DidDocumentService } from "./didDocument.model";

/** IMPORTANT!
 * The Out-of-band protocol is used when an agent doesn't know if it has a connection with another agent.
 * Any Published DID document that expresses support for DIDComm by defining a "service" in the document
 * that follows the DIDComm conventions serves as an implicit invitation.
 * If an invitee (Bob) wishes to connect to any Published DID (Alice) because Bob knows that DID, they need not wait for an out-of-band invitation message.
 * Rather, they (Bob) can designate their own label and initiate the appropriate protocol (e.g. 0160-Connections or 0023-DID-Exchange) for establishing a connection.
 */

/** Notes for ONLINE out-of-band implicit connection invitation and connection protocol flow:
 * 1. Inviter (Alice) creates Invitation ID as parent thread ID when creating invitation.
 * 2. Inviter (Alice) does not exposes their public key in the QR but their UniversalID as URN (not DID as in Hyperledger Aries).
 * 3. Invitee (Bob) request for connection (and permissions) accepting the invitation (use the same ID for invitiation and for connection request)
 * and shares its UniversalID and the public encryption key ID (KID) by sending the DID document to Inviter.
 */

 export const ProtocolVersionOOBv2 = "2.0"
 
 /** "https://didcomm.org/out-of-band/2.0/invitation" */
 export const TypeDIDCommOutOfBandv2 = "https://didcomm.org/out-of-band/" + ProtocolVersionOOBv2 + "/invitation"

 /** Out-of-band (OOB) goal codes */
 export enum GoalCodeOOB {
    // from Aries RFC 0434 (out-of-band): https://github.com/hyperledger/aries-rfcs/blob/main/features/0434-outofband
    "issue-vc"      =  "issue-vc",      // To issue a credential
    "request-proof" = "request-proof",  // To request a proof
    "create-account"= "create-account", // To create an account with a service
    "p2p-messaging" = "p2p-messaging"   // To establish a peer-to-peer messaging relationship    
 }

/**
 *  When using an DIDComm Out-of-band message the data is public (not encrypted)
 *  and the data of the Out-of-band protocol is in the `body` property of the DIDComm message as per the specification.
 *  See https://identity.foundation/didcomm-messaging/spec/#out-of-band-messages. 
 *  - goal_code: reading left to right, goal codes strings convey meaning that gets more specific as the string progresses.
 *  In order to avoid collision between different efforts and goal codes, goal codes defined outside of the spec
 *  MUST use Reverse Domain Name Notation with the associated effort’s domain as a prefix: com.example.category.specific.
 *  Any structure after the domain name portion is acceptable; DIDComm v1 proposed some conventions that may be useful.
 *  - label: title of the invitation for the creator (inviter).
 *  - goal: description for the recipient (invitee).
 *  - goal_code: reading left to right, goal codes strings convey meaning that gets more specific as the string progresses.
 *  In order to avoid collision between different efforts and goal codes, goal codes defined outside of the spec
 *  MUST use Reverse Domain Name Notation with the associated effort’s domain as a prefix: com.example.category.specific.
 *  - services: it contain the service endpoint used to transmit the response.
 */
export interface InvitationOutOfBand {
   accept?:                string[];                        // e.g.: ["didcomm/aip2;env=rfc587", "didcomm/aip2;env=rfc19"]
   handshake_protocols?:   string[];                        // e.g.: ["https://didcomm.org/didexchange/1.0","https://didcomm.org/connections/1.0"]
   label?:                 string;                          // label is like "subject" in an email, e.g.: "Invitation to connect with Alice",
   goal?:                  string;                          // e.g.: "To issue a Faber College Graduate credential",
   goal_code?:             string;                          // e.g.: "p2p-messaging",
   services?:              (string | InvitationService)[];  // e.g.: ["did:sov:LjgpST2rjsoxYegQDRm7EL"]
}

/** The service endpoint used to transmit the response is either present in the out-of-band message or available in the DID Document of a presented DID.
 * If the endpoint is itself a DID, the serviceEndpoint in the DIDDoc of the resolved DID MUST be a URI, and the recipientKeys MUST contain a single key.
 * That key is appended to the end of the list of routingKeys for processing. For more information about message forwarding and routing, see RFC 0094 Cross Domain Messaging.
 */
export interface InvitationService extends
   DidDocumentService
{
   id:               string;   // "#inline",
   recipientKeys?:   string[]; // e.g.: ["did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH"],
   routingKeys?:     string[];
   serviceEndpoint:  string | object;   // e.g.: "https://example.com:5000/ssi"
   type:             string;   // "did-communication",
}