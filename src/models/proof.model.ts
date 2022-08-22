/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

/** Digest object represents a cryptographic hash of some bytes (e.g.: the content of a document).
 *  It has 'alg' and 'value' (Base64 encoded, not hexadecimal such as in W3C format).
 */
 export interface DigestResultOpenIdData {
  alg:    string; // REQUIRED. Specifies the algorithm used for the calculation of the cryptographic hash. The algorithm has been negotiated previously between RP and OP during Client Registration or Management.
  value:  string; // REQUIRED. Base64 encoded representation of the cryptographic hash.
}

/** ProofEBSIv2 foresees the possibility to use different types of proofs for Verifiable Credentials,
 *  such as proofs derived from eIDAS keys (qualified) to DID keys (unqualified).
 *  In EBSI 2.0, every V-ID will only contain a single proof, which must be derived from eIDAS keys.
 *  Definition: https://www.w3.org/TR/vc-data-model/#proofs-signatures
 *  See https://ec.europa.eu/digital-building-blocks/wikis/display/EBSIDOC/Verifiable+Attestation
 *  - 'created' is REQURED, it is the ISO 8601 original timestamp of the signature, it is not the same as credential.issued (tx timestamp) (in Aries go framework use *util.TimeWithTrailingZeroMsec instead of time.Time)
 *  - 'jws' is REQUIRED, it defines the proof value in JWS signature format (detached payload, only JWS signature data encoded as raw Base64Url-safe without header or payload)
 *  - 'proofPurpose' is REQUIRED, e.g.: authentication, assertionMethod, keyAgreement, contractAgreement, capabilityInvocation, capabilityDelegation
 *  - 'type' is REQUIRED, e.g.: "Ed25519Signature2018", "BbsBlsSignature2020", "BbsBlsSignatureProof2020".
 *  - 'verificationMethod' is REQUIRED, it is the 'urndid#keyId' to verify the signature by using the public key stored on a private DID document (or in a public DID document if PQC).
 */
 export interface ProofEBSIv2  {
	created?:               string // ISO 8601 original timestamp of the signature, it is not the same as credential.issued (tx timestamp) (in Aries go framework use *util.TimeWithTrailingZeroMsec instead of time.Time)
	jws?:                   string // deattached signature base64url encoded
	proofPurpose?:          string // authentication, assertionMethod, keyAgreement, contractAgreement, capabilityInvocation, capabilityDelegation
	type?:                  string // "Ed25519Signature2018", "BbsBlsSignature2020", "BbsBlsSignatureProof2020"
	verificationMethod?:    string // urndid#keyId to verify the signature by using the public key stored on a private DID document (not in a public DID document because of Quantum resistance)
}

/** A data integrity proof is designed to be easy to use by developers and therefore strives to
 *  minimize the amount of information one has to remember to generate a proof.
 *  At a minimum, a proof type / signature sub-class SHOULD express at least three signature algorithm properties:
 *  canonicalizationAlgorithm, digestAlgorithm, and signatureAlgorithm.
 */
export interface ProofTypeW3C {
  id?:                        string; // e.g.: "https://w3id.org/security#Ed25519Signature2020",
  type:                       string; // e.g.: "Ed25519VerificationKey2020",
  canonicalizationAlgorithm?: string; // "https://w3id.org/security#URDNA2015",
  digestAlgorithm?:           string; // "https://www.ietf.org/assignments/jwa-parameters#SHA256",
  signatureAlgorithm?:        string; // "https://w3id.org/security#ed25519"
}

/** W3C's 'digestValue' is encoded in hexadecimal but OpenID's 'value' is Base64 encoded.
 *  ResourceDigest to be used both in 'credentialSubject' and in cryptographic digest message.
 *  see https://w3c-ccg.github.io/security-vocab/#Digest
 */
export interface DigestW3C
  // extends ProofTypeW3C // signatureAlgorithm  and type are not required for Digest
{
  id?:                        string;     // the resource / document ID it refers (same as JWT.sub). NOTE: split the URN for getting the UUID
  canonicalizationAlgorithm?: string;     // algorithm used before generating the digest
  digestAlgorithm:            string;     // the cryptographic function used when generating the data digitally signed
  digestValue:                string;     // hexadecimal digest value (base-16 format)
  normalizationAlgorithm?:    string;     // algorithm used before generating the digest
}

// import from uhc-service-client-typescript models Signature
export interface ChallengeToSign {  // see https://w3c-ccg.github.io/security-vocab/
  capability:         string;     // to use the cryptographic keys associated with the required capability
  challenge:          string;     // hexadecimal SHA digest value (base-16 format) or UUID random v4 strings
  digestAlgorithm?:   string;     // if challenge is a digest: "sha3-256"
  proofPurpose:       string;     // the purpose of the signature: "digest", "authentication", "assertionMethod" ...
  type?:              string;     // type of signature to be used, "Ed25519Signature2018" is the default
}

export interface ProofSignatureCL {
  attributes?:                string;     // for ZKP CL-Signatures: https://www.w3.org/TR/vc-data-model/#zero-knowledge-proofs
  issuerData?:                string;     // for ZKP CL-Signatures
  proofPurpose?:              string;     // authentication, assertionMethod, keyAgreement, contractAgreement, capabilityInvocation, capabilityDelegation
  signatureCorrectnessProof?: string;     // for ZKP CL-Signatures
  signature?:                 string;     // for ZKP CL-Signatures, "BbsBlsSignature2020"?
  type?:                      string;     // "Ed25519Signature2018", "BbsBlsSignature2020", "BbsBlsSignatureProof2020"
}

