import { DidDetailsBlockchain, DidDocument, MetaDidDocument } from "./didDocument.model";

/** DidData is the DID resolution data: https://w3c-ccg.github.io/did-resolution/
 *  EBSIv2 DID resolution only returns the DID Document but not the metadata:
 *  https://ec.europa.eu/digital-building-blocks/wikis/display/EBSIDOC/Verifiable+Credential+API+and+Library
 *  It has:
 *  - didDocument
 *  - didDocumentMetadata
 *  - didResolutionMetadata
 */
export interface DidData {
	didDocument?:           DidDocument;
	didDocumentMetadata?:   MetaDidDocument;
	didResolutionMetadata?: DidDetailsBlockchain;
}