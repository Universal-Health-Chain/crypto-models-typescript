/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

/** An element of our base ring R which are polynomials over ℤ_q
 *  modulo the equation Xᴺ = -1, where q=3329 and N=256.
 *  This type is also used to store NTT-transformed polynomials, see Poly.NTT().
 *  Coefficients aren't always reduced. See Normalize().
 */
type Poly = Uint16Array;

/** A vector of K polynomials */
type Vec = Poly[];

/** A k by k matrix of polynomials. */
type Mat = Vec[];

/** A Kyber.CPAPKE private key. */
interface KyberInternalCpapkePrivateKey {
	sh: Vec // NTT(s), normalized
}

/** A Kyber.CPAPKE public key. */
interface KyberInternalCpapkePublicKey  {
	rho:    Uint8Array; // ρ, the seed for the matrix A
	th:     Vec;        // NTT(t), normalized
	// cached values
	aT:     Mat;        // the matrix Aᵀ
}

/** Type of a Kyber768.CCAKEM public key */
export interface KyberInternalPublicKey {
	pk:     KyberInternalCpapkePublicKey; // *cpapke.PublicKey
	hpk:    Uint8Array; // [32]byte H(pk)
}

/** Type of a Kyber768.CCAKEM private key */
export interface KyberInternalPrivateKey {
	sk:     KyberInternalCpapkePrivateKey;  // *cpapke.PrivateKey.
	pk:     KyberInternalCpapkePublicKey;   // *cpapke.PublicKey.
	hpk:    Uint8Array;                     // [32]byte H(pk).
	z:      Uint8Array;                     // [32]byte sk's seed.
}