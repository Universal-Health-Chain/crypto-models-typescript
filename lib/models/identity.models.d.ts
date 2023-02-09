import { ResourceObjectWithDidData } from "./resource-object.model";
export declare const organizationSchemaKind: string;
export interface EventTenant {
    /** The end date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    endDate?: string;
    /** The start date and time of the item (in {@link http://en.wikipedia.org/wiki/ISO_8601 ISO 8601 date format}). */
    startDate?: string;
}
/**
 *  - "@type": both "Organization" or specific types defined in Schema.org are allowed.
 *  - "additionalType": additional HL7 "organization-type".
 *  - "alternateName": tenant's alias for the organization, URL compliant (a-z, 0-9, hyphen)
 *  - "event": contains "endDate" and "startDate" (e.g.: to know if it is disabled).
 *  - "sameAs": URI that unambiguously indicates the organization's identity, such as the DID (it contains `:cds-<territory>:` in an interoperable URI)
 *  - "url": URL of the organization (e.g.: external URL where the DID Document can be retrieved, such as https://hospital1.example.com/)
 */
export interface OrganizationTenantAttributes {
    "@type": string;
    additionalType?: string;
    alternateName: string;
    event: EventTenant;
    sameAs: string;
    url: string;
}
/**  * The DID is at "didData.didDocument.id" and the "attributes" has:
 *  - "@type": both "Organization" or specific types defined in Schema.org are allowed.
 *  - "additionalType": additional HL7 "organization-type".
 *  - "alternateName": tenant's alias for the organization, URL compliant (a-z, 0-9, hyphen)
 *  - "event": contains "endDate" and "startDate" (e.g.: to know if it is disabled).
 *  - "sameAs": URI that unambiguously indicates the organization's identity, such as the DID (it contains `:cds-<territory>:` in an interoperable URI)
 *  - "url": URL of the organization (e.g.: external URL where the DID Document can be retrieved, such as https://hospital1.example.com/)
 */
export interface OrganizationTenantResource extends ResourceObjectWithDidData {
    attributes: OrganizationTenantAttributes;
}
