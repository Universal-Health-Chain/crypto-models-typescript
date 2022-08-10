export declare const KeyUseEncryption = "enc";
export declare const KeyUseSignature = "sig";
/** https://tools.ietf.org/id/draft-ietf-jose-json-web-algorithms-07.html#JWSAlgValues */
export declare const SigAlgorithmEllipticES384 = "ES384";
/** 'kty' values should either be registered in the IANA "JSON Web Key Types" registry established by [JWA]
 *  or be a value that contains a Collision-Resistant Name.
 *  The "kty" value is a case-sensitive string.
 */
export declare const KeyTypeEC = "EC";
/** https://datatracker.ietf.org/doc/html/rfc7518 */
export declare const ECurveP384 = "P-384";
export declare const JWAlgorithmToEllipticCurveSignAndDigestType: any;
export declare const CrvTypeToJWAlgorithm: any;
export declare const JWAlgorithmToJWKCrvAndHashType: any;
export declare const JWSAlgFromStandardAlg: any;
