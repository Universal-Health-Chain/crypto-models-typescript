/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { JWK } from "./jwk.model";

/* "alg" (Algorithm) Header Parameter Values for JWS: https://datatracker.ietf.org/doc/html/rfc7518#section-3.1

   The table below is the set of "alg" (algorithm) Header Parameter values defined by this specification for use with JWS,
   each of which is explained in more detail in the following sections:

   +--------------+-------------------------------+--------------------+
   | "alg" Param  | Digital Signature or MAC      | Implementation     |
   | Value        | Algorithm                     | Requirements       |
   +--------------+-------------------------------+--------------------+
   | HS256        | HMAC using SHA-256            | Required           |
   | HS384        | HMAC using SHA-384            | Optional           |
   | HS512        | HMAC using SHA-512            | Optional           |
   | RS256        | RSASSA-PKCS1-v1_5 using       | Recommended        |
   |              | SHA-256                       |                    |
   | RS384        | RSASSA-PKCS1-v1_5 using       | Optional           |
   |              | SHA-384                       |                    |
   | RS512        | RSASSA-PKCS1-v1_5 using       | Optional           |
   |              | SHA-512                       |                    |
   | ES256        | ECDSA using P-256 and SHA-256 | Recommended+       |
   | ES384        | ECDSA using P-384 and SHA-384 | Optional           |
   | ES512        | ECDSA using P-521 and SHA-512 | Optional           |
   | PS256        | RSASSA-PSS using SHA-256 and  | Optional           |
   |              | MGF1 with SHA-256             |                    |
   | PS384        | RSASSA-PSS using SHA-384 and  | Optional           |
   |              | MGF1 with SHA-384             |                    |
   | PS512        | RSASSA-PSS using SHA-512 and  | Optional           |
   |              | MGF1 with SHA-512             |                    |
   | none         | No digital signature or MAC   | Optional           |
   |              | performed                     |                    |
   +--------------+-------------------------------+--------------------+

   "EdDSA" with Ed25519

*/

export type JWS = string;

export const schemaJWS = {
	"$schema": "http://json-schema.org/draft-07/schema#",
	"$id": "https://smarthealth.cards/schema/jws-schema.json",
	"title": "JWS",
	"type": "string",
	"pattern": "^[a-zA-Z0-9_-]+\\.[a-zA-Z0-9_-]+\\.[a-zA-Z0-9_-]+$"
}

// This has the 3 parts encoded in Base64url format.
export interface PartsJWT {
	header:     string  // Is the protected header (because signed claims)
	payload:    string  // payload claims to be signed also
	signature?: string  // it does not exists when preparing the data for signature
};

/** can also be used UnencryptedJWE or StandardJWE */
export interface DataJWT {
	header:     object      // The protected Header claims (jwe.protected if converted to JWE)
	payload:    object      // JSON Payload claims
	signature?: Uint8Array  // Signature if already signed
};

export enum JWTokenHeaderClaim { // from go-jose header constants
	Type        = "typ", // string
	ContentType = "cty", // string

	Algorithm   = "alg",  // string
	Encryption  = "enc",  // ContentEncryption
	Compression = "zip",  // CompressionAlgorithm
	Critical    = "crit", // []string

	APU = "apu", // *byteBuffer
	APV = "apv", // *byteBuffer
	EPK = "epk", // *JSONWebKey
	IV  = "iv",  // *byteBuffer
	Tag = "tag", // *byteBuffer
	X5c = "x5c", // []*x509.Certificate

	JWK   = "jwk",   // *JSONWebKey
	KeyID = "kid",   // string
	Nonce = "nonce", // string
	B64   = "b64",   // bool

	P2C = "p2c", // *byteBuffer (int)
	P2S = "p2s" // *byteBuffer ([]byte)
}

export interface PayloadClaimsJWT {
  iss?: string
  sub?: string
  aud?: string
  exp?: number
  nbf?: string
  iat?: number
  cti?: string
  jti?: string
}

export interface PayloadClaimsJWT4VP extends
  PayloadClaimsJWT
{
  vc?: any;
  vp?: any;
}

/** Shared Interface with a "crit" property for all sign and verify operations */
export interface CritOptionJWT {
  /**
   * An object with keys representing recognized "crit" (Critical) Header Parameter names.
   * The value for those is either `true` (integrity protected) or `false` (when it's irrelevant).
   * */
  crit?: {
    [propName: string]: boolean
  }
}

/** JWS Verification options */
export interface VerifyOptions extends CritOptionJWT {
  /** A list of accepted JWS "alg" (Algorithm) Header Parameter values */
  algorithms?: string[]
}

/** JWT Claims Set verification options */
export interface JWTClaimVerificationOptions {
  /** Expected JWT "aud" (Audience) Claim value(s) */
  audience?: string | string[]

  /**
   * Expected clock tolerance
   * - in seconds when number (e.g. 5)
   * - parsed as seconds when a string (e.g. "5 seconds", "10 minutes", "2 hours").
   */
  clockTolerance?: string | number

  /** Expected JWT "iss" (Issuer) Claim value(s) */
  issuer?: string | string[]

  /**
   * Maximum time elapsed (in seconds) from the JWT "iat" (Issued At) Claim value.
   * - in seconds when number (e.g. 5)
   * - parsed as seconds when a string (e.g. "5 seconds", "10 minutes", "2 hours").
   */
  maxTokenAge?: string | number

  /** Expected JWT "sub" (Subject) Claim value */
  subject?: string

  /** Expected JWT "typ" (Type) Header Parameter value */
  typ?: string

  /** Date to use when comparing NumericDate claims, defaults to `new Date()` */
  currentDate?: Date
}

export interface VerificationResultJWS {
  /** JWS Payload */
  payload: Uint8Array

  /** JWS Protected Header */
  protectedHeader?: JWSHeaderParameters

  /** JWS Unprotected Header */
  unprotectedHeader?: JWSHeaderParameters
}

export interface JWSHeaderParameters extends
  JoseHeaderParameters
{
  /** JWS "alg" (Algorithm) Header Parameter */
  alg?: string

  /**
   * This JWS Extension Header Parameter modifies the JWS Payload
   * representation and the JWS Signing Input computation as per
   * [RFC7797](https://tools.ietf.org/html/rfc7797).
   */
  b64?: boolean

  /** JWS "crit" (Critical) Header Parameter */
  crit?: string[]

  /** Any other JWS Header member */
  [propName: string]: unknown
}

export interface JoseHeaderParameters {
  /** "kid" (Key ID) Header Parameter */
  kid?: string

  /** "x5t" (X.509 Certificate SHA-1 Thumbprint) Header Parameter */
  x5t?: string

  /** "x5c" (X.509 Certificate Chain) Header Parameter */
  x5c?: string[]

  /** "x5u" (X.509 URL) Header Parameter */
  x5u?: string

  /** "jku" (JWK Set URL) Header Parameter */
  jku?: string

  /** "jwk" (JSON Web Key) Header Parameter. */
  jwk?: Pick<JWK, 'kty' | 'crv' | 'x' | 'y' | 'e' | 'n'>

  /** "typ" (Type) Header Parameter */
  typ?: string

  /** "cty" (Content Type) Header Parameter */
  cty?: string
}
