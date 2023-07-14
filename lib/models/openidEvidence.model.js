"use strict";
/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenidCheckMethod = exports.OpenidPersonalPhysicalDocument = exports.OpenidVerificationMethod = exports.CountryAlpha3ISO = void 0;
/** Both OIDC4IDA 'country_code' and FHIR country code for National Identity Documents ('NNxxx') use ISO 3166/ICAO 3-letter codes [ICAO-Doc9303] */
exports.CountryAlpha3ISO = 'AFG' || 'ALB' || 'DZA' || 'ASM' || 'AND' || 'AGO' || 'AIA' || 'ATA' || 'ATG' || 'ARG' || 'ARM' || 'ABW' || 'AUS' || 'AUT' || 'AZE' || 'BHS' || 'BHR' || 'BGD' || 'BRB' || 'BLR' || 'BEL' || 'BLZ' || 'BEN' || 'BMU' || 'BTN' || 'BOL' || 'BES' || 'BIH' || 'BWA' || 'BVT' || 'BRA' || 'IOT' || 'BRN' || 'BGR' || 'BFA' || 'BDI' || 'CPV' || 'KHM' || 'CMR' || 'CAN' || 'CYM' || 'CAF' || 'TCD' || 'CHL' || 'CHN' || 'CXR' || 'CCK' || 'COL' || 'COM' || 'COD' || 'COG' || 'COK' || 'CRI' || 'HRV' || 'CUB' || 'CUW' || 'CYP' || 'CZE' || 'CIV' || 'DNK' || 'DJI' || 'DMA' || 'DOM' || 'ECU' || 'EGY' || 'SLV' || 'GNQ' || 'ERI' || 'EST' || 'SWZ' || 'ETH' || 'FLK' || 'FRO' || 'FJI' || 'FIN' || 'FRA' || 'GUF' || 'PYF' || 'ATF' || 'GAB' || 'GMB' || 'GEO' || 'DEU' || 'GHA' || 'GIB' || 'GRC' || 'GRL' || 'GRD' || 'GLP' || 'GUM' || 'GTM' || 'GGY' || 'GIN' || 'GNB' || 'GUY' || 'HTI' || 'HMD' || 'VAT' || 'HND' || 'HKG' || 'HUN' || 'ISL' || 'IND' || 'IDN' || 'IRN' || 'IRQ' || 'IRL' || 'IMN' || 'ISR' || 'ITA' || 'JAM' || 'JPN' || 'JEY' || 'JOR' || 'KAZ' || 'KEN' || 'KIR' || 'PRK' || 'KOR' || 'KWT' || 'KGZ' || 'LAO' || 'LVA' || 'LBN' || 'LSO' || 'LBR' || 'LBY' || 'LIE' || 'LTU' || 'LUX' || 'MAC' || 'MDG' || 'MWI' || 'MYS' || 'MDV' || 'MLI' || 'MLT' || 'MHL' || 'MTQ' || 'MRT' || 'MUS' || 'MYT' || 'MEX' || 'FSM' || 'MDA' || 'MCO' || 'MNG' || 'MNE' || 'MSR' || 'MAR' || 'MOZ' || 'MMR' || 'NAM' || 'NRU' || 'NPL' || 'NLD' || 'NCL' || 'NZL' || 'NIC' || 'NER' || 'NGA' || 'NIU' || 'NFK' || 'MNP' || 'NOR' || 'OMN' || 'PAK' || 'PLW' || 'PSE' || 'PAN' || 'PNG' || 'PRY' || 'PER' || 'PHL' || 'PCN' || 'POL' || 'PRT' || 'PRI' || 'QAT' || 'MKD' || 'ROU' || 'RUS' || 'RWA' || 'REU' || 'BLM' || 'SHN' || 'KNA' || 'LCA' || 'MAF' || 'SPM' || 'VCT' || 'WSM' || 'SMR' || 'STP' || 'SAU' || 'SEN' || 'SRB' || 'SYC' || 'SLE' || 'SGP' || 'SXM' || 'SVK' || 'SVN' || 'SLB' || 'SOM' || 'ZAF' || 'SGS' || 'SSD' || 'ESP' || 'LKA' || 'SDN' || 'SUR' || 'SJM' || 'SWE' || 'CHE' || 'SYR' || 'TWN' || 'TJK' || 'TZA' || 'THA' || 'TLS' || 'TGO' || 'TKL' || 'TON' || 'TTO' || 'TUN' || 'TUR' || 'TKM' || 'TCA' || 'TUV' || 'UGA' || 'UKR' || 'ARE' || 'GBR' || 'UMI' || 'USA' || 'URY' || 'UZB' || 'VUT' || 'VEN' || 'VNM' || 'VGB' || 'VIR' || 'WLF' || 'ESH' || 'YEM' || 'ZMB' || 'ZWE' || 'ALA';
/** Evidence is the certification of the authenticity of some (physical) document, (electronic) record, (electronic) signature, (utility) bill or vouch.
 * OpenID Connect for Identity Assurance 1.0: https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html
 * 5.1.1. Evidence Element - types of evidence:
 * - document: Verification based on any kind of physical or electronic document provided by the End-User.
 * - electronic_record: Verification based on data or information obtained electronically from an approved or recognized source.
 * - vouch: Verification based on an attestation or reference given by an approved or recognized person declaring they believe to the best of their knowledge that the Claim(s) are genuine and true.
 * - utility_bill: Verification based on a utility bill (this is to be deprecated in future releases and implementers are recommended to use the document type instead).
 * - electronic_signature: Verification based on an electronic signature.
*/
/**
 * pipp 	https://openid.net/verification_method/pipp 	Physical In-Person Proofing.
 * sripp 	https://openid.net/verification_method/sripp 	Supervised remote In-Person Proofing.
 * eid 	https://openid.net/verification_method/eid 	Online verification of an electronic ID card.
 * uripp 	https://openid.net/verification_method/uripp 	Unsupervised remote in-person proofing with video capture of the ID document, user self-portrait video and liveness checks.
 * onsite 	https://openid.net/verification_method/onsite 	Electronically onsite reading the document’s chip using an authorization certificate and card access number.
 */
