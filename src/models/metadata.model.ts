/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

import { CredentialStatusExtensionResolve } from './credentialCommon.model';
import { AuditInfo, MetadataResourceObject } from './jsonApi.model';
import { IssuerElectronicRecordBase } from './oidc4ida.electronicRecord.model';
import { CountryAlpha3ISO } from './openidEvidence.model';

/** 
 *  - country_code: should be mandatory (ISO 3 letter, e.g.: ESP)
 *  - jurisdiction: region (ISO code, e.g.: ES-CL)
 */
export interface MetadataGeographicOnDLT extends
    IssuerElectronicRecordBase
{
    country_code?:   typeof CountryAlpha3ISO;    // ISO 3 letter, same as OpenID and FHIR national identity sdocument NNxxx (e.g.: ESP)
    jurisdiction?:   string;                     // ISO (e.g.: a region such as ES-CL)
    // postal_code?: string;
}

/** 
 *  - country_code: should be mandatory (ISO 3 letter, e.g.: ESP)
 *  - jurisdiction: ISO (e.g.: a region such as ES-CL)
 *  - parentId: de-identified ID to link several anonym resources from a FHIR Bundle document or collection.
 *  - tags: non-personal tags such as "COVID-19" and resource types (Observation, etc.).
 *  - type: reverse DNS is recommended (e.g.: "org.hl7.fhir.R5.Bundle.document")
 */
export interface MetadataResearch extends
    MetadataGeographicOnDLT
{
    parentId?:  string;    // de-identified ID to link several anonym resources from a FHIR Bundle document or collection.
    tags?:      string[];  // non-personal tags such as "COVID-19" and resource types (Observation, etc.)
    type?:      string;    // reverse DNS, e.g.: "org.hl7.fhir.R5.Bundle.document"
}

/** Defining a public key on blockchain.
 *  See: https://w3c-ccg.github.io/did-spec/#public-keys
 *  Note: the ID is not stored within the asset.
 *  - controller: the DID of the controller / owner for this key.
 *  - type: the type of this public key, such as JsonWebKey2020 as defined in https://w3c-ccg.github.io/ld-cryptosuite-registry/
 */
export interface PublicMetadataOnBlockchain extends
    MetadataResourceObject // TODO: use MetadataBaseResource instead
{
    audit?: AuditIdentityInfo;
    versionId?: string;
}

/** Audit metadada for traceability.
 *  Data set by the software application:
 *  - "created": when the data was first written on the blockchain (ISO format, e.g.: "2023-02-23T06:35:22Z")
 *  - "updated": when was last modified on blockchain, revoked or rotated (ISO format, e.g.: "2023-03-16T13:40:06Z").
 *  - "deactivated": true if removed or deactivated (note: the deactivated date is the "updated" timestamp).
 *
 *  Data set by the SC:
 *  - "nextUpdate": ID of the asset who replaces the old one (e.g.: a hashed KeyID)
 *  - "channel" name of the channel where the data is audited on the blockchain network.
 *  - "txId": Base58 encoded blockchain's transaction identifier (32 bytes).
 *  - "txTime": timestamp of the transaction on the blockchain channel (ISO format).
 */
export interface AuditIdentityInfo extends
    AuditInfo, // created, deactivated, updated, channel, txId and txTime
    CredentialStatusExtensionResolve // currentStatus, statusReason
{
    created?: string;
    deactivated?: boolean;    // revoked (it can be updated/replaced or not).
    nextUpdate?: string;     // hash of the new KeyID which replaces this one.
    updated?: string;     // rotation timestamp.
    channel?: string;
    txId?: string;
    txTime?: string;
}