"use strict";
/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/w3c-ccg/ld-proofs/issues/26#issuecomment-830029583
// Section 9 of the current specification states that at minimum a new proof type is expected to have
// an id, type, canonicalizationAlgorithm, digestAlgorithm, and proofAlgorithm.
// https://w3c-ccg.github.io/ld-proofs/#creating-new-proof-types
/* https://www.w3.org/TR/vc-data-model/#zero-knowledge-proofs
"proof": {
  "type": "CLSignature2019",
  "issuerData": "5NQ4TgzNfSQxoLzf2d5AV3JNiCdMaTgm...BXiX5UggB381QU7ZCgqWivUmy4D",
  "attributes": "pPYmqDvwwWBDPNykXVrBtKdsJDeZUGFA...tTERiLqsZ5oxCoCSodPQaggkDJy",
  "signature": "8eGWSiTiWtEA8WnBwX4T259STpxpRKuk...kpFnikqqSP3GMW7mVxC4chxFhVs",
  "signatureCorrectnessProof": "SNQbW3u1QV5q89qhxA1xyVqFa6jCrKwv...dsRypyuGGK3RhhBUvH1tPEL8orH"
}
*/
