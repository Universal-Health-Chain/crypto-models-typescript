"use strict";
/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTokenHeaderClaim = exports.schemaJWS = void 0;
exports.schemaJWS = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "https://smarthealth.cards/schema/jws-schema.json",
    "title": "JWS",
    "type": "string",
    "pattern": "^[a-zA-Z0-9_-]+\\.[a-zA-Z0-9_-]+\\.[a-zA-Z0-9_-]+$"
};
;
;
var JWTokenHeaderClaim;
(function (JWTokenHeaderClaim) {
    JWTokenHeaderClaim["Type"] = "typ";
    JWTokenHeaderClaim["ContentType"] = "cty";
    JWTokenHeaderClaim["Algorithm"] = "alg";
    JWTokenHeaderClaim["Encryption"] = "enc";
    JWTokenHeaderClaim["Compression"] = "zip";
    JWTokenHeaderClaim["Critical"] = "crit";
    JWTokenHeaderClaim["APU"] = "apu";
    JWTokenHeaderClaim["APV"] = "apv";
    JWTokenHeaderClaim["EPK"] = "epk";
    JWTokenHeaderClaim["IV"] = "iv";
    JWTokenHeaderClaim["Tag"] = "tag";
    JWTokenHeaderClaim["X5c"] = "x5c";
    JWTokenHeaderClaim["JWK"] = "jwk";
    JWTokenHeaderClaim["KeyID"] = "kid";
    JWTokenHeaderClaim["Nonce"] = "nonce";
    JWTokenHeaderClaim["B64"] = "b64";
    JWTokenHeaderClaim["P2C"] = "p2c";
    JWTokenHeaderClaim["P2S"] = "p2s"; // *byteBuffer ([]byte)
})(JWTokenHeaderClaim = exports.JWTokenHeaderClaim || (exports.JWTokenHeaderClaim = {}));
