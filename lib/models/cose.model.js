"use strict";
/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyCrv = exports.KeyTypes = exports.KeyParameters = exports.HeaderParameters = exports.AlgToTags = exports.AlgFromSignatureTagCOSE = exports.Sign1Tag = exports.SignTag = exports.ClaimsCWT = void 0;
/* https://datatracker.ietf.org/doc/html/rfc8152#page-78
The message type is identified by a CBOR tag.
Messages with a CBOR tag are known as tagged messages.
+-------+---------------+---------------+---------------------------+
| CBOR  | cose-type     | Data Item     | Semantics                 |
| Tag   |               |               |                           |
+-------+---------------+---------------+---------------------------+
| 98    | cose-sign     | COSE_Sign     | COSE Signed Data Object   |
| 18    | cose-sign1    | COSE_Sign1    | COSE Single Signer Data   |
|       |               |               | Object                    |
| 96    | cose-encrypt  | COSE_Encrypt  | COSE Encrypted Data       |
|       |               |               | Object                    |
| 16    | cose-encrypt0 | COSE_Encrypt0 | COSE Single Recipient     |
|       |               |               | Encrypted Data Object     |
| 97    | cose-mac      | COSE_Mac      | COSE MACed Data Object    |
| 17    | cose-mac0     | COSE_Mac0     | COSE Mac w/o Recipients   |
|       |               |               | Object                    |
+-------+---------------+---------------+---------------------------+
                Table 1: COSE Message Identification
*/
/*
CBOR Web Token (CWT) is a compact means of representing information to be transferred between two parties.
The claims in a CWT are encoded in the Concise Binary Object Representation (CBOR),
and COSE (CBOR Object Signing and Encryption) is used for added application-layer security protection.

CBOR CWT Payload Claims https://datatracker.ietf.org/doc/html/rfc8392#section-4
Summary of the Claim Names, Keys, and Value Types
             +------+-----+----------------------------------+
             | Name | Key | Value Type                       |
             +------+-----+----------------------------------+
             | iss  | 1   | text string                      |
             | sub  | 2   | text string                      |
             | aud  | 3   | text string                      |
             | exp  | 4   | integer or floating-point number |
             | nbf  | 5   | integer or floating-point number |
             | iat  | 6   | integer or floating-point number |
             | cti  | 7   | byte string                      |
             +------+-----+----------------------------------+
        Table 1: Summary of the Claim Names, Keys, and Value Types
*/
var ClaimsCWT;
(function (ClaimsCWT) {
    ClaimsCWT[ClaimsCWT["iss"] = 1] = "iss";
    ClaimsCWT[ClaimsCWT["sub"] = 2] = "sub";
    ClaimsCWT[ClaimsCWT["aud"] = 3] = "aud";
    ClaimsCWT[ClaimsCWT["exp"] = 4] = "exp";
    ClaimsCWT[ClaimsCWT["nbf"] = 5] = "nbf";
    ClaimsCWT[ClaimsCWT["iat"] = 6] = "iat";
    ClaimsCWT[ClaimsCWT["cti"] = 7] = "cti";
})(ClaimsCWT = exports.ClaimsCWT || (exports.ClaimsCWT = {}));
exports.SignTag = 98;
exports.Sign1Tag = 18;
exports.AlgFromSignatureTagCOSE = {};
exports.AlgFromSignatureTagCOSE[-7] = { 'sign': 'ES256', 'digest': 'SHA-256' };
exports.AlgFromSignatureTagCOSE[-35] = { 'sign': 'ES384', 'digest': 'SHA-384' };
exports.AlgFromSignatureTagCOSE[-36] = { 'sign': 'ES512', 'digest': 'SHA-512' };
exports.AlgFromSignatureTagCOSE[-257] = { 'sign': 'RS256', 'digest': 'SHA-256' };
exports.AlgFromSignatureTagCOSE[-258] = { 'sign': 'RS384', 'digest': 'SHA-384' };
exports.AlgFromSignatureTagCOSE[-259] = { 'sign': 'RS512', 'digest': 'SHA-512' };
// export const EMPTY_BUFFER = Buffer.alloc(0);
exports.AlgToTags = {
    'RS512': -259,
    'RS384': -258,
    'RS256': -257,
    'ECDH-SS-512': -28,
    'ECDH-SS': -27,
    'ECDH-ES-512': -26,
    'ECDH-ES': -25,
    'ES256': -7,
    'ES512': -36,
    'direct': -6,
    'A128GCM': 1,
    'A192GCM': 2,
    'A256GCM': 3,
    'SHA-256_64': 4,
    'SHA-256-64': 4,
    'HS256/64': 4,
    'SHA-256': 5,
    'HS256': 5,
    'SHA-384': 6,
    'HS384': 6,
    'SHA-512': 7,
    'HS512': 7,
    'AES-CCM-16-64-128': 10,
    'AES-CCM-16-128/64': 10,
    'AES-CCM-16-64-256': 11,
    'AES-CCM-16-256/64': 11,
    'AES-CCM-64-64-128': 12,
    'AES-CCM-64-128/64': 12,
    'AES-CCM-64-64-256': 13,
    'AES-CCM-64-256/64': 13,
    'AES-MAC-128/64': 14,
    'AES-MAC-256/64': 15,
    'AES-MAC-128/128': 25,
    'AES-MAC-256/128': 26,
    'AES-CCM-16-128-128': 30,
    'AES-CCM-16-128/128': 30,
    'AES-CCM-16-128-256': 31,
    'AES-CCM-16-256/128': 31,
    'AES-CCM-64-128-128': 32,
    'AES-CCM-64-128/128': 32,
    'AES-CCM-64-128-256': 33,
    'AES-CCM-64-256/128': 33
};
exports.HeaderParameters = {
    'partyUNonce': -22,
    'static_key_id': -3,
    'static_key': -2,
    'ephemeral_key': -1,
    'alg': 1,
    'crit': 2,
    'content_type': 3,
    'ctyp': 3,
    'kid': 4,
    'IV': 5,
    'Partial_IV': 6,
    'counter_signature': 7
};
exports.KeyParameters = {
    'crv': -1,
    'k': -1,
    'x': -2,
    'y': -3,
    'd': -4,
    'kty': 1
};
exports.KeyTypes = {
    'OKP': 1,
    'EC2': 2,
    'RSA': 3,
    'Symmetric': 4
};
exports.KeyCrv = {
    'P-256': 1,
    'P-384': 2,
    'P-521': 3,
    'X25519': 4,
    'X448': 5,
    'Ed25519': 6,
    'Ed448': 7
};
