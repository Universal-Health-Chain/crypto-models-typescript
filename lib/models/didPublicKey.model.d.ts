/** Interface defining a public key definition entry in a DID Document.
 *  See: https://w3c-ccg.github.io/did-spec/#public-keys
 *
 *  - id: fully qualified identifier of this public key, e.g. did:example:entity.id#keys-1.
 *    NOTE: generate the 'thumbprint' in case of JSON Web Key format (RFC7638).
 *  - type: the type of this public key, such as JsonWebKey2020 as defined in https://w3c-ccg.github.io/ld-cryptosuite-registry/
 *  - controller: the DID of the controller of this key.
 */
export interface DidPublicKeyOnDLT {
    id: string;
    type: string;
    controller: string;
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
export interface DidDocumentPublicKey extends DidPublicKeyOnDLT {
    publicKeyPem?: string;
    publicKeyJwk?: object;
    publicKeyMultibase?: string;
    /** The value of the public key in hex format. Only one value field will be present. */
    publicKeyHex?: string;
    /** The value of the public key in Base64 format. Only one value field will be present. */
    publicKeyBase64?: string;
    /** The value of the public key in Base58 format. Only one value field will be present. */
    publicKeyBase58?: string;
}
