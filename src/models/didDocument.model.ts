/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { DidDocumentPublicKey } from "./didPublicKey.model";

/** CHANGES:
 *  1. Replacement of publicKeyBase58 with publicKeyMultibase to encode Raw binary data.
 *  Multibase is to differentiate one base-encoding from another: z (Base58), u (base64url)
 *  https://datatracker.ietf.org/doc/html/draft-multiformats-multibase-03#appendix-D.1
 *
 *  2. Use publicKeyJwk. It is a map representing a JSON Web Key that conforms to [RFC7517].
 *  The map MUST NOT contain "d", or any other members of the private information class as described in Registration Template.
 *  It is RECOMMENDED that verification methods that use JWKs [RFC7517]
 *  to represent their public keys use the value of kid as their fragment identifier.
 *  It is RECOMMENDED that JWK kid values are set to the public key fingerprint [RFC7638].
 */

/** To verify a change of DID controller, implementers are advised to authenticate
 *  the new DID controller against the verification methods in the revised DID document
 *  https://www.w3.org/TR/did-core/#did-controller
 */

/** DID datetime: A JSON String serialized as an XML Datetime normalized to UTC 00:00:00
 *  and without sub-second decimal precision (without miliseconds).
 *  For example: 2020-12-20T19:17:47Z
 */

/** 9.17 Level of Assurance (LOA): https://www.w3.org/TR/did-core/#level-of-assurance
 * Level of assurance frameworks are classified and defined by regulations and standards
 * such as eIDAS, NIST 800-63-3 and ISO/IEC 29115:2013, including their requirements for the security context,
 * and making recommendations on how to achieve them.
 * This might include strong user authentication where FIDO2/WebAuthn can fulfill the requirement.
 *
 * Whether and how to encode this information in the DID document data model is out of scope of the specification:
 * 1) the information could be transmitted using Verifiable Credentials [VC-DATA-MODEL], and
 * 2) the DID document data model can be extended to incorporate this information
 *    as described in § 4.1 Extensibility, and where § 10. Privacy Considerations is applicable for such extensions.
 */

/**
 * Defines a service descriptor entry present in a DID Document.
 */
 export interface DidDocumentServiceDescriptor {

    /** The fully-qualified ID of this service, e.g. `did:example:me.id;agent`. */
    id: string;
    
    /** The endpoint of this service, as a URI or JSON-LD object. */
    serviceEndpoint: string | object;

    /** The type of this service. */
    type: string;
}

/**
 * Interface describing the expected shape of a Decentralized Identity Document.
 * https://www.w3.org/TR/did-core/#core-properties
 */
export interface DidDocument {

   /** The standard context for DID Documents if 'application/did+ld+json'
    * but not for 'application/did+json'
    * https://www.w3.org/TR/did-core/#representations
    */
   '@context'?:  'https://w3id.org/did/v1'; // only for output, to be removed before storing on blockchain

   /** A set of strings that conform to the rules of [RFC3986] for URIs. */
   alsoKnownAs?:         string[]; // not for DLT

   assertionMethod?: 	    any;

   /** Array of authentication methods.
    * A set of either Verification Method maps that conform to the rules in Verification Method properties
    * or strings that conform to the rules in 3.2 DID URL Syntax.
    */
   authentication?: (string | object)[];

   /** Mechanism that might be used by the DID subject to delegate a cryptographic capability to another party,
    *  such as delegating the authority to access a specific HTTP API to a subordinate.
    *  When a DID controller chooses to delegate their capability to access a protected HTTP API to a party other than themselves.
    *  the delegation of the capability could be expressed in a number of ways,
    *  e.g., as a digitally signed message that is placed into the HTTP Headers
    *  (such as an OpenID "Bearer" access token containing the required scope and signed by the controller of the DID Document).
    *  See https://www.w3.org/TR/did-core/#capability-delegation
    */
   capabilityDelegation?: (string | DidDocumentPublicKey)[];

   /** Verification method that might be used by the DID subject to invoke a cryptographic capability,
    *  such as the authorization to update the DID Document.
    *  When a DID subject needs to access a protected HTTP API that requires authorization in order to use it,
    *  the invocation of the capability could be expressed in a number of ways,
    *  e.g., as a digitally signed message that is placed into the HTTP Headers
    *  (such as an OpenID "Bearer" access token containing the required scope and signed by the controller of the DID Document).
    *  See https://www.w3.org/TR/did-core/#capability-invocation
    */
   capabilityInvocation?: (string | DidDocumentPublicKey)[];

   /** A string or a set of strings that conform to the rules in § 3.1 DID Syntax. */
   controller?: 	          any;

   /** The DID to which this DID Document pertains. */
   id?: string; // only for output, to be removed before storing on blockchain

   keyAgreement?: 	        any;

   /** Array of public keys associated with the DID. */
   publicKey?: DidDocumentPublicKey[];

   /** Array of services associated with the DID. */
   service?: DidDocumentServiceDescriptor[];

