"use strict";
/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=jwe.model.js.map