var OpenidVerificationMethod;
(function (OpenidVerificationMethod) {
    OpenidVerificationMethod["PhysicalInPerson"] = "pipp";
    OpenidVerificationMethod["SupervisedRemoteInPerson"] = "sripp";
    OpenidVerificationMethod["OnlineElectronicID"] = "eid";
    OpenidVerificationMethod["UnsupervisedRemoteInPerson"] = "uripp";
    OpenidVerificationMethod["ElectronicallyOnsite"] = "onsite"; // 	https://openid.net/verification_method/onsite 	Electronically onsite reading the document’s chip using an authorization certificate and card access number.    
})(OpenidVerificationMethod || (exports.OpenidVerificationMethod = OpenidVerificationMethod = {}));
var OpenidPersonalPhysicalDocument;
(function (OpenidPersonalPhysicalDocument) {
    OpenidPersonalPhysicalDocument["IDcard"] = "idcard";
    OpenidPersonalPhysicalDocument["Passport"] = "passport";
    OpenidPersonalPhysicalDocument["DrivingLicense"] = "driving_permit";
    OpenidPersonalPhysicalDocument["ResidencePermit"] = "residence_permit";
    OpenidPersonalPhysicalDocument["TaxStatement"] = "tax_statement";
    OpenidPersonalPhysicalDocument["SocialSecurityStatement"] = "social_security_statement";
    OpenidPersonalPhysicalDocument["BankStatement"] = "bank_statement";
    OpenidPersonalPhysicalDocument["UtilityStatement"] = "utility_statement";
    OpenidPersonalPhysicalDocument["EducationCertificate"] = "education_certificate";
    OpenidPersonalPhysicalDocument["Visa"] = "visa";
    OpenidPersonalPhysicalDocument["MilitaryID"] = "military_id"; // 	https://openid.net/document/military_id 	An official military identity document issued by a country's government to its service personnel.
})(OpenidPersonalPhysicalDocument || (exports.OpenidPersonalPhysicalDocument = OpenidPersonalPhysicalDocument = {}));
var OpenidCheckMethod;
(function (OpenidCheckMethod) {
    OpenidCheckMethod["vpip"] = "vpip";
    OpenidCheckMethod["vpiruv"] = "vpiruv";
    OpenidCheckMethod["vri"] = "vri";
    OpenidCheckMethod["vdig"] = "vdig";
    OpenidCheckMethod["vcrypt"] = "vcrypt";
    OpenidCheckMethod["data"] = "data";
    OpenidCheckMethod["auth"] = "auth";
    OpenidCheckMethod["token"] = "token";
    OpenidCheckMethod["kbv"] = "kbv";
    OpenidCheckMethod["pvp"] = "pvp";
    OpenidCheckMethod["pvr"] = "pvr";
    OpenidCheckMethod["bvp"] = "bvp";
    OpenidCheckMethod["bvr"] = "bvr";
})(OpenidCheckMethod || (exports.OpenidCheckMethod = OpenidCheckMethod = {}));
/** https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#predefined_values_page
 * https://bitbucket.org/openid/ekyc-ida/wiki/identifiers
 *

Identifier 	URI 	Definition
de_aml 	https://openid.net/trust_framework/de_aml 	The OP verifies and maintains user identities in conforms with the German Anti-Money Laundering Law.
eidas 	https://openid.net/trust_framework/eidas 	The OP is able to attest user identities in accordance with the EU regulation No 910/2014 (eIDAS).
nist_800_63A 	https://openid.net/trust_framework/nist_800_63A 	The OP is able to attest user identities in accordance with the NIST Special Publication 800-63A.
jp_aml 	https://openid.net/trust_framework/jp_aml 	The OP verifies and maintains user identities in conforms with the Japanese Act on Prevention of Transfer of Criminal Proceeds.
jp_mpiupa 	https://openid.net/trust_framework/jp_mpiupa 	The OP verifies and maintains user identities in conformance with the Japanese Act for Identification, etc. by Mobile Voice Communications Carriers of Their Subscribers, etc. and for Prevention of Improper Use of Mobile Voice Communications Services.
cz_aml 	https://openid.net/trust_framework/cz_aml 	The OP verifies and maintains user identities in conformance with the Czech Anti-Money Laundering Law.
de_tkg111 	https://openid.net/trust_framework/de_tkg111 	The OP verifies and maintains user identities in conforms with the German Telekommuncations Law (here §111).
be_itsme 	https://openid.net/trust_framework/be_itsme 	The OP verifies and maintains user identities in conforms with the Belgian law on electronic identification.
se_bankid 	https://openid.net/trust_framework/se_bankid 	The OP verifies and maintains user identities in conforms with the requirements of the Swedish e-ID.
it_spid 	https://openid.net/trust_framework/it_spid 	The OP is accredited by the Agency for Digital Italy as an identity provider in the Public Digital Identity System (SPID).
nl_eHerkenning 	https://openid.net/trust_framework/nl_eHerkenning 	The OP is accredited as an identity provider in the Dutch Trust Framework for Electronic Identification.
uk_tfida 	https://openid.net/trust_framework/uk_tfida 	The OP is certified as an identity service provider in the UK trust framework for digital identity and attributes.
au_tdif 	https://openid.net/trust_framework/au_tdif 	The OP is accredited as an identity service provider under the AU Trusted Digital Identity Framework.

Assurance levels
Identifier 	URI 	Definition
very_low 	https://openid.net/identity_assurnace_level/very_low 	Very low confidence/assurance in the identity.
low 	https://openid.net/identity_assurnace_level/low 	Low confidence/assurance in the identity. Used in eIDAS & UK TFIDA.
medium 	https://openid.net/identity_assurnace_level/medium 	Medium confidence/assurance in the identity. Used in UK TFIDA.
substantial 	https://openid.net/identity_assurnace_level/substantial 	Substantial confidence/assurance in the identity. Used in eIDAS.
high 	https://openid.net/identity_assurnace_level/high 	High confidence/assurance in the identity. Used in eIDAS & UK TFIDA.
very_high 	https://openid.net/identity_assurnace_level/very_high 	Very high confidence/assurance in the identity. Used in UK TFIDA.
ial1 	https://openid.net/identity_assurnace_level/ial1 	No link between the user and a specific real-life identity. Used in US NIST-800-63-3.
ial2 	https://openid.net/identity_assurnace_level/ial2 	A real-world existence of the claimed identity and verifies that the user is appropriately associated with it. Used in US NIST-800-63-3.
ial3 	https://openid.net/identity_assurnace_level/ial3 	Identity of the user proven by physical presence by an authorized and trained representative. Used in US NIST-800-63-3.
al2 	https://openid.net/identity_assurnace_level/al2 	An assurance level that is, or equivalent to, a one-time code sent via mail to the address of the owner of the claims. Used in SE BankID.
al3 	https://openid.net/identity_assurnace_level/al3 	An assurance level that is, or equivalent to, a in person verification with an ID document, but provided remotely . Used in SE BankID.

Documents
Note: ‘id_documents’ may be used instead of ‘document’ for backward compatibility purposes. This is expected to be deprecated in future releases and implementers are advised to use ‘document’.

Identifier 	URI 	Definition
idcard 	https://openid.net/document/idcard 	An identity document issued by a country's government for the purpose of identifying a citizen.
passport 	https://openid.net/document/passport 	A passport is a travel document, usually issued by a country's government, that certifies the identity and nationality of its holder primarily for the purpose of international travel. (see OxfordPassport).
driving_permit 	https://openid.net/document/driving_permit 	Official document permitting an individual to operate motorized vehicles. In the absence of a formal identity document, a driver's license may be accepted in many countries for identity verification.
residence_permit 	https://openid.net/document/residence_permit 	Official document permitting an individual to reside within a particular jurisdiction.
de_idcard_foreigners 	https://openid.net/document/de_idcard_foreigners 	ID Card issued by the German government to foreign nationals.
de_emergency_idcard 	https://openid.net/document/de_emergency_idcard 	ID Card issued by the German government to foreign nationals as passports replacement.
de_erp 	https://openid.net/document/de_erp 	Electronic Resident Permit issued by the German government to foreign nationals.
de_erp_replacement_idcard 	https://openid.net/document/de_erp_replacement_idcard 	Electronic Resident Permit issued by the German government to foreign nationals as replacement for another identity document.
de_idcard_refugees 	https://openid.net/document/de_idcard_refugees 	ID Card issued by the German government to refugees as passports replacement.
de_idcard_apatrids 	https://openid.net/document/de_idcard_apatrids 	ID Card issued by the German government to apatrids as passports replacement.
de_certificate_of_suspension_of_deportation 	https://openid.net/document/de_certificate_of_suspension_of_deportation 	identity document issued to refugees in case of suspension of deportation that are marked as "id card replacement".
de_permission_to_reside 	https://openid.net/document/de_permission_to_reside 	permission to reside issued by the German governed to foreign nationals applying for asylum
de_replacement_idcard 	https://openid.net/document/de_replacement_idcard 	ID Card replacement document issued by the German government to foreign nationals (see Act on the Residence, Economic Activity and Integration of Foreigners in the Federal Territory, Residence Act, Appendix D1 ID Card replacement according to § 48 Abs. 2 i.V.m. § 78a Abs. 4).
jp_drivers_license 	https://openid.net/document/jp_drivers_license 	Japanese drivers license.
jp_residency_card_for_foreigner 	https://openid.net/document/jp_residency_card_for_foreigner 	Japanese residence card for foreigners.
jp_individual_number_card 	https://openid.net/document/jp_individual_number_card 	Japanese national id card.
jp_permanent_residency_card_for_foreigner 	https://openid.net/document/jp_permanent_residency_card_for_foreigner 	Japanese special residency card for foreigners to permit permanent residence.
jp_health_insurance_card 	https://openid.net/document/jp_health_insurance_card 	Japanese health and insurance card.
jp_residency_card 	https://openid.net/document/jp_residency_card 	Japanese residency card.
bank_statement 	https://openid.net/document/bank_statement 	Bank statement from a recognized banking institution.
utility_statement 	https://openid.net/document/utility_statement 	Statement from a recognized utility provider.
mortgage_statement 	https://openid.net/document/mortgage_statement 	Statement from a recognized mortgage provider.
loan_statement 	https://openid.net/document/loan_statement 	Statement from a recognized loan provider.
tax_statement 	https://openid.net/document/tax_statement 	Statement from a country's tax authority.
social_security_statement 	https://openid.net/document/social_security_statement 	Statement from a country's social security authority.
pilot_permit 	https://openid.net/document/pilot_permit 	Official document permitting an individual to operate an aircraft.
birth_certificate 	https://openid.net/document/birth_certificate 	Official document certifying the circumstances of a birth.
adoption_certificate 	https://openid.net/document/adoption_certificate 	Official document certifying the circumstances of an adoption.
marriage_certificate 	https://openid.net/document/marriage_certificate 	Official document certifying the circumstances of a marriage.
gender_certificate 	https://openid.net/document/gender_certificate 	Official document certifying that a person has satisfied the criteria for legal recognition in the acquired gender.
firearm_permit 	https://openid.net/document/firearm_permit 	Official document permitting an individual to use or own a firearm.
education_certificate 	https://openid.net/document/education_certificate 	Document certifying that a person has received specific education or has passed a test or series of tests.
visa 	https://openid.net/document/visa 	Document that grants the holder official permission to enter, leave or stay in a country.
military_id 	https://openid.net/document/military_id 	An official military identity document issued by a country's government to its service personnel.
voter_id 	https://openid.net/document/voter_id 	An official voter identity document.

Electronic records
Identifier 	URI 	Definition
birth_register 	https://openid.net/record/birth_register 	A record from an official register of births.
population_register 	https://openid.net/record/population_register 	A record from an official population register.
voter_register 	https://openid.net/record/voter_register 	A record from an official register of voters.
adoption_register 	https://openid.net/record/adoption_register 	A record from an official register of adoptions.
marriage_register 	https://openid.net/record/marriage_register 	A record from an official register of marriages.
education 	https://openid.net/record/education 	A authoritative record of a person having received specific education or has passed a test or series of tests.
military 	https://openid.net/record/military 	A military personnel record.
bank_account 	https://openid.net/record/bank_account 	A record of a bank account from a recognized banking institution.
utility_account 	https://openid.net/record/utility_account 	A record of an account from a recognized utility provider.
mortgage_account 	https://openid.net/record/mortgage_account 	A record of a mortgage from a recognized mortgage provider.
loan_account 	https://openid.net/record/loan_account 	A record of a loan from a recognized loan provider.
tax 	https://openid.net/record/tax 	A record from a country's tax authority.
social_security 	https://openid.net/record/social_security 	A record from a country's social security authority.
prison_record 	https://openid.net/record/prison_record 	A record from an institution or authority for the confinement of persons who have been deprived of their liberty following a criminal conviction by a judicial process.

Methods
Identifier 	URI 	Definition
pipp 	https://openid.net/verification_method/pipp 	Physical In-Person Proofing.
sripp 	https://openid.net/verification_method/sripp 	Supervised remote In-Person Proofing.
eid 	https://openid.net/verification_method/eid 	Online verification of an electronic ID card.
uripp 	https://openid.net/verification_method/uripp 	Unsupervised remote in-person proofing with video capture of the ID document, user self-portrait video and liveness checks.
onsite 	https://openid.net/verification_method/onsite 	Electronically onsite reading the document’s chip using an authorization certificate and card access number.

Validation Methods
Identifier 	URI 	Definition
vpip 	https://openid.net/validation_method/vpip 	Validation that physical evidence is genuine through inspection of its physical properties in person.
vpiruv 	https://openid.net/validation_method/vpiruv 	Validation that physical evidence is genuine through inspection of its physical properties in person including its optical characteristics under non-visible light.
vri 	https://openid.net/validation_method/vri 	Validation that physical evidence is genuine through the inspection of an image taken remotely under visible light.
vdig 	https://openid.net/validation_method/vdig 	Validation that digital/electronic evidence is genuine by the inspection of its properties and content.
vcrypt 	https://openid.net/validation_method/vcrypt 	Validation the cryptographic security features of the evidence are intact and correct.
data 	https://openid.net/validation_method/data 	Found an existing electronic_record that matches the claims made by the user.
Verification Methods
Identifier 	URI 	Definition
auth 	https://openid.net/verification_method/auth 	Verifying the user is the owner of the claims by use of an electronic authentication process that is linked to the owner of the claims.
token 	https://openid.net/verification_method/token 	Verifying the user is the owner of the claims by use of an electronic authentication token such as hardware token or smartcard that is linked and issued to the owner of the claims.
kbv 	https://openid.net/verification_method/kbv 	Verifying the user is the owner of the claims by knowledge based challenges/questions that only the owner of the claims should know how to answer.
pvp 	https://openid.net/verification_method/pvp 	Physical verification in person by a qualified/authorised person, the comparison of a physical characteristic (such as face) of the user with a known image/template of the owner of the claims.
pvr 	https://openid.net/verification_method/pvr 	Physical verification by a qualified/authorised person when the user is remote, the comparison of a physical characteristic (such as face) from an image or video of the user with a known image/template of the owner of the claims.
bvp 	https://openid.net/verification_method/bvp 	Biometric verification by an automated system with the user physically present to the system and the verifier, the use of a biometric modality (such as face) to match the user with a known template of the owner of the claims.
bvr 	https://openid.net/verification_method/bvr 	Biometric verification by an automated system where the user and capture device is remote to the verifier, the use of a biometric modality (such as face) to match the user with a known template of the owner of the claims.
Vouches
Identifier 	URI 	Definition
written_attestation 	https://openid.net/vouch/written_attestation 	A written/printed statement/letter from a recognised person or authority regarding the identity of the user.
digital_attestation 	https://openid.net/vouch/digital_attestation 	A statement from a recognised person or authority regarding the identity of the user that was made and stored electronically.
*/ 
//# sourceMappingURL=openidEvidence.model.js.map