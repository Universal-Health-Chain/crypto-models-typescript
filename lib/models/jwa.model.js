"use strict";
/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWSAlgFromStandardAlg = exports.JWAlgorithmToJWKCrvAndHashType = exports.CrvTypeToJWAlgorithm = exports.JWAlgorithmToEllipticCurveSignAndDigestType = exports.ECurveP384 = exports.KeyTypeEC = exports.SigAlgorithmEllipticES384 = exports.KeyUseSignature = exports.KeyUseEncryption = void 0;
exports.KeyUseEncryption = 'enc'; // JWA
exports.KeyUseSignature = 'sig'; // JWA
/** https://tools.ietf.org/id/draft-ietf-jose-json-web-algorithms-07.html#JWSAlgValues */
exports.SigAlgorithmEllipticES384 = 'ES384'; //  ECDSA signature algorithm using SHA-384 hash algorithm
/** 'kty' values should either be registered in the IANA "JSON Web Key Types" registry established by [JWA]
 *  or be a value that contains a Collision-Resistant Name.
 *  The "kty" value is a case-sensitive string.
 */
exports.KeyTypeEC = 'EC';
/** https://datatracker.ietf.org/doc/html/rfc7518 */
exports.ECurveP384 = 'P-384';
exports.JWAlgorithmToEllipticCurveSignAndDigestType = {
    'ES256': { 'sign': 'p256', 'digest': 'sha256' },
    'ES384': { 'sign': 'p384', 'digest': 'sha384' },
    'ES512': { 'sign': 'p521', 'digest': 'sha512' },
    'RS256': { 'sign': 'RSA-SHA256' },
    'RS384': { 'sign': 'RSA-SHA384' },
    'RS512': { 'sign': 'RSA-SHA512' }
};
exports.CrvTypeToJWAlgorithm = {
    'P-256': { 'alg': 'ES256', 'sign': 'p256', 'digest': 'sha256' },
    'P-384': { 'alg': 'ES384', 'sign': 'p384', 'digest': 'sha384' },
    'P-521': { 'alg': 'ES512', 'sign': 'p521', 'digest': 'sha512' }
};
exports.JWAlgorithmToJWKCrvAndHashType = {
    "ES256": { crv: "P-256", hash: "SHA256", kty: "EC", use: "sig" },
    "ES384": { crv: "P-384", hash: "SHA384", kty: "EC", use: "sig" },
    "ES512": { crv: "P-521", hash: "SHA512", kty: "EC", use: "sig" }, // P-521 is not a typo (not P-512)
};
exports.JWSAlgFromStandardAlg = {
    'EdDSA': { 'sign': 'Ed25519', 'digest': 'SHA-256' },
    'ES256': { 'sign': 'P-256', 'digest': 'SHA-256' },
    'ES384': { 'sign': 'P-384', 'digest': 'SHA-384' },
    'ES512': { 'sign': 'P-521', 'digest': 'SHA-512' },
    'RS256': { 'sign': 'RSA-SHA256' },
    'RS384': { 'sign': 'RSA-SHA384' },
    'RS512': { 'sign': 'RSA-SHA512' }
};
