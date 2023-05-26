import { JWK, PublicJWKeyCertificationOnDLT } from "./jwk.model";
/** NOTES:
 *  Public Key traceability stores the kid (key ID) asset using the fully qualified DID URL Syntax of the public key.
 *  It is RECOMMENDED that public keys JWKs use the value of kid as their fragment identifier.
 *  It is RECOMMENDED that JWK kid values are set to the public key fingerprint [RFC7638].
 */
/** The Verification Method is a set of parameters that can be used together with a process to independently verify a proof.
 *  For example, a cryptographic public key can be used as a verification method:
 *  it verifies that the owner possessed the associated cryptographic private key.
 *  https://www.w3.org/TR/did-core/#verification-method-properties
 *
 *  - id: fully qualified identifier of this public key, e.g. did:example:entity.id#keys-1.
 *    NOTE: generate the 'thumbprint' in case of JSON Web Key format (RFC7638).
 *  - 'type': string that references exactly one verification method type, such as JsonWebKey2020 (see https://www.w3.org/TR/did-spec-registries/ ).
 *  - 'controller': the DID of the controller of this key.
 *  - 'publicKeyJwk': JSON Web Key that conforms to RFC7517. It MUST NOT contain private information.
 */
export interface DidVerificationPublicJWKey extends DidPublicKeyForSC {
    /** The value of the public key in JWK format. Only one value field will be present ('k' for symmetric keys). */
    publicKeyJwk: JWK;
}
/** Based on: https://w3c-ccg.github.io/did-spec/#public-keys
*
*  - controller: hashed DID of the controller / owner of this key.
*  - type: the type of this public key, such as JsonWebKey2020 as defined in https://w3c-ccg.github.io/ld-cryptosuite-registry/
*/
export interface DidPublicKeyOnBlockchain {
    controller: string;
    publicJwk?: PublicJWKeyCertificationOnDLT;
    type: string;
}
/** Interface defining a public key definition entry in a DID Document.
 *  See: https://w3c-ccg.github.io/did-spec/#public-keys
 *
 *  - id: fully qualified identifier of this public key, e.g. did:example:entity.id#keys-1.
 *    NOTE: generate the 'thumbprint' in case of JSON Web Key format (RFC7638).
 *  - type: the type of this public key, such as JsonWebKey2020 as defined in https://w3c-ccg.github.io/ld-cryptosuite-registry/
 *  - controller: the DID of the controller of this key.
 */
export interface DidPublicKeyForSC extends DidPublicKeyOnBlockchain {
    id: string;
}
/** Interface defining a public key definition entry in a DID Document.
*  See: https://w3c-ccg.github.io/did-spec/#public-keys
*  NOTE: publicKeyMultibase INSTEAD of publicKeyHex, publicKeyBase64, publicKeyBase58 (deprecated).
*
*  - id: fully qualified identifier of this public key, e.g. did:example:entity.id#keys-1.
*    NOTE: generate the 'thumbprint' in case of JSON Web Key format (RFC7638).
*  - type: the type of this public key, as defined in https://w3c-ccg.github.io/ld-cryptosuite-registry/
*  - controller: the DID of the controller of this key.
*  - publicKeyPem: The value of the public key in PEM format. Only one value field will be present.
*  - publicKeyJwk: The value of the public key in JWK format. Only one value field will be present.
*  - publicKeyMultibase: The value of the public key in Multibase format. Only one value field will be present.
*/
export interface DidDocumentPublicKey extends DidPublicKeyForSC {
    /** The value of the public key in Base58 format. Only one value field will be present. */
    /** The value of the public key in Base64 format. Only one value field will be present. */
    /** The value of the public key in hex format. Only one value field will be present. */
    publicKeyJwk?: object;
    publicKeyMultibase?: string;
    publicKeyPem?: string;
}
