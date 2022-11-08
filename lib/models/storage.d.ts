/** Required "compositionStatus", "sectionCode" and "tags" (LOINC will be the default coding system if not specified).
 *  - tags (REQUIRED): non-personal data such as a list of FHIR resources, "SHC", "DGC", "COVID-19" tag, etc.
 *  - compositionStatus (REQUIRED): "preliminary", "amended", "final" (frontend should not use the "error" status).
 *  - sectionCode (REQUIRED): code for the health section or document category.
 *  - sectionSystem (Conditional): default is LOINC.
 *  - created (Conditional): required when creating a document, e.g.: "2019-03-23T06:35:22Z"
 *  - updated (Conditional): required when updating a document, e.g.: "2022-08-10T13:40:06Z"
 *  Note: the deactivation date is the "updated" timestamp.
 */
export interface MetaStorage {
    contentType: string;
    compositionStatus?: string;
    sectionCode?: string;
    sectionSystem?: string;
    created?: string;
    deactivated?: boolean;
    updated?: string;
    tags?: string;
}
