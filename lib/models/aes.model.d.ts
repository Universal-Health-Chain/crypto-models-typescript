/** ProtectedDataSJCL
 *  - "ct" contains concatenated Ciphertext and Tag base64url encoded.
 *  - "iv" contains the Initialization Vector (nonce) base64url encoded.
 */
export interface ProtectedDataSJCL {
    ct: string;
    iv: string;
}
/** ProtectedDataAES has separated the ciphertext and tag (they will be concatenated for decryption)
 *  - ciphertext: base64url encoded bytes of the plaintext
 *  - tag: base64url encoded
 *  - iv: base64url encoded (it is like a nonce)
*/
export interface ProtectedDataAES {
    ciphertext: string;
    tag: string;
    iv: string;
}
