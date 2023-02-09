"use strict";
/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimHeaderJWT = exports.schemaJWS = void 0;
exports.schemaJWS = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "https://smarthealth.cards/schema/jws-schema.json",
    "title": "JWS",
    "type": "string",
    "pattern": "^[a-zA-Z0-9_-]+\\.[a-zA-Z0-9_-]+\\.[a-zA-Z0-9_-]+$"
};
;
;
var ClaimHeaderJWT;
(function (ClaimHeaderJWT) {
    ClaimHeaderJWT["Type"] = "typ";
    ClaimHeaderJWT["ContentType"] = "cty";
    ClaimHeaderJWT["Algorithm"] = "alg";
    ClaimHeaderJWT["Encryption"] = "enc";
    ClaimHeaderJWT["Compression"] = "zip";
    ClaimHeaderJWT["Critical"] = "crit";
    ClaimHeaderJWT["APU"] = "apu";
    ClaimHeaderJWT["APV"] = "apv";
    ClaimHeaderJWT["EPK"] = "epk";
    ClaimHeaderJWT["IV"] = "iv";
    ClaimHeaderJWT["Tag"] = "tag";
    ClaimHeaderJWT["X5c"] = "x5c";
    ClaimHeaderJWT["JWK"] = "jwk";
    ClaimHeaderJWT["KeyID"] = "kid";
    ClaimHeaderJWT["Nonce"] = "nonce";
    ClaimHeaderJWT["B64"] = "b64";
    ClaimHeaderJWT["P2C"] = "p2c";
    ClaimHeaderJWT["P2S"] = "p2s"; // *byteBuffer ([]byte)
})(ClaimHeaderJWT = exports.ClaimHeaderJWT || (exports.ClaimHeaderJWT = {}));
