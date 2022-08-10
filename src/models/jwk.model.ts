/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { DidPublicKeyOnDLT } from "./didPublicKey.model";
import { DigestResultOpenIdData } from "./Proof.model";


export enum KeyUseJWAlgorithm {
    enc = 'enc',
    sig = 'sig'
}

/** Public Key Algorithms (PKA) for cryptography can generate
 *  1) for signature operations:
 *  - a RSA public-private key-pair for use with the RSA algorithm (no PQC resistance),
 *  - an ECC public-private key pair for use with the ECC algorithm (no PQC resistance),
 *  - or a CRYSTALS-Dilithium key pair for use with the CRYSTALS-Dilithium algorithm (PQC resistance).
 *  2) for encryption operations:
 *  - a CRYSTALS-Kyber key pair for use with the CRYSTALS-Kyber algorithm (PQC resistance).
 *
 *  Public Key Algorithms (PKA) for cryptography:
 *  (https://www.ibm.com/docs/en/linux-on-systems?topic=verbs-pka-key-algorithms)
 * 
 *  - Rivest-Shamir-Adleman (RSA)
 *  - Elliptic Curve Cryptography (ECC)
 *  - Elliptic Curve Digital Signature Algorithm (ECDSA and EdDSA)
 *  - CRYSTALS-Dilithium Digital Signature Algorithm (CRDL-DSA)
 */
export enum JWAlgorithmKindUHC {
    // non-PQC sig
	ES256       = 'ES256',    // 'crv' is P-256
	ES384       = 'ES384',    // 'crv' is P-384
	ES512       = 'ES512',    // 'crv' is P-521 (not a typo) but not P-512.
    // PQC sig
    Dilithium3  = 'dilithium-6x5-r3',
    Dilithium5  = 'dilithium-8x7-r3',
    // PQC enc
    Kyber512    = 'Kyber-512',
    Kyber768    = 'Kyber-768',
    Kyber1024   = 'Kyber-1024'
}

/** It contains a list of JWKs */
export interface JWKeySet {
    // TODO: add additional properties
    keys?:           JWK[]; // same way as in SMART Health Claims
}

/** It stores a JSON Web Key Set and a timestamp (when it was last updated) */
export interface JWKeysFile extends 
    JWKeySet    // keys
{
    timestamp?:      number  // seconds in unix format
}

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
export interface DidVerificationPublicJWKey extends
    DidPublicKeyOnDLT
{
    /** The value of the public key in JWK format. Only one value field will be present ('k' for symmetric keys). */
    publicKeyJwk: PublicJWKeyCertificationOnDLT;
}


// -------- TODO: change the following types ------

/** Only JWK 'kid' property (keyID) is required for storing both key data and identifier on DLT: it is the hash of the JWK (RFC7638).
 *  It is RECOMMENDED that public keys JWKs use the value of kid as their fragment identifier.
 *  It is RECOMMENDED that JWK kid values are set to the public key fingerprint [RFC7638].
 *  It DOES NOT contain private information.
 */
export interface PublicJWKeyWithKidForDidOnDLT {
    alg?:   string; // JWAlgorithmKindUHC.Kyber768 | JWAlgorithmKindUHC.Kyber1024;
    kid:    string; // it is redundant here; also it is removed when calculating the thumbprint as key ID (kid)
    kty?:   string;
    use?:   KeyUseJWAlgorithm.enc | KeyUseJWAlgorithm.sig; // 'enc' or 'sig'
}

/** Kyber specifies three security levels: Kyber-512, Kyber-768, and Kyber-1024.
 *  It is a JSON Web Key that conforms to [RFC7517]. It MUST NOT contain private information.
 *  It is RECOMMENDED that public keys JWKs use the value of kid as their fragment identifier.
 *  It is RECOMMENDED that JWK kid values are set to the public key fingerprint [RFC7638].
 */
export interface JWKeyPublicVerificationDLT
    extends PublicJWKeyCertificationOnDLT   // does not extends JsonWebKey, only some properties are allowed
{
    alg:    string;             // JWAlgorithmKindUHC.Kyber768 | JWAlgorithmKindUHC.Kyber1024;
    k?:     string;             // base64-safe-url (no padding)
    kid:    string;             // it is redundant here; also it is removed when calculating the thumbprint as key ID (kid)
    use:    KeyUseJWAlgorithm.enc; // 'enc'
}

