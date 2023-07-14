"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MimeType = void 0;
/** Note: prefix "application/"" (didcomm, pdf) or "image/"" (jpeg, png, svg) are not included,
 *  so 'contains' must be used instead doing a comparison.
 */
var MimeType;
(function (MimeType) {
    MimeType["didcommEncryptedJson"] = "didcomm-encrypted+json";
    MimeType["didcomSignedJson"] = "didcomm-signed+json";
    MimeType["didcomPlaintextJson"] = "didcomm-plain+json";
    MimeType["fhirJson"] = "fhir+json";
    MimeType["fhirXml"] = "fhir+xml";
    MimeType["jpeg"] = "jpeg";
    MimeType["openEhrFlatSimSdtJson"] = "openehr-simsdt+json";
    MimeType["pdf"] = "pdf";
    MimeType["png"] = "png";
    MimeType["svg"] = "svg+xml";
    MimeType["txt"] = "text/plain";
})(MimeType || (exports.MimeType = MimeType = {}));
//# sourceMappingURL=mime.model.js.map