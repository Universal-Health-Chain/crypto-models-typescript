/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

export const organizationSchemaKind: string = 'Organization' || 'Airline' || 'Consortium' || 'Corporation' || 'EducationalOrganization' || 'FundingScheme' || 'GovernmentOrganization' || 'LibrarySystem' || 'LocalBusiness' || 'MedicalOrganization' || 'NewsMediaOrganization' || 'NGO' || 'PerformingGroup' || 'Project' || 'ResearchOrganization' || 'SportsOrganization' || 'WorkersUnion' || 'string';

/**
 *  - "@type": both "Organization" or specific types defined in Schema.org are allowed.
 *  - "additionalType": additional HL7 "organization-type".
 *  - "alternateName": tenant's alias for the organization, URL compliant (a-z, 0-9, hyphen)
 *  - "event": contains "endDate" and "startDate" (e.g.: to know if it is disabled).
 *  - "sameAs": URI that unambiguously indicates the organization's identity, such as the DID (it contains `:cds-<territory>:` in an interoperable URI)
 *  - "url": URL of the organization (e.g.: external URL where the DID Document can be retrieved, such as https://hospital1.example.com/)
 */
export interface OrganizationTenant {
    "@type":        string; // both "Organization" or specific types defined in Schema.org are allowed.
    additionalType?:string; // additional HL7 "organization-type".
    alternateName:  string; // tenant's alias for the organization, URL compliant (a-z, 0-9, hyphen)
    event:          EventTenant; // contains "endDate" and "startDate" (e.g.: to know if it is disabled).
    sameAs:         string; // URI that unambiguously indicates the organization's identity, such as the DID (it contains `:cds-<territory>:` in an interoperable URI)
    url:            string; // URL of the organization (e.g.: external URL where the DID Document can be retrieved, such as https://hospital1.example.com/) 
}

export interface EventTenant {
    /** The end date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    endDate?: string;   // ISO date time
    /** The start date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    startDate?: string; // ISO date time
}