/** It is a JSON Web Key that conforms to [RFC7517]. It DOES NOT contain private information,
 *  but also it DOES NOT contain the PUBLIC KEY for Post Quantum Computing (PQC) resistance.
 *  It is RECOMMENDED that public keys JWKs use the value of kid as their fragment identifier.
 *  It is RECOMMENDED that JWK kid values are set to the public key fingerprint [RFC7638].
 *  So kid is both the digest value of the SHA-256 hash of the JWK object
 *  and the key id on the blockchain, but the asset id is the fully qualified
 *  DID URL Syntax identifier of this public key, e.g.: did:unid:person:<base58uuid>#base64-safe-url-KID
 */
export interface PublicJWKeyCertificationOnDLT
    // extends JsonWebKey   // does not extends JsonWebKey, only some properties are allowed
{
    alg:    string; // JWAlgorithmKindUHC.Kyber768 | JWAlgorithmKindUHC.Kyber1024;
    // kid: string; // it is redundant here; also it is removed when calculating the thumbprint as key ID (kid)
    kty:    string;
    use:    KeyUseJWAlgorithm.enc | KeyUseJWAlgorithm.sig; // 'enc' or 'sig'
}

/** The PractitionerRole or Device is like a DID document (the controller of the key).
 *  The controller will have the keys (so the index of keys is known by the controller).
 */
export interface PublicKeyFromSC {
    // controller is nor needed
    jwk: PublicJWKeyCertificationOnDLT;
    nbf: string; // non valid before
    exp: string; // expiration
}

export interface PublicKeyOnDLT extends
    PublicKeyFromSC
{
    $_createdAt?: string;
    $_revokedAt?: string;
}

/** For Key rotation (revoke old key and create a new one) it is needed to
 *  verify the owner has the old private key and the new private key
 *  so the SC MUST decrypt / verify a challenge (e.g.: UUID v4) with both old and new public keys.
 */
export interface KeyRotationRequestData {
    publicJWK: {
        new: JWK;   // kid and bytes
        old: JWK;   // kid and bytes
    };
    encryptedChallenge: {
        new: string; // Base64 URL Safe (UUID v4 as challenge string)
        old: string; // Base64 URL Safe (UUID v4 as challenge string)
    }
}


/** The asset ID is the certificate serial number */
export interface CertificateOnDLT {
    digest: DigestResultOpenIdData;
}

/** Public JWK for Thumbprint generation:
 *  https://www.ietf.org/id/draft-prorock-cose-post-quantum-signatures-00.html
 *  When calculating JWK Thumbprints [RFC7638], the four public key fields are included in the hash input in lexicographic order:
 *  "kty", "pset", and "x". (NOTE: 3 or 4 public key fields?? WHAT HAPPENS WITH "alg"??)
 *  - The parameter "alg"??
 *  - The parameter "kty" MUST be "PQK".
 *  - The parameter "pset" MUST be specfied to indicate the NIST level for the algorithm, e.g.: "3" for Crystals Dilithium 3.
 *  - The parameter "x" MUST be present and contain the public key encoded using the base64url [RFC4648] encoding.
 */
export interface PublicBaseDilithiumJWK {
    alg?:   string, // 'CRYDI2' (not recommended), 'CRYDI3' for Crystals Dilithium 3 or 'CRYDI5'
    kty?:   'PQK';  // 'PQK'
    pset?:  string; // MUST be specfied to indicate the NIST level for the algorithm, e.g.: "3" for Crystals Dilithium 3.
    x?:     string; // the public key for JWK it is Base64Url encoded, not bytes
}

/** CRYDI (Crystals Dilithium) Key Representations:
 *  https://www.ietf.org/id/draft-prorock-cose-post-quantum-signatures-00.html
 *  - The parameter "alg" MUST be specified: 'CRYDI2' (not recommended), 'CRYDI3' for Crystals Dilithium 3 or 'CRYDI5'
 *  - The parameter "kty" MUST be "PQK".
 *  - The parameter "pset" MUST be specfied to indicate the NIST level for the algorithm, e.g.: "3" for Crystals Dilithium 3.
 *  - The parameter "x" MUST be present and contain the public key encoded using the base64url [RFC4648] encoding.
 *  - The parameter "xs" MAY be present and contain the shake256 of the public key encoded using the base64url [RFC4648] encoding.
 */
 export interface PublicJWKeyDilithium {
    alg?:   string, // 'CRYDI2' (not recommended), 'CRYDI3' for Crystals Dilithium 3 or 'CRYDI5'
    kty?:   'PQK';  // 'PQK'
    x?:     string; // the public key for JWK it is Base64Url encoded, not bytes
    xs?:    string; // shake256 Base64Url encoded of the public key.
    kid?:   string; // Thumbprint is distinct from 'xs'
}


