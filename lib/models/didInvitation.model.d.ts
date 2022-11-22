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
export declare const ProtocolVersionOOBv2 = "2.0";
export declare const TypeDIDCommOutOfBandv2: string;
/** Out-of-band (OOB) goal codes */
export declare enum GoalCodeOOB {
    "issue-vc" = "issue-vc",
    "request-proof" = "request-proof",
    "create-account" = "create-account",
    "p2p-messaging" = "p2p-messaging"
}
