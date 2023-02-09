/** Types of identifiers: http://terminology.hl7.org/CodeSystem/v2-0203
 *  UHC uses the HL7 "identifierType" coding system but with reverse-dns (same as ISO)
 *  instead of using the OpenID physical document types.
 */
export declare enum IdKind {
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
    OccupationRole = "org.ilo.isco.isco08",
    TrainingClassification = "org.unesco.uis.isced",
    MedicalCodeSNOMED = "info.snomed.sct",
    MedicalCodeLOINC = "org.loinc"
}
export declare enum EducationKind {
}
/** Electronic Record types in OpenID + vc, shc, dgc, fhir */
export declare enum ElectronicRecordUHC {
    vc = "vc",
    shc = "shc",
    dgc = "dgc",
    fhir = "fhir",
    bankAccount = "bank_account",
    utilityAccount = "utility_account",
    mortgageAccount = "mortgage_account",
    loanAccount = "loan_account",
    tax = "tax",
    socialSecurity = "social_security",
    birthRegister = "birth_register",
    adoptionRegister = "adoption_register",
    marriageRegister = "marriage_register",
    education = "education",
    military = "military",
    voterRegister = "voter_register",
    populationRegister = "population_register",
    prisonRecord = "prison_record"
}
/** Documents (physical, non electronic records) to certify the evidence in OpenID + custom UHC document types */
export declare enum PhysicalDocumentUHC {
    bankStatement = "bank_statement",
    utilityStatement = "utility_statement",
    mortgageStatement = "mortgage_statement",
    loanStatement = "loan_statement",
    taxStatement = "tax_statement",
    socialSecurityStatement = "social_security_statement",
    birthCertificate = "birth_certificate",
    adoptionCertificate = "adoption_certificate",
    marriageCertificate = "marriage_certificate",
    educationCertificate = "education_certificate",
    militaryId = "military_id",
    voterId = "voter_id",
    genderCertificate = "gender_certificate",
    firearmPermit = "firearm_permit",
    pilotPermit = "pilot_permit",
    visa = "visa",
    idCard = "idcard",
    passport = "passport",
    drivingPermit = "driving_permit",
    residencePermit = "residence_permit",
    healthInsuranceCard = "health_insurance_card",
    idCardForeigners = "idcard_foreigners",
    idCardEmergency = "emergency_idcard",
    idCardRefugees = "idcard_refugees",
    idCardApatrids = "idcard_apatrids",
    idCardReplacement = "replacement_idcard",
    certificateSuspensionDeportation = "certificate_of_suspension_of_deportation",
    electronicResidencePermit = "erp",
    electronicResidencePermitReplacement = "erp_replacement"
}