export interface PrivateJWKeyDilithium extends
    PublicJWKeyDilithium
{
    d?:     string; // private key encoded using the base64url encoding.
    ds?:    string; // shake256 of the private key encoded using the base64url encoding. This parameter MUST NOT be present for public keys.

}

/** Crystals Kyber Key Representations and Public Key Full Encoding
 *  https://www.ietf.org/id/draft-uni-qsckeys-00.html#name-kyber
 *  - The parameter "alg" MUST be specified: 'kyber768-r3', 'kyber-1024-r3', 'kyber512-90s-r3', 'kyber1024-90s-r3' (but not recommended 'kyber512-r3' or 'kyber512-90s-r3').
 *  - The parameter "kty" MUST be "PQK".
 *  - The parameter "x" MUST be present: public key encoded using the base64url [RFC4648] encoding (but without the 32 bytes of the seed "rho"). The size of t is 12*k*n/8 bytes.
 */
 export interface PublicBaseKyberJWK {
    alg?:   string; // 'kyber768-r3', 'kyber-1024-r3', 'kyber512-90s-r3', 'kyber1024-90s-r3' (but not recommended 'kyber512-r3' or 'kyber512-90s-r3').
    kty?:   'PQK';  // 'PQK'
    x?:     string; // the public key Base64Url encoded.
}

/** Crystals Kyber Key Representations and Public Key Full Encoding
 *  https://www.ietf.org/id/draft-uni-qsckeys-00.html#name-kyber
 *  - The parameter "kty" MUST be "PQK".
 *  - The parameter "alg" MUST be specified: 'kyber768-r3', 'kyber-1024-r3', 'kyber512-90s-r3', 'kyber1024-90s-r3' (but not recommended 'kyber512-r3' or 'kyber512-90s-r3').
 *  - The parameter "x" MUST be present: public key encoded using the base64url [RFC4648] encoding (but without the 32 bytes of the seed "rho"). The size of t is 12*k*n/8 bytes.
 *  - The parameter "h" (pk) MAY be present: SHA3-256 (by default for H) of the public key encoded using the base64url [RFC4648] encoding.
 *
 *  By default, Kyber uses SHAKE-128 as XOF, SHA3 for hashing and SHAKE-256 for PRF and KDF.
 *  The '90s' variants use AES256CTR to construct a XOF and a PRF, SHA2 for hashing and SHAKE-256 as KDF.
 *  (availability of hardware AES and SHA2 co-processors)
 */
export interface PublicJWKeyKyber {
    alg?:   string; // 'kyber768-r3', 'kyber-1024-r3', 'kyber512-90s-r3', 'kyber1024-90s-r3' (but not recommended 'kyber512-r3' or 'kyber512-90s-r3').
    kty?:   'PQK';  // 'PQK'
    h?:     string; // SHA3-256 (by default for H) Base64Url encoded of the public key.
    x?:     string; // the public key for JWK it is Base64Url encoded, not bytes
    // kid?: string // Thumbprint is not defined but 'h'
}
export interface PrivateJWKeyKyber extends
    PublicJWKeyKyber
{
    d?:     string; // private key encoded using the base64url encoding. This parameter MUST NOT be present for public keys.
}

// Field order is important, see https://tools.ietf.org/html/rfc7638#section-3.3 for details.
export interface PublicJWKeyECDSA {
    crv?: string;   // "P-256", "P-384", "P-521" (not 512), ...
    kty?: 'EC';     // "EC"
    kid?: string;   // Thumbprint
    x?: string;     // for JWK it is Base64Url encoded, not bytes
    y?: string;     // for JWK it is Base64Url encoded, not bytes
};

export interface PrivateJWKeyECDSA extends PublicJWKeyECDSA {
    d: string;
};

export interface ECDSAVerificationKey {
    key: PublicJWKeyECDSA
};

export interface VerificationKey {
    key: JWK
    country?: string
    externalAAD?: any 
};

export interface VerifierKeyWithBytes extends VerificationKey {} // its the same but with other name

interface RsaOtherPrimesInfo {
    d?: string;
    r?: string;
    t?: string;
};

