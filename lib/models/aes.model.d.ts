/** ProtectedDataAESCCM
 *  - "ct" contains concatenated Ciphertext and Tag base64url encoded.
 *  - "iv" contains the Initialization Vector (nonce) base64url encoded.
 */
export interface ProtectedDataAESCCM {
    ct: string;
    iv: string;
}