/** To ensure the authenticity and integrity of structured digital documents using cryptography,
 *  such as digital signatures and other digital mathematical proofs.
 *  https://w3c-ccg.github.io/data-integrity-spec/
 *
 *  The Signature Suite utilizes BBS+ signatures to provide the capability of zero knowledge proof disclosures 
 *  A BBS proof of knowledge linked data proof is a proof that is derived from a BbsBlsSignature2020 linked data proof
 *  where by a sub-set of the original statements are revealed
 *  See https://w3c-ccg.github.io/ldp-bbs2020/#proof-type
 *  and https://w3c-ccg.github.io/ldp-bbs2020/#the-bbs-signature-proof-suite-2020 (derived).
 */
export interface ProofDataIntegrityW3C extends
  ProofEBSIv2 // type, created, ver
{
  cryptosuite?:               string; // 
  proofValue?:                string; // for Ed25519Signature2018 / BbsBlsSignature2020 (original, not derived), but not for a derived BbsBlsSignatureProof2020
  nonce?:                     string; // only for BbsBlsSignatureProof2020 (derived), but not for the original BbsBlsSignature2020
}

/** Digest Data to be used for both the original FHIR resource (then contained into 'credentialSubject'), for the cryptographic proof of the VC, etc. */
export interface ResourceDigestUHC extends
  DigestW3C
{
  holder?:                    string;     // UUID (not didKeyId) of the patient to whom the resource / document refers, who may have legal guardians (split URN and FHIR reference)
}

/** A signature sub-class SHOULD express at least three signature algorithm properties: canonicalizationAlgorithm, digestAlgorithm, and signatureAlgorithm
 *  see https://w3c-ccg.github.io/security-vocab/#Digest
 *  - created
 *  - signatureAlgorithm
 *  - signatureValue
 *  - verificationMethod
 */
export interface ProofDigestSignedUHC extends
  ResourceDigestUHC, // see https://w3c-ccg.github.io/security-vocab/#Digest
  ProofDataIntegrityW3C
{}

/**
 *  https://w3c-ccg.github.io/security-vocab/
 *  CapabilityChain must be an array. Each element is either a string or an object.
 *  created and verificationMethod are common with signature
 */
export interface ProofFullW3C extends
  ProofDataIntegrityW3C,
  ProofSignatureCL
{
  // capabilityChain?:     string[]; // must be an array. Each element is either a string or an object[] (interface{} in golang). See https://pkg.go.dev/github.com/hyperledger/aries-framework-go/pkg/doc/verification
  challenge?:           string;   // e.g.: a digest value
  doconcept?:           string;   // e.g.: "https://example.com"
  id?:                  string;   // ID of the resource or document to wich the proof refers
  jws?:                 string;   // base64(header) + '.' + (no body) + '.' + base64(signature) if 'Ed25519Signature2018', 'JsonWebSignature2020' or 'RsaSignature2018' signature types (else use 'proofValue' for 'BbsBlsSignature2020')
  x509CertificateChain?:string;   // ordered list where each value in the list is an X.509 Certificate expressed as a DER PKIX format, that is encoded with multibase using the base64pad variant.
}

/** ProofFullWithDigest contains mixed digest data and proof data */
export interface ProofFullWithDigest extends
  DigestW3C,
  ProofDataIntegrityW3C,
  ProofSignatureCL
{
  // capabilityChain?:     string[]; // must be an array. Each element is either a string or an object[] (interface{} in golang). See https://pkg.go.dev/github.com/hyperledger/aries-framework-go/pkg/doc/verification
  challenge?:           string;   // e.g.: a digest value
  doconcept?:           string;   // e.g.: "https://example.com"
  id?:                  string;   // ID of the resource or document to wich the proof refers
  jws?:                 string;   // base64(header) + '.' + (no body) + '.' + base64(signature) if 'Ed25519Signature2018', 'JsonWebSignature2020' or 'RsaSignature2018' signature types (else use 'proofValue' for 'BbsBlsSignature2020')
  x509CertificateChain?:string;   // ordered list where each value in the list is an X.509 Certificate expressed as a DER PKIX format, that is encoded with multibase using the base64pad variant.
}

/** LD-Proof */
export interface LinkedDataProof {
  proof?:     ProofFullW3C[];
}

// https://github.com/w3c-ccg/ld-proofs/issues/26#issuecomment-830029583
// Section 9 of the current specification states that at minimum a new proof type is expected to have
// an id, type, canonicalizationAlgorithm, digestAlgorithm, and proofAlgorithm.
// https://w3c-ccg.github.io/ld-proofs/#creating-new-proof-types

/* https://www.w3.org/TR/vc-data-model/#zero-knowledge-proofs
"proof": {
  "type": "CLSignature2019",
  "issuerData": "5NQ4TgzNfSQxoLzf2d5AV3JNiCdMaTgm...BXiX5UggB381QU7ZCgqWivUmy4D",
  "attributes": "pPYmqDvwwWBDPNykXVrBtKdsJDeZUGFA...tTERiLqsZ5oxCoCSodPQaggkDJy",
  "signature": "8eGWSiTiWtEA8WnBwX4T259STpxpRKuk...kpFnikqqSP3GMW7mVxC4chxFhVs",
  "signatureCorrectnessProof": "SNQbW3u1QV5q89qhxA1xyVqFa6jCrKwv...dsRypyuGGK3RhhBUvH1tPEL8orH"
}
*/

/** The used language is not specified, but is usually bound to the jurisdiction of the underlying trust framework of the OP. */
export interface AttachedSignatureDLT {
  // desc?:          string; // OPTIONAL. Description of the document. This can be the filename or just an explanation of the content (e.g. "Back of id document")
  content_type:   string; // e.g.: 'jws' or 'Ed25519',
  content:        string; // bytes encoded in Base64
}

