/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

/** ProtectedDataAESCCM
 *  - "ct" contains concatenated Ciphertext and Tag base64url encoded.
 *  - "iv" contains the Initialization Vector (nonce) base64url encoded.
 */
export interface ProtectedDataAESCCM {
    ct: string // ciphertextAndTagBase64Url,
    iv: string // nonceBase64Url
}