/** Types of identifiers: http://terminology.hl7.org/CodeSystem/v2-0203
 *  UHC uses the HL7 "identifierType" coding system but with reverse-dns (same as ISO)
 *  instead of using the OpenID physical document types.
 */
export declare enum IdentifierKind {
    MobileDriverLicense = "org.iso.18013.5.1.mDL",
    PersonalDriverLicense = "org.hl7.terminology.codesystem.v2-0203.DL",
    PersonalCitizenshipCard = "org.hl7.terminology.codesystem.v2-0203.CZ",
    PersonalNationalNumber = "org.hl7.terminology.codesystem.v2-0203.NN",
    RegionalHeathCardNumber = "org.hl7.terminology.codesystem.v2-0203.JHN",
    LocalHealthCard = "org.hl7.terminology.codesystem.v2-0203.HC",
    LocalDonorRecord = "org.hl7.terminology.codesystem.v2-0203.DR",
    LocalPatientIdentifier = "org.hl7.terminology.codesystem.v2-0203.PI",
    ProfessionalDentistLicenseNumber = "org.hl7.terminology.codesystem.v2-0203.DDS",
    ProfessionalDoctorOfMedicine = "org.hl7.terminology.codesystem.v2-0203.MD",
    ProfessionalDoctorOfOsteopathy = "org.hl7.terminology.codesystem.v2-0203.DO",
    ProfessionalPhysicianAssistant = "org.hl7.terminology.codesystem.v2-0203.PA",
    ProfessionalCertifiedNursePractitioner = "org.hl7.terminology.codesystem.v2-0203.NP",
    ProfessionalRegisteredNurse = "org.hl7.terminology.codesystem.v2-0203.RN",
    ProfessionalEmergencyMedicalTechnicianParamedic = "org.hl7.terminology.codesystem.v2-0203.EMTP",
    ProfessionalEmergencyMedicalTechnician = "org.hl7.terminology.codesystem.v2-0203.EMT",
    ProfessionalRegisteredMedicalAssistant = "org.hl7.terminology.codesystem.v2-0203.RMA",
    ProfessionalCertifiedMedicalAssistant = "org.hl7.terminology.codesystem.v2-0203.CMA",
    ProfessionalMedicalAssistant = "org.hl7.terminology.codesystem.v2-0203.MDA",
    ProfessionalMedicalTechnician = "org.hl7.terminology.codesystem.v2-0203.MT",
    ProfessionalLaboratoryAccessionNumber = "org.hl7.terminology.codesystem.v2-0203.LACSN",
    ResourceDeptHealthcare = "org.hl7.terminology.codesystem.service-type",
    ResourceDept = "system",
    OccupationRole = "org.ilo.isco.isco08"
}
export declare enum EducationKind {
}
