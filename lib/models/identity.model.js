"use strict";
/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalDocumentUHC = exports.ElectronicRecordUHC = exports.EducationKind = exports.IdKind = void 0;
/** Types of identifiers: http://terminology.hl7.org/CodeSystem/v2-0203
 *  UHC uses the HL7 "identifierType" coding system but with reverse-dns (same as ISO)
 *  instead of using the OpenID physical document types.
 */
var IdKind;
(function (IdKind) {
    // from ISO
    IdKind["MobileDriverLicense"] = "org.iso.18013.5.1.mDL";
    // From HL7 http://terminology.hl7.org/CodeSystem/v2-0203)
    // Personal identity documents (credentials and types of proofs)
    IdKind["PersonalDriverLicense"] = "org.hl7.terminology.codesystem.v2-0203.DL";
    IdKind["PersonalCitizenshipCard"] = "org.hl7.terminology.codesystem.v2-0203.CZ";
    IdKind["PersonalNationalNumber"] = "org.hl7.terminology.codesystem.v2-0203.NN";
    IdKind["RegionalHeathCardNumber"] = "org.hl7.terminology.codesystem.v2-0203.JHN";
    IdKind["LocalHealthCard"] = "org.hl7.terminology.codesystem.v2-0203.HC";
    IdKind["LocalDonorRecord"] = "org.hl7.terminology.codesystem.v2-0203.DR";
    IdKind["LocalPatientIdentifier"] = "org.hl7.terminology.codesystem.v2-0203.PI";
    // Professional identity documents (credentials and types of proofs): e.g.: licensed or not.
    // (not for client_id nor for professional qualifications).
    IdKind["ProfessionalDentistLicenseNumber"] = "org.hl7.terminology.codesystem.v2-0203.DDS";
    IdKind["ProfessionalDoctorOfMedicine"] = "org.hl7.terminology.codesystem.v2-0203.MD";
    IdKind["ProfessionalDoctorOfOsteopathy"] = "org.hl7.terminology.codesystem.v2-0203.DO";
    IdKind["ProfessionalPhysicianAssistant"] = "org.hl7.terminology.codesystem.v2-0203.PA";
    // a NP must obtain a DEA number in order to prescribe or dispense controlled substances
    IdKind["ProfessionalCertifiedNursePractitioner"] = "org.hl7.terminology.codesystem.v2-0203.NP";
    IdKind["ProfessionalRegisteredNurse"] = "org.hl7.terminology.codesystem.v2-0203.RN";
    IdKind["ProfessionalEmergencyMedicalTechnicianParamedic"] = "org.hl7.terminology.codesystem.v2-0203.EMTP";
    IdKind["ProfessionalEmergencyMedicalTechnician"] = "org.hl7.terminology.codesystem.v2-0203.EMT";
    IdKind["ProfessionalRegisteredMedicalAssistant"] = "org.hl7.terminology.codesystem.v2-0203.RMA";
    // Unlicensed Assistive Personnel: unlicensed person, regardless of title, who performs tasks delegated by a nurse.
    IdKind["ProfessionalCertifiedMedicalAssistant"] = "org.hl7.terminology.codesystem.v2-0203.CMA";
    IdKind["ProfessionalMedicalAssistant"] = "org.hl7.terminology.codesystem.v2-0203.MDA";
    IdKind["ProfessionalMedicalTechnician"] = "org.hl7.terminology.codesystem.v2-0203.MT";
    // Laboratory
    IdKind["ProfessionalLaboratoryAccessionNumber"] = "org.hl7.terminology.codesystem.v2-0203.LACSN";
    // HL7 based: Healthcare service (department) resource type
    IdKind["ResourceDeptHealthcare"] = "org.hl7.terminology.codesystem.service-type";
    // From UHC: system's non-healthcare department type
    IdKind["ResourceDept"] = "system";
    // ILO: occupation / role identifier type
    IdKind["OccupationRole"] = "org.ilo.isco.isco08";
    // ISCED (from UNESCO): classification of qualification type (it is not a professional identifier)
    IdKind["TrainingClassification"] = "org.unesco.uis.isced";
    // SNOMED
    IdKind["MedicalCodeSNOMED"] = "info.snomed.sct";
    // LOINC
    IdKind["MedicalCodeLOINC"] = "org.loinc";
})(IdKind = exports.IdKind || (exports.IdKind = {}));
var EducationKind;
(function (EducationKind) {
})(EducationKind = exports.EducationKind || (exports.EducationKind = {}));
/** Electronic Record types in OpenID + vc, shc, dgc, fhir */
var ElectronicRecordUHC;
(function (ElectronicRecordUHC) {
    // UHC electronic record types
    ElectronicRecordUHC["vc"] = "vc";
    ElectronicRecordUHC["shc"] = "shc";
    ElectronicRecordUHC["dgc"] = "dgc";
    ElectronicRecordUHC["fhir"] = "fhir";
    // OpenID electronic record types
    ElectronicRecordUHC["bankAccount"] = "bank_account";
    ElectronicRecordUHC["utilityAccount"] = "utility_account";
    ElectronicRecordUHC["mortgageAccount"] = "mortgage_account";
    ElectronicRecordUHC["loanAccount"] = "loan_account";
    ElectronicRecordUHC["tax"] = "tax";
    ElectronicRecordUHC["socialSecurity"] = "social_security";
    ElectronicRecordUHC["birthRegister"] = "birth_register";
    ElectronicRecordUHC["adoptionRegister"] = "adoption_register";
    ElectronicRecordUHC["marriageRegister"] = "marriage_register";
    ElectronicRecordUHC["education"] = "education";
    ElectronicRecordUHC["military"] = "military";
    ElectronicRecordUHC["voterRegister"] = "voter_register";
    ElectronicRecordUHC["populationRegister"] = "population_register";
    ElectronicRecordUHC["prisonRecord"] = "prison_record";
})(ElectronicRecordUHC = exports.ElectronicRecordUHC || (exports.ElectronicRecordUHC = {}));
/** Documents (physical, non electronic records) to certify the evidence in OpenID + custom UHC document types */
var PhysicalDocumentUHC;
(function (PhysicalDocumentUHC) {
    // OpenID document (physical) types
    PhysicalDocumentUHC["bankStatement"] = "bank_statement";
    PhysicalDocumentUHC["utilityStatement"] = "utility_statement";
    PhysicalDocumentUHC["mortgageStatement"] = "mortgage_statement";
    PhysicalDocumentUHC["loanStatement"] = "loan_statement";
    PhysicalDocumentUHC["taxStatement"] = "tax_statement";
    PhysicalDocumentUHC["socialSecurityStatement"] = "social_security_statement";
    PhysicalDocumentUHC["birthCertificate"] = "birth_certificate";
    PhysicalDocumentUHC["adoptionCertificate"] = "adoption_certificate";
    PhysicalDocumentUHC["marriageCertificate"] = "marriage_certificate";
    PhysicalDocumentUHC["educationCertificate"] = "education_certificate";
    PhysicalDocumentUHC["militaryId"] = "military_id";
    PhysicalDocumentUHC["voterId"] = "voter_id";
    PhysicalDocumentUHC["genderCertificate"] = "gender_certificate";
    PhysicalDocumentUHC["firearmPermit"] = "firearm_permit";
    PhysicalDocumentUHC["pilotPermit"] = "pilot_permit";
    PhysicalDocumentUHC["visa"] = "visa";
    PhysicalDocumentUHC["idCard"] = "idcard";
    PhysicalDocumentUHC["passport"] = "passport";
    PhysicalDocumentUHC["drivingPermit"] = "driving_permit";
    PhysicalDocumentUHC["residencePermit"] = "residence_permit";
    // UHC custom document (physical) types
    PhysicalDocumentUHC["healthInsuranceCard"] = "health_insurance_card";
    PhysicalDocumentUHC["idCardForeigners"] = "idcard_foreigners";
    PhysicalDocumentUHC["idCardEmergency"] = "emergency_idcard";
    PhysicalDocumentUHC["idCardRefugees"] = "idcard_refugees";
    PhysicalDocumentUHC["idCardApatrids"] = "idcard_apatrids";
    PhysicalDocumentUHC["idCardReplacement"] = "replacement_idcard";
    PhysicalDocumentUHC["certificateSuspensionDeportation"] = "certificate_of_suspension_of_deportation";
    // These should be 'electronic_record' instead of 'document'?
    PhysicalDocumentUHC["electronicResidencePermit"] = "erp";
    PhysicalDocumentUHC["electronicResidencePermitReplacement"] = "erp_replacement";
})(PhysicalDocumentUHC = exports.PhysicalDocumentUHC || (exports.PhysicalDocumentUHC = {}));
/* UHC uses HL7 codification with reverse-dns (same as ISO), instead the OpeinID type.
export enum PhysicalDocumentOpenid {
    // openid
    IDcard = "idcard", // 	https://openid.net/document/idcard 	An identity document issued by a country's government for the purpose of identifying a citizen.
    Passport= "passport", // 	https://openid.net/document/passport 	A passport is a travel document, usually issued by a country's government, that certifies the identity and nationality of its holder primarily for the purpose of international travel. (see OxfordPassport).
    DrivingLicense = "driving_permit", // 	https://openid.net/document/driving_permit 	Official document permitting an individual to operate motorized vehicles. In the absence of a formal identity document, a driver's license may be accepted in many countries for identity verification.
    ResidencePermit= "residence_permit", // 	https://openid.net/document/residence_permit 	Official document permitting an individual to reside within a particular jurisdiction.
    TaxStatement= "tax_statement", // 	https://openid.net/document/tax_statement 	Statement from a country's tax authority.
    SocialSecurityStatement= "social_security_statement", // 	https://openid.net/document/social_security_statement 	Statement from a country's social security authority.
    BanSstatement= "bank_statement", // 	https://openid.net/document/bank_statement 	Bank statement from a recognized banking institution.
    UtilityStatement= "utility_statement", // 	https://openid.net/document/utility_statement 	Statement from a recognized utility provider.
    EducationCertificate= "education_certificate", // 	https://openid.net/document/education_certificate 	Document certifying that a person has received specific education or has passed a test or series of tests.
    Visa= "visa", // 	https://openid.net/document/visa 	Document that grants the holder official permission to enter, leave or stay in a country.
    MilitaryID = "military_id", // 	https://openid.net/document/military_id 	An official military identity document issued by a country's government to its service personnel.
    
    // from UHC
    ProfessionalLicence = "professional_license"
}
*/ 
