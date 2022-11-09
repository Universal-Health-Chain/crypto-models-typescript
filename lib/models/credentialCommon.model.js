"use strict";
/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialStandardType = exports.CredentialStatus = exports.CredentialContext = void 0;
var CredentialContext;
(function (CredentialContext) {
    CredentialContext["CredentialW3C"] = "https://www.w3.org/2018/credentials/v1";
    CredentialContext["SecurityW3C"] = "https://w3id.org/security/v1";
    CredentialContext["FHIR_R4"] = "http://hl7.org/fhir/R4";
})(CredentialContext = exports.CredentialContext || (exports.CredentialContext = {}));
var CredentialStatus;
(function (CredentialStatus) {
    CredentialStatus["active"] = "active";
    CredentialStatus["replaced"] = "replaced";
    CredentialStatus["revoked"] = "revoked";
})(CredentialStatus = exports.CredentialStatus || (exports.CredentialStatus = {}));
var CredentialStandardType;
(function (CredentialStandardType) {
    /** W3C */
    CredentialStandardType["CredentialW3C"] = "VerifiableCredential";
    CredentialStandardType["PresentationW3C"] = "VerifiablePresentation";
    /** SHC Credential Types: https://spec.smarthealth.cards/vocabulary/ */
    // Verifiable Credential (VC) Types
    CredentialStandardType["SmartHealthCard"] = "https://smarthealth.cards#health-card";
    // More Granular Sub-types
    CredentialStandardType["SmartHealthCardCOVID19"] = "https://smarthealth.cards#covid19";
    CredentialStandardType["SmartHealthCardImmunization"] = "https://smarthealth.cards#immunization";
    CredentialStandardType["SmartHealthCardLabTests"] = "https://smarthealth.cards#laboratory";
})(CredentialStandardType = exports.CredentialStandardType || (exports.CredentialStandardType = {}));
