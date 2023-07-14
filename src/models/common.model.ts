
export enum MethodHTTP {
    create = 'POST', // it generates a new ID for the resource (overwrites a given ID).
    delete = 'DELETE',
    read = 'GET',
    update = 'PUT' // it can be used to create a resource with a given ID.
}


const ReverseDnsFHIR = "org.hl7.fhir"
const ReverseDnsSchemaOrg =  "org.schema"
export enum ReverseDNS {
    fhir = ReverseDnsFHIR,
    schemaOrg = ReverseDnsSchemaOrg
}

export const TypeJsonApiSuffix = "json-api";
const TypePrimaryDocFHIR = ReverseDnsFHIR + "+" + TypeJsonApiSuffix;
const TypePrimaryDocSchemaOrg = ReverseDnsSchemaOrg + "+" + TypeJsonApiSuffix;
export enum TypePrimaryDoc {
    fhirBundleMessage = "org.hl7.fhir.bundle.message" + "+" + TypeJsonApiSuffix,
    fhirBundleBatch= "org.hl7.fhir.bundle.batch" + "+" + TypeJsonApiSuffix,
    fhirBundleTransaction = "org.hl7.fhir.bundle.transaction" + "+" + TypeJsonApiSuffix,
    fhirBundleCollection = "org.hl7.fhir.bundle.collection" + "+" + TypeJsonApiSuffix,
    fhirBundleDocument = "org.hl7.fhir.bundle.document" + "+" + TypeJsonApiSuffix,
    fhir = TypePrimaryDocFHIR,
    schemaOrg = TypePrimaryDocSchemaOrg
}