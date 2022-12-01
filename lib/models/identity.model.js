"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationKind = exports.IdentifierKind = void 0;
/** Types of identifiers: http://terminology.hl7.org/CodeSystem/v2-0203
 *  UHC uses the HL7 "identifierType" coding system but with reverse-dns (same as ISO)
 *  instead of using the OpenID physical document types.
 */
var IdentifierKind;
(function (IdentifierKind) {
    // from ISO
    IdentifierKind["MobileDriverLicense"] = "org.iso.18013.5.1.mDL";
    // from http://terminology.hl7.org/CodeSystem/v2-0203
    IdentifierKind["PersonalDriverLicense"] = "org.hl7.terminology.codesystem.v2-0203.DL";
    IdentifierKind["PersonalCitizenshipCard"] = "org.hl7.terminology.codesystem.v2-0203.CZ";
    IdentifierKind["PersonalNationalNumber"] = "org.hl7.terminology.codesystem.v2-0203.NN";
    IdentifierKind["RegionalHeathCardNumber"] = "org.hl7.terminology.codesystem.v2-0203.JHN";
    IdentifierKind["LocalHealthCard"] = "org.hl7.terminology.codesystem.v2-0203.HC";
    IdentifierKind["LocalDonorRecord"] = "org.hl7.terminology.codesystem.v2-0203.DR";
    IdentifierKind["LocalPatientIdentifier"] = "org.hl7.terminology.codesystem.v2-0203.PI";
    // Professional identifiers
    IdentifierKind["ProfessionalDentistLicenseNumber"] = "org.hl7.terminology.codesystem.v2-0203.DDS";
    IdentifierKind["ProfessionalDoctorOfMedicine"] = "org.hl7.terminology.codesystem.v2-0203.MD";
    IdentifierKind["ProfessionalDoctorOfOsteopathy"] = "org.hl7.terminology.codesystem.v2-0203.DO";
    IdentifierKind["ProfessionalPhysicianAssistant"] = "org.hl7.terminology.codesystem.v2-0203.PA";
    // a NP must obtain a DEA number in order to prescribe or dispense controlled substances
    IdentifierKind["ProfessionalCertifiedNursePractitioner"] = "org.hl7.terminology.codesystem.v2-0203.NP";
    IdentifierKind["ProfessionalRegisteredNurse"] = "org.hl7.terminology.codesystem.v2-0203.RN";
    IdentifierKind["ProfessionalEmergencyMedicalTechnicianParamedic"] = "org.hl7.terminology.codesystem.v2-0203.EMTP";
    IdentifierKind["ProfessionalEmergencyMedicalTechnician"] = "org.hl7.terminology.codesystem.v2-0203.EMT";
    IdentifierKind["ProfessionalRegisteredMedicalAssistant"] = "org.hl7.terminology.codesystem.v2-0203.RMA";
    // Unlicensed Assistive Personnel: unlicensed person, regardless of title, who performs tasks delegated by a nurse.
    IdentifierKind["ProfessionalCertifiedMedicalAssistant"] = "org.hl7.terminology.codesystem.v2-0203.CMA";
    IdentifierKind["ProfessionalMedicalAssistant"] = "org.hl7.terminology.codesystem.v2-0203.MDA";
    IdentifierKind["ProfessionalMedicalTechnician"] = "org.hl7.terminology.codesystem.v2-0203.MT";
    // Laboratory
    IdentifierKind["ProfessionalLaboratoryAccessionNumber"] = "org.hl7.terminology.codesystem.v2-0203.LACSN";
    // Resources
    // Healthcare service (department) from HL7
    IdentifierKind["ResourceDeptHealthcare"] = "org.hl7.terminology.codesystem.service-type";
    // from UHC
    IdentifierKind["ResourceDept"] = "system";
    // from ILO
    IdentifierKind["OccupationRole"] = "org.ilo.isco.isco08";
})(IdentifierKind = exports.IdentifierKind || (exports.IdentifierKind = {}));
var EducationKind;
(function (EducationKind) {
})(EducationKind = exports.EducationKind || (exports.EducationKind = {}));
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
