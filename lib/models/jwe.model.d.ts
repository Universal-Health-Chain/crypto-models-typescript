/** 3.1. JWE Compact Serialization Overview
 *  In the JWE Compact Serialization, no JWE Shared Unprotected Header or JWE Per-Recipient Unprotected Header are used.
 *  In this case, the JOSE Header and the JWE Protected Header are the same.
 *  In the JWE Compact Serialization, a JWE is represented as the concatenation:
 *      BASE64URL(UTF8(JWE Protected Header)) || '.' ||
 *      BASE64URL(JWE Encrypted Key) || '.' ||
 *      BASE64URL(JWE Initialization Vector) || '.' ||
 *      BASE64URL(JWE Ciphertext) || '.' ||
 *      BASE64URL(JWE Authentication Tag)
 *
 *  3.2. JWE JSON Serialization Overview
 *  In the JWE JSON Serialization, one or more of the JWE Protected Header,
 *  JWE Shared Unprotected Header, and JWE Per-Recipient Unprotected Header MUST be present.
 *  In this case, the members of the JOSE Header are the union of the members of the JWE Protected Header,
 *  JWE Shared Unprotected Header, and JWE Per-Recipient Unprotected Header values that are present.
 *
 * In the JWE JSON Serialization, a JWE is represented as a JSON object containing some or all of these eight members:
 *  - "protected", with the value BASE64URL(UTF8(JWE Protected Header))
 *  - "unprotected", with the value JWE Shared Unprotected Header
 *  - "header", with the value JWE Per-Recipient Unprotected Header
 *  - "encrypted_key", with the value BASE64URL(JWE Encrypted Key)
 *  - "iv", with the value BASE64URL(JWE Initialization Vector)
 *  - "ciphertext", with the value BASE64URL(JWE Ciphertext)
 *  - "tag", with the value BASE64URL(JWE Authentication Tag)
 *  - "aad", with the value BASE64URL(JWE AAD)
 */
import { JWK } from "./jwk.model";
/**
 *  - protected: Encoded a base64-url string containing the 'enc' performed on the plaintext (e.g.: "A256GCM") and the 'typ' (e.g.: "didcomm-envelope-enc").
 *  - unprotected:  e.g.: jku
 *  - recipients: CEK encrypted to each recipient (ephemeral anoncrypt key encrypted per recipient).
 *
 *  Distinguishing JWE Objects (from JWS or others):
 *  The code should examine presence of 'payload', 'ciphertext' or 'enc' properties in JWE, or by checking the value of 'alg'.
 *  JWSs have a "payload" member and JWEs do not. JWEs have a "ciphertext" member and JWSs do not.
 */
export interface BaseJWE {
    protectedHdersJWE: string;
    unprotected?: UnprotectedHdersJWE;
    recipients: RecipientDataJWE[];
}
/**
 *  - protected: decoded data containing the encryption algorithm ('enc') performed on the plaintext (e.g.: "A256GCM") and the 'typ' (e.g.: "didcomm-envelope-enc")
 *  - unprotected: additional data such as 'jku'.
 *  - recipients: list of recipients identified by its keyID (kid, the 'thumprint' of their public JWK. When it is not encrypted has no sense storing the CEK (e.g.: when creating before encryption).
 *  - plaintext: not only text but unencrypted data (e.g.: a JSON object) to be encrypted as 'cipertext' for data storage and data exchange ('plaintext' is removed when encrypted).
 */
export interface UnencryptedJWE {
    protectHdersDecoded?: ProtectHdersDecoded;
    unprotected?: UnprotectedHdersJWE;
    recipients?: RecipientDataJWE[];
    plaintext?: any;
}
/** It has:
 *  - 'plaintextBytes
 *  - 'ciphertext': Base64 URL Safe
 *  - 'aad': AEAD authenticated data is base64url(sha256(concat('.',sort([recipients[0].kid, ..., recipients[n].kid])))))
 *  - 'iv': initialization vector (random bytes) encoded in base64Url format.
 *  - 'tag': base64Url encoded.
 *
 *  The 'ciphertext' value is computed by encrypting the plaintext JSON payload (the stringified message) using:
 *  - a given Content Encryption Key (CEK),
 *  - the JWE initialization vector ('iv'),
 *  - and the Additional Authentication Data (AAD) value ('aad'),
 *  - with the encryption algorithm defined by the header element 'protected.alg' and 'protected.enc'.
 */
export interface JWEDataAES extends UnencryptedJWE {
    protectedHdersJWE?: string;
    ciphertext?: string;
    aad?: string;
    iv?: string;
    tag?: string;
    cek?: string;
}
export interface RecipientsData {
    envelopeTo: JWK[];
    cek?: Uint8Array;
    recipients?: RecipientDataJWE[];
}
/** It has:
 *  - protected:
 *  - unprotected:
 *  - recipients:
 *  - 'ciphertext': Base64 URL Safe
 *  - 'aad':
 *  - 'iv': initialization vector
 *  - 'tag':
 *
 * The JWE 'ciphertext' value is computed by encrypting the plaintext JSON payload (the stringified message) using:
 *  - the Content Encryption Key (CEK),
 *  - the JWE initialization vector,
 *  - and the Additional Authentication Data (AAD) value,
 *  - with the encryption algorithm defined by the header element 'protected.alg' and 'protected.enc'.
 */
