export declare enum ClaimsCWT {
    iss = 1,
    sub = 2,
    aud = 3,
    exp = 4,
    nbf = 5,
    iat = 6,
    cti = 7
}
export interface StandardClaimsCWT {
    iss?: string;
    sub?: string;
    aud?: string;
    exp?: number;
    nbf?: string;
    iat?: number;
    cti?: string;
}
export declare const SignTag = 98;
export declare const Sign1Tag = 18;
export declare const AlgFromSignatureTagCOSE: any;
export declare const AlgToTags: any;
export declare const HeaderParameters: any;
export declare const KeyParameters: any;
export declare const KeyTypes: any;
export declare const KeyCrv: any;
