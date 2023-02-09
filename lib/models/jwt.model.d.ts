import { JWK } from "./jwk.model";
export declare type JWS = string;
export declare const schemaJWS: {
    $schema: string;
    $id: string;
    title: string;
    type: string;
    pattern: string;
};
export interface PartsJWT {
    header: string;
    payload: string;
    signature?: string;
}
/** can also be used UnencryptedJWE or StandardJWE */
export interface DataJWT {
    header: object;
    payload: object;
    signature?: Uint8Array;
}
export declare enum ClaimHeaderJWT {
    Type = "typ",
    ContentType = "cty",
    Algorithm = "alg",
    Encryption = "enc",
    Compression = "zip",
    Critical = "crit",
    APU = "apu",
    APV = "apv",
    EPK = "epk",
    IV = "iv",
    Tag = "tag",
    X5c = "x5c",
    JWK = "jwk",
    KeyID = "kid",
    Nonce = "nonce",
    B64 = "b64",
    P2C = "p2c",
    P2S = "p2s"
}
export interface PayloadClaimsJWT {
    iss?: string;
    sub?: string;
    aud?: string;
    exp?: number;
    nbf?: string;
    iat?: number;
    cti?: string;
    jti?: string;
}
export interface PayloadClaimsJWT4VP extends PayloadClaimsJWT {
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
        [propName: string]: boolean;
    };
}
/** JWS Verification options */
export interface VerifyOptions extends CritOptionJWT {
    /** A list of accepted JWS "alg" (Algorithm) Header Parameter values */
    algorithms?: string[];
}
/** JWT Claims Set verification options */
export interface JWTClaimVerificationOptions {
    /** Expected JWT "aud" (Audience) Claim value(s) */
    audience?: string | string[];
    /**
     * Expected clock tolerance
     * - in seconds when number (e.g. 5)
     * - parsed as seconds when a string (e.g. "5 seconds", "10 minutes", "2 hours").
     */
    clockTolerance?: string | number;
    /** Expected JWT "iss" (Issuer) Claim value(s) */
    issuer?: string | string[];
    /**
     * Maximum time elapsed (in seconds) from the JWT "iat" (Issued At) Claim value.
     * - in seconds when number (e.g. 5)
     * - parsed as seconds when a string (e.g. "5 seconds", "10 minutes", "2 hours").
     */
    maxTokenAge?: string | number;
    /** Expected JWT "sub" (Subject) Claim value */
    subject?: string;
    /** Expected JWT "typ" (Type) Header Parameter value */
    typ?: string;
    /** Date to use when comparing NumericDate claims, defaults to `new Date()` */
    currentDate?: Date;
}
export interface VerificationResultJWS {
    /** JWS Payload */
    payload: Uint8Array;
    /** JWS Protected Header */
    protectedHeader?: JWSHeaderParameters;
    /** JWS Unprotected Header */
    unprotectedHeader?: JWSHeaderParameters;
}
export interface JWSHeaderParameters extends JoseHeaderParameters {
    /** JWS "alg" (Algorithm) Header Parameter */
    alg?: string;
    /**
     * This JWS Extension Header Parameter modifies the JWS Payload
     * representation and the JWS Signing Input computation as per
     * [RFC7797](https://tools.ietf.org/html/rfc7797).
     */
    b64?: boolean;
    /** JWS "crit" (Critical) Header Parameter */
    crit?: string[];
    /** Any other JWS Header member */
    [propName: string]: unknown;
}
export interface JoseHeaderParameters {
    /** "kid" (Key ID) Header Parameter */
    kid?: string;
    /** "x5t" (X.509 Certificate SHA-1 Thumbprint) Header Parameter */
    x5t?: string;
    /** "x5c" (X.509 Certificate Chain) Header Parameter */
    x5c?: string[];
    /** "x5u" (X.509 URL) Header Parameter */
    x5u?: string;
    /** "jku" (JWK Set URL) Header Parameter */
    jku?: string;
    /** "jwk" (JSON Web Key) Header Parameter. */
    jwk?: Pick<JWK, 'kty' | 'crv' | 'x' | 'y' | 'e' | 'n'>;
    /** "typ" (Type) Header Parameter */
    typ?: string;
    /** "cty" (Content Type) Header Parameter */
    cty?: string;
}
