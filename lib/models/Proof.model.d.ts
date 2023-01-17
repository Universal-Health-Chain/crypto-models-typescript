/** Digest object represents a cryptographic hash of some bytes (e.g.: the content of a document).
 *  It has 'alg' and 'value' (Base64 encoded, not hexadecimal such as in W3C format).
 */
export interface DigestResultOpenIdData {
    alg: string;
    value: string;
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
export interface ProofEBSIv2 {
    created?: string;
    jws?: string;
    proofPurpose?: string;
    type?: string;
    verificationMethod?: string;
}
/** A data integrity proof is designed to be easy to use by developers and therefore strives to
 *  minimize the amount of information one has to remember to generate a proof.
 *  At a minimum, a proof type / signature sub-class SHOULD express at least three signature algorithm properties:
 *  canonicalizationAlgorithm, digestAlgorithm, and signatureAlgorithm.
 */
export interface ProofTypeW3C {
    id?: string;
    type: string;
    canonicalizationAlgorithm?: string;
    digestAlgorithm?: string;
    signatureAlgorithm?: string;
}
/** W3C's 'digestValue' is encoded in hexadecimal but OpenID's 'value' is Base64 encoded.
 *  ResourceDigest to be used both in 'credentialSubject' and in cryptographic digest message.
 *  see https://w3c-ccg.github.io/security-vocab/#Digest
 */
export interface DigestW3C {
    id?: string;
    canonicalizationAlgorithm?: string;
    digestAlgorithm: string;
    digestValue: string;
    normalizationAlgorithm?: string;
}
export interface ChallengeToSign {
    capability: string;
    challenge: string;
    digestAlgorithm?: string;
    proofPurpose: string;
    type?: string;
}
export interface ProofSignatureCL {
    attributes?: string;
    issuerData?: string;
    proofPurpose?: string;
    signatureCorrectnessProof?: string;
    signature?: string;
    type?: string;
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
export interface ProofDataIntegrityW3C extends ProofEBSIv2 {
    cryptosuite?: string;
    proofValue?: string;
    nonce?: string;
}
/** Digest Data to be used for both the original FHIR resource (then contained into 'credentialSubject'), for the cryptographic proof of the VC, etc. */
export interface ResourceDigestUHC extends DigestW3C {
    holder?: string;
}
/** A signature sub-class SHOULD express at least three signature algorithm properties: canonicalizationAlgorithm, digestAlgorithm, and signatureAlgorithm
 *  see https://w3c-ccg.github.io/security-vocab/#Digest
 *  - created
 *  - signatureAlgorithm
 *  - signatureValue
 *  - verificationMethod
 */
export interface ProofDigestSignedUHC extends ResourceDigestUHC, // see https://w3c-ccg.github.io/security-vocab/#Digest
ProofDataIntegrityW3C {
}
/**
 *  https://w3c-ccg.github.io/security-vocab/
 *  CapabilityChain must be an array. Each element is either a string or an object.
 *  created and verificationMethod are common with signature
 */
export interface ProofFullW3C extends ProofDataIntegrityW3C, ProofSignatureCL {
    challenge?: string;
    doconcept?: string;
    id?: string;
    jws?: string;
    x509CertificateChain?: string;
}
/** ProofFullWithDigest contains mixed digest data and proof data */
export interface ProofFullWithDigest extends DigestW3C, ProofDataIntegrityW3C, ProofSignatureCL {
    challenge?: string;
    doconcept?: string;
    id?: string;
    jws?: string;
    x509CertificateChain?: string;
}
/** LD-Proof */
export interface LinkedDataProof {
    proof?: ProofFullW3C[];
}
/** The used language is not specified, but is usually bound to the jurisdiction of the underlying trust framework of the OP. */
export interface AttachedSignatureDLT {
    content_type: string;
    content: string;
}
/** It defines some extensions as proof:
 *  - claims: child claims from the parent JSON data.
 *  - digest: digest data of the parent JSON data.
 *  - signatures: they can be converted for both W3C Proof and FHIR Provenance / Signature
 *  and it contains all the W3C Proof properties plus addition digest of the signature (if the signature data is not stored on blockchain)
 *
 *  NOTE: evidences are added later when extending it (e.g.: physical document verification)
 */
export interface ProofCertificationBasic {
    claims?: ProofClaimElementOnDLT[];
    digest?: DigestResultOpenIdData;
    signatures?: ProofSignatureOnDLT[];
}
/** It cannot contain neither the 'id' nor the 'value' of the claim stored on the blockchain.
 *  It is limited to:
 *  - digest: it is calculated by creating a sorted object with both 'id' and the element's name as key along with 'value' content as data, e.g.: {effectiveDateTime: value, id: "uuidv4"}
 *  - element: the parent element name, e.g.: effectiveDateTime
 *  - name: FHIR param name or claim name, e.g.: 'date' or 'date-yy'
 */
export interface ProofClaimElementOnDLT {
    digest: DigestResultOpenIdData;
    element?: string;
    name?: string;
}
/** It contains all the W3C Proof properties plus addition digest of the signature (if the signature data is not stored on blockchain) */
export interface ProofSignatureOnDLT extends ProofFullW3C {
    digest?: DigestResultOpenIdData;
}
