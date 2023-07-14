"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypePrimaryDoc = exports.TypeJsonApiSuffix = exports.ReverseDNS = exports.MethodHTTP = void 0;
var MethodHTTP;
(function (MethodHTTP) {
    MethodHTTP["create"] = "POST";
    MethodHTTP["delete"] = "DELETE";
    MethodHTTP["read"] = "GET";
    MethodHTTP["update"] = "PUT"; // it can be used to create a resource with a given ID.
})(MethodHTTP || (exports.MethodHTTP = MethodHTTP = {}));
const ReverseDnsFHIR = "org.hl7.fhir";
const ReverseDnsSchemaOrg = "org.schema";
var ReverseDNS;
(function (ReverseDNS) {
    ReverseDNS["fhir"] = "org.hl7.fhir";
    ReverseDNS["schemaOrg"] = "org.schema";
})(ReverseDNS || (exports.ReverseDNS = ReverseDNS = {}));
exports.TypeJsonApiSuffix = "json-api";
const TypePrimaryDocFHIR = ReverseDnsFHIR + "+" + exports.TypeJsonApiSuffix;
const TypePrimaryDocSchemaOrg = ReverseDnsSchemaOrg + "+" + exports.TypeJsonApiSuffix;
var TypePrimaryDoc;
(function (TypePrimaryDoc) {
    TypePrimaryDoc["fhirBundleMessage"] = "org.hl7.fhir.bundle.message+json-api";
    TypePrimaryDoc["fhirBundleBatch"] = "org.hl7.fhir.bundle.batch+json-api";
    TypePrimaryDoc["fhirBundleTransaction"] = "org.hl7.fhir.bundle.transaction+json-api";
    TypePrimaryDoc["fhirBundleCollection"] = "org.hl7.fhir.bundle.collection+json-api";
    TypePrimaryDoc["fhirBundleDocument"] = "org.hl7.fhir.bundle.document+json-api";
    TypePrimaryDoc["fhir"] = "org.hl7.fhir+json-api";
    TypePrimaryDoc["schemaOrg"] = "org.schema+json-api";
})(TypePrimaryDoc || (exports.TypePrimaryDoc = TypePrimaryDoc = {}));
//# sourceMappingURL=common.model.js.map