import { DigestResultOpenIdData } from "./oidc4ida.common.model";
export declare enum KeyUseJWAlgorithm {
    enc = "enc",
    sig = "sig"
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
export declare enum JWAlgorithmKindUHC {
    ES256 = "ES256",
    ES384 = "ES384",
    ES512 = "ES512",
    Dilithium3 = "dilithium-6x5-r3",
    Dilithium5 = "dilithium-8x7-r3",
    Kyber512 = "Kyber-512",
    Kyber768 = "Kyber-768",
    Kyber1024 = "Kyber-1024"
}
/** It contains a list of JWKs */
export interface JWKeySet {
    keys?: JWK[];
}
/** It stores a JSON Web Key Set and a timestamp (when it was last updated) */
export interface JWKeysFile extends JWKeySet {
    timestamp?: number;
}
/** Only JWK 'kid' property (keyID) is required for storing both key data and identifier on DLT: it is the hash of the JWK (RFC7638).
 *  It is RECOMMENDED that public keys JWKs use the value of kid as their fragment identifier.
 *  It is RECOMMENDED that JWK kid values are set to the public key fingerprint [RFC7638].
 *  It DOES NOT contain private information.
 */
export interface PublicJWKeyWithKidForDidOnDLT {
    alg?: string;
    kid: string;
    kty?: string;
    use?: KeyUseJWAlgorithm.enc | KeyUseJWAlgorithm.sig;
}
/** Kyber specifies three security levels: Kyber-512, Kyber-768, and Kyber-1024.
 *  It is a JSON Web Key that conforms to [RFC7517]. It MUST NOT contain private information.
 *  It is RECOMMENDED that public keys JWKs use the value of kid as their fragment identifier.
 *  It is RECOMMENDED that JWK kid values are set to the public key fingerprint [RFC7638].
 */
export interface JWKeyPublicVerificationDLT extends PublicJWKeyCertificationOnDLT {
    alg: string;
    k?: string;
    kid: string;
}
/** It is a JSON Web Key that conforms to [RFC7517]. It DOES NOT contain private information,
 *  but also it DOES NOT contain the public key nor the key ID (thumbprint) for Post Quantum Computing (PQC) resistance.
 */
export interface PublicJWKeyCertificationOnDLT {
    alg?: string;
    exp?: string;
    kty?: string;
    nbf?: string;
    use?: string;
}
/** For Key rotation (revoke old key and create a new one) it is needed to
 *  verify the owner has the old private key and the new private key
 *  so the SC MUST decrypt / verify a challenge (e.g.: UUID v4) with both old and new public keys.
 */
export interface KeyRotationRequestData {
    publicJWK: {
        new: JWK;
        old: JWK;
    };
    encryptedChallenge: {
        new: string;
        old: string;
    };
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
    alg?: string;
    kty?: 'PQK';
    pset?: string;
    x?: string;
}
/** CRYDI (Crystals Dilithium) Key Representations:
 *  https://www.ietf.org/id/draft-prorock-cose-post-quantum-signatures-00.html
 *  - The parameter "alg" MUST be specified: 'CRYDI2' (not recommended), 'CRYDI3' for Crystals Dilithium 3 or 'CRYDI5'
 *  - The parameter "kty" MUST be "PQK".
 *  - The parameter "pset" MUST be specfied to indicate the NIST level for the algorithm, e.g.: "3" for Crystals Dilithium 3.
 *  - The parameter "x" MUST be present and contain the public key encoded using the base64url [RFC4648] encoding.
 *  - The parameter "xs" MAY be present and contain the shake256 of the public key encoded using the base64url [RFC4648] encoding.
 */
export interface PublicJWKeyDilithium extends PublicJWKeyCertificationOnDLT, PublicBasePQKey {
    alg?: string;
    kid?: string;
    kty?: 'PQK';
    x?: string;
    xs?: string;
}
export interface PrivateJWKeyDilithium extends PublicJWKeyDilithium {
    d?: string;
    ds?: string;
}
/** Crystals Kyber Key Representations and Public Key Full Encoding
 *  https://www.ietf.org/id/draft-uni-qsckeys-00.html#name-kyber
 *  - The parameter "alg" MUST be specified: 'kyber768-r3', 'kyber-1024-r3', 'kyber512-90s-r3', 'kyber1024-90s-r3' (but not recommended 'kyber512-r3' or 'kyber512-90s-r3').
 *  - The parameter "kty" MUST be "PQK".
 *  - The parameter "x" MUST be present: public key encoded using the base64url [RFC4648] encoding (but without the 32 bytes of the seed "rho"). The size of t is 12*k*n/8 bytes.
 */
export interface PublicBasePQKey {
    alg?: string;
    kty?: 'PQK';
    x?: string;
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
export interface PublicJWKeyKyber extends PublicJWKeyCertificationOnDLT, PublicBasePQKey {
    alg?: string;
    kty?: 'PQK';
    h?: string;
}
export interface PrivateJWKeyKyber extends PublicJWKeyKyber {
    d?: string;
}
export interface PublicJWKeyECDSA {
    crv?: string;
    kty?: 'EC';
    kid?: string;
    x?: string;
    y?: string;
}
export interface PrivateJWKeyECDSA extends PublicJWKeyECDSA {
    d: string;
}
export interface ECDSAVerificationKey {
    key: PublicJWKeyECDSA;
}
export interface VerificationKey {
    key: JWK;
    country?: string;
    externalAAD?: any;
}
export interface VerifierKeyWithBytes extends VerificationKey {
}
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
export interface JWK extends PublicJWKeyCertificationOnDLT {
    /** JWK "alg" (Algorithm) Parameter */
    alg?: string;
    crv?: string;
    d?: string;
    dp?: string;
    dq?: string;
    ds?: string;
    e?: string;
    /** JWK "ext" (Extractable) Parameter */
    ext?: boolean;
    h?: string;
    k?: string;
    /** JWK "key_ops" (Key Operations) Parameter */
    key_ops?: string[];
    /** JWK "kid" (Key ID) Parameter */
    kid?: string;
    /** JWK "kty" (Key Type) Parameter */
    kty?: string;
    n?: string;
    oth?: Array<{
        d?: string;
        r?: string;
        t?: string;
    }>;
    p?: string;
    pset?: string;
    q?: string;
    qi?: string;
    t?: string;
    /** JWK "use" (Public Key Use) Parameter */
    use?: string;
    x?: string | Uint8Array;
    xs?: string;
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
    sub: string;
}
