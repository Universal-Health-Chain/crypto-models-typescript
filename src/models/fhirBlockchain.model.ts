/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

/** Concept for Data Minimization is a simplified FHIR CodeableConcept element with only a single code and a coding system.
 *  - code (REQUIRED): Symbol in syntax defined by the system.
 *  - system (REQUIRED): Namespace for the code.
 */
export interface ConceptCodingMinFHIR {
    code?:   string;  // Symbol in syntax defined by the system
    system?: string;  // Namespace for the code
}

/** FHIR de-identified data (without 'text' or 'display').
 *  Note: 'Coding' does not have 'id')
 *  - code (REQUIRED): Symbol in syntax defined by the system.
 *  - system (REQUIRED): Namespace for the code.
 */
export interface ConceptCodingTwinFHIR extends
    ConceptCodingMinFHIR
{
    code?: string;
    system?: string;
    userSelected?: boolean;
    version?: string;
}

export interface CodeableConceptMinFHIR {
    coding?: ConceptCodingMinFHIR[]; // ConceptCodingTwinFHIR[];
    // text?: string;
}

/**
 * 'meta' property is a set of metadata that provides technical and workflow context to the resource.
 * The FHIR metadata items are all optional, though some or all of them may be required in particular implementations or contexts of use.
 * It contains: 'lastUpdaged', 'versionId', 'security', 'source' (it will by overwritten by the smart-contract with the writer ID).
 */
export interface MetaFhirOnDLT extends
    MetaFhirForResearchOnDLT    // only 'lastUpdated' allowed for research, no id, versionId, source, etc.
{
    versionId?:     string;     // Changes each time the content of the resource changes. Can be referenced in a resource reference. On receiving a write operation, the server SHALL update this item to the current value, or remove it.
    lastUpdated?:   string;     // Store on blockchain the offline date from practitioner or return the txTimeStamp ISO string from blockchain?
    source?:        string;     // In the blockchain it defines the performer ID (creator, updater, deleter), so it will be overwritten.
    security?:      ConceptCodingTwinFHIR[];// Security labels applied to this resource.  On receiving a write operation, the server SHOULD preserve the labels unless applicable business rules dictate otherwise.
    // tag          // cannot store personal data on blockchain
}

/** only 'lastUpdated' is allowed for research: no id, versionId, source, tag, etc. */
export interface MetaFhirForResearchOnDLT {
    lastUpdated?:   string;     // Do not store on blockchain but returning the txTimeStamp ISO string. This value changes each time the content of the resource changes.
}