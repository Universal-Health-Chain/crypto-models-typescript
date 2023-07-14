/** Note: prefix "application/"" (didcomm, pdf) or "image/"" (jpeg, png, svg) are not included,
 *  so 'contains' must be used instead doing a comparison.
 */
export declare enum MimeType {
    didcommEncryptedJson = "didcomm-encrypted+json",
    didcomSignedJson = "didcomm-signed+json",
    didcomPlaintextJson = "didcomm-plain+json",
    fhirJson = "fhir+json",
    fhirXml = "fhir+xml",
    jpeg = "jpeg",
    openEhrFlatSimSdtJson = "openehr-simsdt+json",
    pdf = "pdf",
    png = "png",
    svg = "svg+xml",
    txt = "text/plain"
}
