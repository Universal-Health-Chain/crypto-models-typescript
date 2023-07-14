export declare enum MethodHTTP {
    create = "POST",
    delete = "DELETE",
    read = "GET",
    update = "PUT"
}
export declare enum ReverseDNS {
    fhir = "org.hl7.fhir",
    schemaOrg = "org.schema"
}
export declare const TypeJsonApiSuffix = "json-api";
export declare enum TypePrimaryDoc {
    fhirBundleMessage = "org.hl7.fhir.bundle.message+json-api",
    fhirBundleBatch = "org.hl7.fhir.bundle.batch+json-api",
    fhirBundleTransaction = "org.hl7.fhir.bundle.transaction+json-api",
    fhirBundleCollection = "org.hl7.fhir.bundle.collection+json-api",
    fhirBundleDocument = "org.hl7.fhir.bundle.document+json-api",
    fhir = "org.hl7.fhir+json-api",
    schemaOrg = "org.schema+json-api"
}
