/** Concept for Data Minimization is a simplified FHIR CodeableConcept element with only a single code and a coding system.
 *  - code (REQUIRED): Symbol in syntax defined by the system.
 *  - system (REQUIRED): Namespace for the code.
 */
export interface ConceptCodingMinFHIR {
    code?: string;
    system?: string;
}
/** FHIR de-identified data (without 'text' or 'display').
 *  Note: 'Coding' does not have 'id')
 *  - code (REQUIRED): Symbol in syntax defined by the system.
 *  - system (REQUIRED): Namespace for the code.
 */
export interface ConceptCodingTwinFHIR extends ConceptCodingMinFHIR {
    code?: string;
    system?: string;
    userSelected?: boolean;
    version?: string;
}
export interface CodeableConceptMinFHIR {
    coding?: ConceptCodingMinFHIR[];
}
/**
 * 'meta' property is a set of metadata that provides technical and workflow context to the resource.
 * The FHIR metadata items are all optional, though some or all of them may be required in particular implementations or contexts of use.
 * It contains: 'lastUpdaged', 'versionId', 'security', 'source' (it will by overwritten by the smart-contract with the writer ID).
 */
export interface MetaFhirOnDLT extends MetaFhirForResearchOnDLT {
    versionId?: string;
    lastUpdated?: string;
    source?: string;
    security?: ConceptCodingTwinFHIR[];
}
/** only 'lastUpdated' is allowed for research: no id, versionId, source, tag, etc. */
export interface MetaFhirForResearchOnDLT {
    lastUpdated?: string;
}
