/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

export enum CredentialContext {
    CredentialW3C = 'https://www.w3.org/2018/credentials/v1',
    SecurityW3C   = 'https://w3id.org/security/v1',
    FHIR_R4       = 'http://hl7.org/fhir/R4'
}

/** Holder and other properties are of type TypedId */
export interface TypedId {
    id?:	string;
    type?:	string;
}

/**
 * https://docs.microsoft.com/en-us/azure/active-directory/verifiable-credentials/how-to-issuer-revoke
 * https://w3c-ccg.github.io/vc-extension-registry/#status-methods
 */
export interface CredentialStatusExtensionResolve {
    currentStatus:  string; // 'Suspended'
    statusReason?:  string; // 'Investigation'
}

export enum CredentialStatus {
    active = 'active',
    replaced = 'replaced',
    revoked = 'revoked'
}

/**  "@context" and "type" defines a Linked Data Document */
export interface LinkedDataDocument {
    '@context'?: string[];  // context is not being used in SMART Health Cards
    type?:       string[];  // 'type' but not '@type' because it does not refers to '@context'
}

export enum CredentialStandardType {
    /** W3C */
    CredentialW3C = 'VerifiableCredential',
    PresentationW3C = 'VerifiablePresentation',

    /** SHC Credential Types: https://spec.smarthealth.cards/vocabulary/ */
    // Verifiable Credential (VC) Types
    SmartHealthCard             = 'https://smarthealth.cards#health-card', //  A VC designed to convey a 'Health Card' (i.e. clinical data bound to a subject's identity)
    // More Granular Sub-types
    SmartHealthCardCOVID19      = 'https://smarthealth.cards#covid19', // A Health Card designed to convey COVID-19 details
    SmartHealthCardImmunization = 'https://smarthealth.cards#immunization', // A Health Card designed to convey immunization details
    SmartHealthCardLabTests     = 'https://smarthealth.cards#laboratory', // A Health Card designed to convey laboratory results
}