export interface StandardJWE extends BaseJWE, // protected, unprotected, recipients
JWEDataAES {
    protectedHdersJWE: string;
    unprotected?: UnprotectedHdersJWE;
    recipients: RecipientDataJWE[];
}
/** Decoded protected header claims in a JWE.
 *  - cty: content type, e.g.: "JWT" in case of a nested signed JWT (OpenID).
 *  - typ: DIDComm type, e.g. "didcomm-envelope-enc"
 *  - zip: "DEF" to compresss (deflate) the payload data bytes
 *  - kid: in OpenID (only one recipient) it references the recipient's public key to which the JWE was encrypted (the recipient who can decrypt the JWE).
 *  - ski: sender's public encryption keyID for authenticated encryption.
 *  - enc: encryption algorithm, e.g.: "A256GCM".
 *  - alg: CEK encryption algorithm, only for compact JWE (e.g.: OpenID JWE, only one recipient). In a JSON serialized JWE it is defined per recipient instead of in the Protected Header.
 *
 *  There are 2 different algorithms in JWE:
 *
 *  - Encryption Algorithms ('enc'): On devices with AES hardware acceleration or requiring compliance,
 *  AES GCM is the recommended algorithm. Otherwise, XChacha20Poly1305 should be used.
 *  It identifies the content encryption algorithm used to perform authenticated encryption on the plaintext,
 *  to produce the ciphertext and the Authentication Tag.
 *  This algorithm MUST be an AEAD algorithm with a specified key length.
 *
 *  - Content Encryption Algorithms ('alg'): defines the supported key wrapping encryption algorithms for DIDComm JWE envelopes.
 *  It identifies the cryptographic algorithm used to encrypt or determine the value of the CEK.
 *  (UHC does not use DIDComm standard non PQC resistant algorithms to wrap the CEK,
 *  but Kyber768 PQC resistant algoritm to encapsulate the CEK).
 *  It is defined per recipient instead of in the Protected Header.
 */
export interface ProtectHdersDecoded {
    alg?: string;
    cty?: string;
    enc?: string;
    kid?: string;
    ski?: string;
    typ?: string;
    zip?: string;
}
export interface UnprotectedHdersJWE {
    jku?: string;
}
/** The enrypted data for recipient is not protected by the encryption (it is unprotected data).
 *  When it is not encrypted has no sense storing the CEK (e.g.: when creating before encryption)
 */
export interface RecipientDataJWE {
    encrypted_key?: string;
    header: HeaderRecipientUnprotectedDataJWE;
}
export interface HeaderRecipientUnprotectedDataJWE {
    alg: string;
    kid: string;
}
/** It has:
 *  - protected: stored as decoded data, to be encoded in Base64-safeUrl for output
 *  - unprotected, e.g.: jku
 *  - recipients: CEK encrypted to each recipient (ephemeral / anoncrypt key)
 *  - aad
 *  - iv
 *  - tag
 *  - cipertext: the JWE 'ciphertext' value is computed by encrypting the plaintext JSON payload (the stringified message) using:
 *      - the Content Encryption Key (CEK),
 *      - the JWE initialization vector,
 *      - and the Additional Authentication Data (AAD) value,
 *      - with the encryption algorithm defined by the header element 'protected.alg' and 'protected.enc'.
 */
export interface BackupJWE extends JWEDataAES {
    protected: ProtectHdersDecoded;
    unprotected?: UnprotectedHdersJWE;
    recipients: RecipientDataJWE[];
}
/** JWE compact serialization is only for one recipient; the JWE compact token is built with five key components, each separated by a period (.):
 *  JOSE header, JWE Encrypted Key, JWE initialization vector, JWE Additional Authentication Data (AAD), JWE Ciphertext and JWE Authentication Tag.
 */
/** DIDComm supports two types of message encryption: Authenticated Sender Encryption (Authcrypt) nd Anonymous Sender Encryption (Anonyncrypt).
 *  Both forms are encrypted to the recipient, but only Authenticated Sender Encryption provides assurances of who the sender is.
 *  The encrypted form of a JWM is a JWE. The JOSE family defines JSON Web Algorithms (JWAs) which standardize certain cryptographic operations that are related to preparing JOSE structures.
 *  DIDComm messaging does not support all JWAs:
 *  - XC20P: XChaCha20Poly1305 with a 256 bit key (Anoncrypt).
 *  - A256GCM: AES256-GCM with a 256 bit key (Anoncrypt).
 *  - A256CBC-HS512: AES256-CBC + HMAC-SHA512 with a 512 bit key (Authcrypt / Anoncrypt)
 *
 */
export interface JOSEHeaderStandardAttributes {
    enc?: string;
    typ?: string;
    cty?: string;
}
export interface KyberEncapsulatedSymmetricJWK {
    kty?: string;
    use?: string;
}
