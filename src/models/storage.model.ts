/** Required "contentType", "compositionStatus" and "tags".
 *  - contentType (REQUIRED): MIME type.
 *  - compositionStatus (REQUIRED): "preliminary", "amended", "final" (frontend should not use the "error" status).
 *  - tags (REQUIRED): non-personal data such as a list of FHIR resources, "SHC", "DGC", "COVID-19" tag, etc.
 *  - sectionCode (Conditional): code for the health section or document category.
 *  - sectionSystem (Conditional): default is LOINC.
 *  - created (Conditional): required when creating a document, e.g.: "2019-03-23T06:35:22Z"
 *  - updated (Conditional): required when updating a document, e.g.: "2022-08-10T13:40:06Z"
 *  - deactivated (Conditional): required when the storage object is disabled (before deleting).
 *  Note: the deactivation date is the "updated" timestamp.      
 */
 export interface MetaStorage {
    contentType: string; // required
    
    // From UHC
    compositionStatus:  string; // "preliminary", "amended", "final" or "error".
    sectionCode?:       string; // health section or document category.
    sectionSystem?:     string; // LOINC by default when it is not defined.

    // From DidDocumentMetadata
    created?:       string;     // e.g.: "2019-03-23T06:35:22Z"
    deactivated?:   boolean;    // note: the deactivation date is the "updated" timestamp.      
    updated?:       string;     // e.g.: "2022-08-10T13:40:06Z"
    tags?:          string;     // list of types of resources or other non-personal tags are required.
}