   /** A set of Verification Method maps that conform to the rules in § Verification Method properties. */
   verificationMethod?: 	  any;
}

/** DidDetailsBlockchain is similar to DidUrlResolution with additional data on the blockchain (can be duplicated on the local DB or not).
 *  Some DID parameters are completely independent of any specific DID method and function the same way for all DIDs.
 *  Other DID parameters are not supported by all DID methods: https://www.w3.org/TR/did-core/#did-parameters
 *  - txn and txTime are non-standard parameters.
 *  - hl (HashLink) example: "did:example:123?hl=zQmWvQxTqbG2Z9HPJgG57jjwR154cKhbtJenbyYTWkjgF3e"
 *  - versionTime: identifies a certain version timestamp of a DID document to be resolved. The DID document was valid for a DID at a certain time.
 *  The datetime value MUST be normalized to UTC 00:00:00 (seconds, without sub-second decimal precision).
 * 	Example of request using "versionTime" parameter: "did:example:123?versionTime=2016-10-17T02:41:00Z"
 */
export interface DidDetailsBlockchain {
	active:        boolean;  
	hl:            string;  // HashLink
	versionId:     string;  // identifies a specific version of a DID document to be resolved (the version ID could be sequential, or a UUID, or method-specific).
	versionTime:   string;  // identifies a certain version timestamp of a DID document to be resolved. The DID document was valid for a DID at a certain time. This datetime value MUST be normalized to UTC 00:00:00 and without sub-second decimal precision.
	txn?:          string;
	txTime?:       string;
}

/** DID URL dereferencer implementations will reference [DID-RESOLUTION] for additional implementation details. */
export interface DidUrlResolution {
    /** Resource hash of the DID document to add integrity protection, as specified in [HASHLINK]. This parameter is non-normative. */
    hl?:  string;

    /**
     * A relative URI reference according to RFC3986 Section 4.2 that identifies a resource at a service endpoint,
     * which is selected from a DID document by using the service parameter.
     * If present, the associated value MUST be an ASCII string and MUST use percent-encoding for certain characters as specified in RFC3986 Section 2.1.
     */
    relativeRef?: string;

    /** Identifies a service from the DID document by service ID. If present, the associated value MUST be an ASCII string */
    // service

    /**
    * versionId identifies a specific version of a DID document to be resolved (the version ID could be sequential, or a UUID, or method-specific).
    * If present, the associated value MUST be an ASCII string.
    */
    versionId?: string;

    /**
     * versionTime identifies a certain version timestamp of a DID document to be resolved.
     * That is, the DID document that was valid for a DID at a certain time.
     * If present, the associated value MUST be an ASCII string which is a valid XML datetime value,
     * as defined in section 3.3.7 of W3C XML Schema Definition Language (XSD) 1.1 Part 2: Datatypes [XMLSCHEMA11-2].
     * This datetime value MUST be normalized to UTC 00:00:00 and without sub-second decimal precision.
     * For example: 2020-12-20T19:17:47Z (WITHOUT miliseconds)
     */
    versionTime?: string;
}

/**
 * 7.1.3 - DID Document Metadata
 *  The possible properties within this structure and their possible values
 *  SHOULD be registered in the DID Specification Registries [DID-SPEC-REGISTRIES].
 *  DID URL dereferencer implementations will reference [DID-RESOLUTION] for additional implementation details.
 *  The specification defines the following common properties:
 *
 *  - created: DID document metadata SHOULD include a created property to indicate the timestamp of the Create operation.
 *    The value of the property MUST be a string formatted as an XML Datetime normalized to UTC 00:00:00 and without sub-second decimal precision.
 *    For example: 2020-12-20T19:17:47Z.
 *
 *  - updated: metadata SHOULD include an updated property to indicate the timestamp of the last Update operation for the document version which was resolved.
 *    The value of the property MUST follow the same formatting rules as the created property.
 *    The updated property is omitted if an Update operation has never been performed on the DID document.
 *    If an updated property exists, it can be the same value as the created property when the difference between the two timestamps is less than one second.
 *
 *  - deactived: true or false (default). Deactivation data is be the updated date.
 *
 *  - versionId: metadata SHOULD include a versionId property to indicate the version of the last Update operation for the document version which was resolved.
 *    The value of the property MUST be an ASCII string.
 *    It can be the Transaction ID in Base58 encoding when updating the DID Document.
 *
 *  - equivalentId: e.g. FHIR resource id?
 *
 *  - canonicalId: is identical to the equivalentId property except:
 *    - a) it is associated with a single value rather than a set, and
 *    - b) the DID is defined to be the canonical ID for the DID subject within the scope of the containing DID document.
 */
export interface MetaDidDocument extends DidUrlResolution {
  created?:       string;
  updated?:       string;
  deactivated?:   boolean;  // deactivation data will be the updated date.
  versionId?:     string;
  nextUpdate?:    string;
  nextVersionId?: string;
  equivalentId?:  string;
  canonicalId?:   string;
}

