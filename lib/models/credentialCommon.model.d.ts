export declare enum CredentialContext {
    CredentialW3C = "https://www.w3.org/2018/credentials/v1",
    SecurityW3C = "https://w3id.org/security/v1",
    FHIR_R4 = "http://hl7.org/fhir/R4"
}
/** Holder and other properties are of type TypedId */
export interface TypedId {
    id?: string;
    type?: string;
}
/**
 * https://docs.microsoft.com/en-us/azure/active-directory/verifiable-credentials/how-to-issuer-revoke
 * https://w3c-ccg.github.io/vc-extension-registry/#status-methods
 */
export interface CredentialStatusExtensionResolve {
    currentStatus: string;
    statusReason?: string;
}
export declare enum CredentialStatus {
    active = "active",
    replaced = "replaced",
    revoked = "revoked"
}
/**  "@context" and "type" defines a Linked Data Document */
export interface LinkedDataDocument {
    '@context'?: string[];
    type?: string[];
}
export declare enum CredentialStandardType {
    /** W3C */
    CredentialW3C = "VerifiableCredential",
    PresentationW3C = "VerifiablePresentation",
    /** SHC Credential Types: https://spec.smarthealth.cards/vocabulary/ */
    SmartHealthCard = "https://smarthealth.cards#health-card",
    SmartHealthCardCOVID19 = "https://smarthealth.cards#covid19",
    SmartHealthCardImmunization = "https://smarthealth.cards#immunization",
    SmartHealthCardLabTests = "https://smarthealth.cards#laboratory"
}
