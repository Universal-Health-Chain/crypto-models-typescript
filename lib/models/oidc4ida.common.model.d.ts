/** Digest object represents a cryptographic hash of some bytes (e.g.: the content of a document).
 *  It has 'alg' and 'value' (Base64 encoded, not hexadecimal such as in W3C format).
 */
export interface DigestResultOpenIdData {
    alg: string;
    value: string;
}
/** Attachment OpenID
 *  The "digest" is REQUIRED: digest.alg and digest.value (Base64 encoded, not Base64Url).
 *  The "url" is REQUIRED to be "urn:uuid:<uuidv4>" for the resource/record (same as the FHIR "fullUrl" property with urn:uuid:<uuidv4>).
 */
export interface AttachmentExternalDLT {
    digest: DigestResultOpenIdData;
    url?: string;
}
/** CheckDetails is a JSON array representing the checks done in relation to the evidence.
 *  The "check_method" is REQUIRED (see https://bitbucket.org/openid/ekyc-ida/wiki/identifiers#check_methods):
 *  - check_method: REQUIRED. String representing the check done, this includes processes such as checking the authenticity of the document, or verifying the user's biometric against an identity document (e.g.: vcrypt, vdig, vpip, vpvp...)
 *  - organization: OPTIONAL. String denoting the legal entity that performed the check. This SHOULD be included if the OP did not perform the check itself.
 *  - txn: OPTIONAL. Identifier referring to the identity verification transaction. The OP MUST ensure that this is present when evidence_ref element is used. The OP MUST ensure that the transaction identifier can be resolved into transaction details during an audit.
 *  - time: OPTIONAL. Time stamp in ISO 8601 [ISO8601] YYYY-MM-DDThh:mm[:ss]TZD format representing the date when the check was completed.
 */
export interface CheckDetails {
    check_method: string;
    organization?: string;
    txn?: string;
    time?: string;
}
/** 'organization' is the organization ID which performed the verification on behalf of the OP */
export interface VerifierDLT {
    organization: string;
    txn?: string;
}
