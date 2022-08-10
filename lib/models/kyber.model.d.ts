/** An element of our base ring R which are polynomials over ℤ_q
 *  modulo the equation Xᴺ = -1, where q=3329 and N=256.
 *  This type is also used to store NTT-transformed polynomials, see Poly.NTT().
 *  Coefficients aren't always reduced. See Normalize().
 */
declare type Poly = Uint16Array;
/** A vector of K polynomials */
declare type Vec = Poly[];
/** A k by k matrix of polynomials. */
declare type Mat = Vec[];
/** A Kyber.CPAPKE private key. */
interface KyberInternalCpapkePrivateKey {
    sh: Vec;
}
/** A Kyber.CPAPKE public key. */
interface KyberInternalCpapkePublicKey {
    rho: Uint8Array;
    th: Vec;
    aT: Mat;
}
/** Type of a Kyber768.CCAKEM public key */
export interface KyberInternalPublicKey {
    pk: KyberInternalCpapkePublicKey;
    hpk: Uint8Array;
}
/** Type of a Kyber768.CCAKEM private key */
export interface KyberInternalPrivateKey {
    sk: KyberInternalCpapkePrivateKey;
    pk: KyberInternalCpapkePublicKey;
    hpk: Uint8Array;
    z: Uint8Array;
}
export {};
