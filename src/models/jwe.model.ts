/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

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

import { ProtectedDataAES } from "./aes.model";
import { JWK } from "./jwk.model";

/* A typical JWE example is: 
{
    "protected": string;
    "recipients": [
        {
            "header": {
                "kid": string;
                "alg": string;
            };
            "encrypted_key": string;
        }
    ];
    "iv": string;
    "ciphertext": string;
    "tag": string;
}*/

/** A JWE has "ciphertext", "tag", "iv" (initialization vector, a nonce), "protected" (headers) and optional "unprotected" (headers) */
export interface JWEData extends
    ProtectedDataAES, // "ciphertext", "tag" and "iv" (initialization vector, a nonce)
    BaseJWE // recipients, protected and optional unprotected headers
{}

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
    protected:      string;             // Encoded a base64-url string containing the encryption algorithm ('alg') performed on the plaintext (e.g.: 'dir' for direct encryption).
    unprotected?:   UnprotectedHeadersJWE; // e.g.: jku
    recipients:     RecipientDataJWE[]; // CEK encrypted to each recipient // Includes ephemeral (anoncrypt) key
}

/**
 *  - protected: decoded data containing the encryption algorithm ('enc') performed on the plaintext (e.g.: "A256GCM") and the 'typ' (e.g.: "didcomm-envelope-enc")
 *  - unprotected: additional data such as 'jku'.
 *  - recipients: list of recipients identified by its keyID (kid, the 'thumprint' of their public JWK. When it is not encrypted has no sense storing the CEK (e.g.: when creating before encryption).
 *  - plaintext: not only text but unencrypted data (e.g.: a JSON object) to be encrypted as 'cipertext' for data storage and data exchange ('plaintext' is removed when encrypted).
 */
 export interface UnencryptedJWE {
    protectHdersDecoded?:   ProtectedHeadersJWE;    // 'enc' performed on the plaintext (e.g.: "A256GCM") and the 'typ' (e.g.: "didcomm-envelope-enc")
    unprotected?:           UnprotectedHeadersJWE;    // e.g.: jku
    recipients:             RecipientDataJWE[];     // when it is not encrypted has no sense storing the CEK (e.g.: when creating before encryption)
    plaintext?:             any;                    // it can be a JSON object such as a FHIR Bundle.
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
 export interface JWEDataAES extends 
    JWEData,   
    UnencryptedJWE // protectHdersDecoded, unprotectedHders, recipients, plaintext
{
    protected:      string; // the original protected headers Base64Url encoded
    ciphertext:     string; // base64Url
    aad?:           string; // base64url(sha256(concat('.',sort([recipients[0].kid, ..., recipients[n].kid]))))),  // AEAD authenticated data (possibly implicit) // AEAD nonce as base64-url string.
    iv:            string; // base64Url
    tag:           string; // base64Url
    cek?:           string; // decapsulated CEK for AES encryption to create the cipertext.
}

export interface RecipientsData {
    // seedCEK: Uint8Array;         // random 32 bytes used by the kyber algorithm to generate a shared symmetric key.
    envelopeTo: JWK[];              // it contains the required keys list (a public JSON Web Key for each recipient).
    cek?:       Uint8Array;         // non-encapsulated symmetric key (CEK) generated by the kyber algorithm.
    recipients?:RecipientDataJWE[]; // the shared symmetric key (CEK) encapsulated/encrypted/enveloped to each recipient's public kyber key.
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
export interface StandardJWE extends
    BaseJWE,         // protected, unprotected, recipients
    JWEDataAES    // ciphertext, iv and tag
{
    protected:  string;                         // Encoded a base64-url string containing the encryption algorithm ('alg') performed on the plaintext (e.g.: 'dir' for direct encryption).
    unprotected?:       UnprotectedHeadersJWE;             // e.g.: jku
    recipients:         RecipientDataJWE[];  // CEK encrypted to each recipient // Includes ephemeral (anoncrypt) key
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
export interface ProtectedHeadersJWE {
    alg?:   string; // only in a compact JWE (e.g.: OpenID JWE)
    cty?:   string; // content type, e.g.: "JWT" in case of a nested signed JWT (OpenID).
    enc?:   string; // encryption algorithm, e.g.: "A256GCM".
    kid?:   string; // in OpenID (only one recipient) it references the recipient's public key to which the JWE was encrypted (the recipient who can decrypt the JWE).
    ski?:   string; // sender's public encryption keyID for authenticated encryption.
    typ?:   string; // e.g.: "didcomm-envelope-enc"
    zip?:   string; // "DEF" to compress (deflate) the payload data bytes
}

export interface UnprotectedHeadersJWE {
    jku?:   string;
}

/** The enrypted data for recipient is not protected by the encryption (it is unprotected data).
 *  When it is not encrypted has no sense storing the CEK (e.g.: when creating before encryption)
 */
export interface RecipientDataJWE {
    encrypted_key?: string; // base64URLencode(c) // 'c' is the Kyber's encapsulation (encryption) of the ephemeral symmetric shared key (ss).
    header:         HeaderRecipientUnprotectedDataJWE;
}

export interface HeaderRecipientUnprotectedDataJWE {
    alg: string; // It identifies the cryptographic algorithm used to encrypt or determine the value of the CEK: 'Kyber-768'.
    kid: string; // the thumbprint of the recipient's public keyID is used as the recipient's identifier (RFC7638): base64url(thumbprint(public JWK)).
    // epk: KyberEncapsulatedSymmetricJWK; // it is at 'encrypted_key'
    // "apu": base64url(epk.x value above),
    // "apv": base64url(recipients[*].header.kid)
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
export interface BackupJWE extends
    JWEDataAES    // ciphertext, aad, iv and tag
{
    protectHdersDecoded:    ProtectedHeadersJWE;               // decode/encode Base64-safeUrl for input/output
    unprotected?:           UnprotectedHeadersJWE;             // e.g.: jku
    recipients:             RecipientDataJWE[];  // CEK encrypted to each recipient // Includes ephemeral (anoncrypt) key
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

/*
export interface JOSEHeaderAttributesWithRecipientKyberEphemeralEncryptionKey extends
    JOSEHeaderStandardAttributes,
    JOSERecipientEphemeralKyberKeyAttributes
{}
*/
export interface JOSEHeaderStandardAttributes {
    enc?:   string; // 'AES256-GCM' 256 bit key (Anoncrypt), instead of using 'XC20P' for Anoncrypt or 'A256CBC-HS512' for Authcrypt/Anoncrypt.
    typ?:   string; // OPTIONAL. Declare IANA Media type (https://www.iana.org/assignments/media-types/media-types.xhtml). DIDComm JWM media type can be: 'application/didcomm-encrypted+json', 'application/didcomm-signed+json' OR 'application/didcomm-plain+json'.
    cty?:   string; // OPTIONAL. Usually nested signing or encryption operations are not employed, so the use of this Header Parameter is NOT RECOMMENDED. In the case that nested signing or encryption is employed, this Header Parameter MUST be present; in this case, the value MUST be "JWM", to indicate that a Nested JWM is carried in this JWM.
}
/*
export interface JOSERecipientEphemeralKyberKeyAttributes {
    alg:    string; // 'Kyber-768'
    epk:    KyberEncapsulatedSymmetricJWK;
    kid?:   string; // signer / sender public keyID.
}
*/
export interface KyberEncapsulatedSymmetricJWK {
    // k?:  string; // it is at 'encrypted_key': Kyber encapsulated key (c) encoded in Base64 URL Safe format without padding.
    kty?:   string; // 'oct'
    use?:   string; // 'enc'
}

// example using node.js crypto API with aes-256-gcm: https://gist.github.com/rjz/15baffeab434b8125ca4d783f4116d81

/*
    // represent encrypted data as JWE
		const jwe = {
			protected: this.encodedProtectedHeader,
			recipients: this.recipients,
			iv: base64url.encode(random bytes),
			ciphertext: base64url.encode(encrypted DIDComm message),
			tag: base64url.encode(tag)
		};
*/

/*  Aries RFC 0334: JWE envelope 1.0:
    https://github.com/hyperledger/aries-rfcs/tree/main/features/0334-jwe-envelope

    DIDComm JWE Anoncrypt for Smart-contracts, using A256GCM content encryption:
{
    "protected": // Encoded a base64-url string
        base64url(
        {
            "alg": "dir",
            "enc": "A256GCM", // instead of "XC20P"
            "typ": "didcomm-envelope-enc" // or "JWM", "JWM/1.0"
        }
    ),
    "recipients": [
        // CEK encrypted to each recipient
        // Includes ephemeral key (anoncrypt) or sender key (authcrypt)
        {
            "encrypted_key": base64URLencode(c), // 'c' is the Kyber's encapsulation (encryption) of the ephemeral symmetric shared key (ss).
            "header": {
                "alg": "Kyber-768", // instead of "ECDH-ES+XC20PKW" or "ECDH-ES+A256KW", with kyber "epk" as symmetric key instead of EC
                "epk": {
                    "k": "...",  // Kyber encapsulated key (c) using the recipient's public key value raw (no padding) base64url encoded.
                    "kty": "oct" // instead of "OKP" (EC)
                    // "crv": "X25519",
                    // "x": "aOH-76BRwkHf0nbGokaBsO6shW9McEs6jqVXaF0GNn4" // sender's ephemeral public key value raw (no padding) base64url encoded.
                },
                "kid": base64url(recipient KID)
                // "apu": base64url(epk.x value above),
                // "apv": base64url(recipients[*].header.kid)
            }
        }
    ],
    // "aad": "base64url(sha256(concat('.',sort([recipients[0].kid, ..., recipients[n].kid])))))",  // AEAD authenticated data (possibly implicit)
    // The JWE ciphertext is computed by encrypting the plaintext JSON payload using:
    // - the Content Encryption Key (CEK),
    // - the JWE initialization vector,
    // - and the Additional Authentication Data (AAD) value,
    // - with the encryption algorithm defined by the header element 'enc'.
    "ciphertext": "base64url(AES(DIDComm payload, base64Url(json($protected)+'.'+$aad), content encryption IV, CEK))", // Encrypted layer as base64-url string
    "iv": "base64url(content encryption IV)", // AEAD nonce as base64-url string
    "tag": <b64URLencode(tag)> // AEAD tag as base64-url string
}

*/