/** JSON Web Key ([JWK]https://tools.ietf.org/html/rfc7517)
 *  "RSA", "EC", "OKP", and "oct" key types are supported
 *  https://www.ietf.org/id/draft-uni-qsckeys-00.html#name-kyber
 *  but also "PQK" (Post Quantum Key Pair)
 * 
 *  CRYDI (Crystals Dilithium) Key Representations
 *  https://www.ietf.org/id/draft-prorock-cose-post-quantum-signatures-00.html
 *  A new key type (kty) value "PQK" (Post Quantum Key Pair) is defined for public key algorithms that use base 64 encoded strings of the underlying binary materia as private and public keys and that support cryptographic sponge functions. It has the following parameters:
 *  - The parameter "kty" MUST be "PQK".
 *  - The parameter "alg" MUST be specified, it is "CRYDI3" for Crystals Dilithium 3.
 *  - The parameter "pset" MUST be specfied to indicate the NIST level for the algorithm, e.g.: "3" for Crystals Dilithium 3.
 *  - The parameter "x" MUST be present and contain the public key encoded using the base64url [RFC4648] encoding.
 *  - The parameter "xs" MAY be present and contain the shake256 of the public key encoded using the base64url [RFC4648] encoding.
 *  - The parameter "d" MUST be present for private keys and contain the private key encoded using the base64url encoding. This parameter MUST NOT be present for public keys.
 *  - The parameter "ds" MAY be present for private keys and contain the shake256 of the private key encoded using the base64url encoding. This parameter MUST NOT be present for public keys.
 *  - Additionally, the parameter "use" contains "sig" (signature).
 *
 *  Crystals Kyber Public Key Full Encoding
 *  https://www.ietf.org/id/draft-uni-qsckeys-00.html#name-kyber
 *  - The parameter "t" MUST be present and contain the public key encoded using the base64url [RFC4648] encoding (but without the 32 bytes of the seed "rho"). The size of t is 12*k*n/8 bytes.
 *  - The parameter "H"(pk) MAY be present and contain the SHA3-256 (by default for H) of the public key encoded using the base64url [RFC4648] encoding.
 *  - The parameter "d" MUST be present for private keys and contain the partial encoded private key using the base64url encoding. This parameter MUST NOT be present for public keys.
 *  - The parameter "kty" MUST be "PQK".
 *  - The parameter "alg" MUST be specified, it is "kyber768-r3".
 *  - Additionally, the parameter "use" contains "enc" (encryption).
 */
 export interface JWK {
    /** JWK "alg" (Algorithm) Parameter */
    alg?: string;
    crv?: string;
    d?: string;     // private key for EC, PQK (Post Quantum Keypair)
    dp?: string;
    dq?: string;
    ds?: string;    // for private Crystals Dilithium PQK (shake256 of the private key, encoded using the base64url encoding)
    e?: string;
    /** JWK "ext" (Extractable) Parameter */
    ext?: boolean;
    h?: string;     // By default, the SHA3-256 of the public Kyber PQK, encoded using the base64url [RFC4648] encoding.
    k?: string;
    /** JWK "key_ops" (Key Operations) Parameter */
    key_ops?: string[];
    /** JWK "kid" (Key ID) Parameter */
    kid?: string;
    /** JWK "kty" (Key Type) Parameter */
    kty?: string;
    n?: string;
    oth?: Array<{   // RsaOtherPrimesInfo[];
        d?: string;
        r?: string;
        t?: string;
    }>;
    p?: string;
    pset?: string; // for Crystals Dilithium PQK
    q?: string;
    qi?: string;
    t?: string;  // for Kyber PQK: public key encoded using the base64url [RFC4648] encoding (but without the 32 bytes of the seed "rho"). The size of t is 12*k*n/8 bytes.
    /** JWK "use" (Public Key Use) Parameter */
    use?: string;
    x?: string | Uint8Array;
    xs?: string;    // for public Crystals Dilithium PQK (shake256 of the public key encoded using the base64url encoding)
    y?: string | Uint8Array;
    /** JWK "x5c" (X.509 Certificate Chain) Parameter */
    x5c?: string[];
    /** JWK "x5t" (X.509 Certificate SHA-1 Thumbprint) Parameter */
    x5t?: string;
    /** "x5t#S256" (X.509 Certificate SHA-256 Thumbprint) Parameter */
    'x5t#S256'?: string;
    /** JWK "x5u" (X.509 URL) Parameter */
    x5u?: string;
    [propName: string]: unknown;
}