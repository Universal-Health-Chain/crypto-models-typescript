"use strict";
/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWAlgorithmKindUHC = exports.KeyUseJWAlgorithm = void 0;
var KeyUseJWAlgorithm;
(function (KeyUseJWAlgorithm) {
    KeyUseJWAlgorithm["enc"] = "enc";
    KeyUseJWAlgorithm["sig"] = "sig";
})(KeyUseJWAlgorithm || (exports.KeyUseJWAlgorithm = KeyUseJWAlgorithm = {}));
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
var JWAlgorithmKindUHC;
(function (JWAlgorithmKindUHC) {
    // non-PQC sig
    JWAlgorithmKindUHC["ES256"] = "ES256";
    JWAlgorithmKindUHC["ES384"] = "ES384";
    JWAlgorithmKindUHC["ES512"] = "ES512";
    // PQC sig
    JWAlgorithmKindUHC["Dilithium3"] = "dilithium-6x5-r3";
    JWAlgorithmKindUHC["Dilithium5"] = "dilithium-8x7-r3";
    // PQC enc
    JWAlgorithmKindUHC["Kyber512"] = "Kyber-512";
    JWAlgorithmKindUHC["Kyber768"] = "Kyber-768";
    JWAlgorithmKindUHC["Kyber1024"] = "Kyber-1024";
})(JWAlgorithmKindUHC || (exports.JWAlgorithmKindUHC = JWAlgorithmKindUHC = {}));
;
;
;
;
;
//# sourceMappingURL=jwk.model.js.map