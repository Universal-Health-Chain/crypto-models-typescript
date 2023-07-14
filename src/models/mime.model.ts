/** Note: prefix "application/"" (didcomm, pdf) or "image/"" (jpeg, png, svg) are not included,
 *  so 'contains' must be used instead doing a comparison.
 */
export enum MimeType {
    didcommEncryptedJson    = 'didcomm-encrypted+json', // for Authcrypted and/or anoncrypted, also for Signed and anoncrypted.
    didcomSignedJson        = 'didcomm-signed+json',
    didcomPlaintextJson     = 'didcomm-plain+json',
    fhirJson                = "fhir+json",
    fhirXml                 = "fhir+xml",
    jpeg                    = 'jpeg',
    openEhrFlatSimSdtJson   = 'openehr-simsdt+json',// application/openehr-simsdt+json
    pdf                     = 'pdf',
    png                     = 'png',
    svg                     = 'svg+xml',      // Scalable Vector Graphics (SVG), e.g.: QR codes
    txt                     = 'text/plain'
}