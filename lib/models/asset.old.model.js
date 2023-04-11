"use strict";
/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: align CertificationDataOutput with ResourceObject
// TODO: align CertificationInputAPI with ResourceObject
/* It has:
 *  - 'source' (DICOM, FHIR, SHC, DGC, VC and/or OMOP)
 *  - 'summary' (it can be used both for generating new records or to simplify a record from distinct data formats)
 *  - 'research' (DICOM, FHIR and/or OMOP)
 *
 *  NOTE: OMOP is the Observational Medical Outcomes Partnership (OMOP) Common Data Model (OMOP CDM), now in its version 6.0.
 
export interface RenderedDataOnEHR extends
    RenderedDataOnDLT
{
    source?:    GenericSourceData; // DICOM, FHIR, SHC, DGC, VC and/or OMOP
    summary?:   any;                // it can be used both for generating new records or to simplify a record from distinct data formats
}
*/ 
