/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

/** Types of identifiers: http://terminology.hl7.org/CodeSystem/v2-0203
 *  UHC uses the HL7 "identifierType" coding system but with reverse-dns (same as ISO)
 *  instead of using the OpenID physical document types.
 */
export enum IdentifierKind {
	// from ISO
	MobileDriverLicense = "org.iso.18013.5.1.mDL", // https://www.iso.org/standard/69084.html

	// from http://terminology.hl7.org/CodeSystem/v2-0203
	PersonalDriverLicense   = "org.hl7.terminology.codesystem.v2-0203.DL",
	PersonalCitizenshipCard = "org.hl7.terminology.codesystem.v2-0203.CZ",
	PersonalNationalNumber  = "org.hl7.terminology.codesystem.v2-0203.NN",
	RegionalHeathCardNumber = "org.hl7.terminology.codesystem.v2-0203.JHN",
	LocalHealthCard         = "org.hl7.terminology.codesystem.v2-0203.HC", // e.g.: for the beneficiary of a private insurance plan (FHIR Coverage)
	LocalDonorRecord        = "org.hl7.terminology.codesystem.v2-0203.DR",
	LocalPatientIdentifier  = "org.hl7.terminology.codesystem.v2-0203.PI",

    // Professional identifiers
	ProfessionalDentistLicenseNumber = "org.hl7.terminology.codesystem.v2-0203.DDS",
    ProfessionalDoctorOfMedicine = "org.hl7.terminology.codesystem.v2-0203.MD", // licensed Doctor of Medicine (medical degree) in some medical specialty.
    ProfessionalDoctorOfOsteopathy = "org.hl7.terminology.codesystem.v2-0203.DO", //  licensed doctor (medical degree) focused on treating the whole person, with special training in the connection between the body's nerves, muscles, and bones. Can prescribe drugs and perform surgical operations.
    ProfessionalPhysicianAssistant = "org.hl7.terminology.codesystem.v2-0203.PA", // licensed health care professional assisting doctors (physicians) with patient care and treatment. Some jurisdictions permit PAs to prescribe controlled drugs
	// a NP must obtain a DEA number in order to prescribe or dispense controlled substances
    ProfessionalCertifiedNursePractitioner = "org.hl7.terminology.codesystem.v2-0203.NP", // licensed health care professional who can prescribe some drugs and supervises patient care.
    ProfessionalRegisteredNurse = "org.hl7.terminology.codesystem.v2-0203.RN", // licensed health care professional who is responsible of admnister prescribed drugs, and supervises patient care.
    ProfessionalEmergencyMedicalTechnicianParamedic = "org.hl7.terminology.codesystem.v2-0203.EMTP", // licensed health care professional who specializes in emergency treatment: can prescribe and administer some drugs, can perform some surgeries.
    ProfessionalEmergencyMedicalTechnician = "org.hl7.terminology.codesystem.v2-0203.EMT", // licensed to administer basic life-saving emergency medical care.
    ProfessionalRegisteredMedicalAssistant = "org.hl7.terminology.codesystem.v2-0203.RMA", // commonly referred as Licensed Practical Nurse, provide assistance to doctors or registered nurses: person who is certified to administer medication under the supervision of a physician (like a nurse practitioner or a medical doctor).
    // Unlicensed Assistive Personnel: unlicensed person, regardless of title, who performs tasks delegated by a nurse.
    ProfessionalCertifiedMedicalAssistant = "org.hl7.terminology.codesystem.v2-0203.CMA", // certified to assist with the delivery of direct nursing care to patients. Works under the supervision of a nurse.
    ProfessionalMedicalAssistant = "org.hl7.terminology.codesystem.v2-0203.MDA", // performs administrative tasks but not direct patient care: responsible for following up with patients, printing lab referrals, scheduling, and record filingpatient evaluation.
    ProfessionalMedicalTechnician = "org.hl7.terminology.codesystem.v2-0203.MT", // commonly referred as Nursing Assistant, Patient Care Assistant or Health Care Assistant: direct patient care, assist with bathing, grooming, dressing, toileting, and other personal hygiene activities and do not perform administrative duties in their scope of duties
    // Laboratory
    ProfessionalLaboratoryAccessionNumber = "org.hl7.terminology.codesystem.v2-0203.LACSN",
	
    // Resources
    // Healthcare service (department) from HL7
	ResourceDeptHealthcare = "org.hl7.terminology.codesystem.service-type", // https://www.hl7.org/fhir/codesystem-service-type.html
	// from UHC
	ResourceDept = "system", // internal coding system (HR, ICT, EXEC)

    // from ILO
    OccupationRole = "org.ilo.isco.isco08", // https://www.ilo.org/public/english/bureau/stat/isco/isco08/

    TrainingClassification  = "org.unesco.uis.isced"
}

export enum EducationKind {

}


/** Electronic Record types in OpenID + vc, shc, dgc, fhir */
export enum ElectronicRecordUHC {
    // UHC electronic record types
    vc = 'vc',      // Verifiable Credential record.
    shc = 'shc',    // Smart Health Card record.
    dgc = 'dgc',    // EU Digital Green Certificate record.
    fhir = 'fhir',  // FHIR record.

    // OpenID electronic record types
    bankAccount = 'bank_account',               // https: //openid.net/record/bank_account 	        A record of a bank account from a recognized banking institution.
    utilityAccount = 'utility_account',         // https: //openid.net/record/utility_account 	    A record of an account from a recognized utility provider.
    mortgageAccount = 'mortgage_account',       // https: //openid.net/record/mortgage_account 	    A record of a mortgage from a recognized mortgage provider.
    loanAccount = 'loan_account',               // https: //openid.net/record/loan_account 	        A record of a loan from a recognized loan provider.
    tax = 'tax',                                // https: //openid.net/record/tax 	                A record from a country's tax authority.
    socialSecurity = 'social_security',         // https: //openid.net/record/social_security 	    A record from a country's social security authority.
    birthRegister = 'birth_register',           // https://openid.net/record/birth_register 	    A record from an official register of births.
    adoptionRegister = 'adoption_register',     // https: //openid.net/record/adoption_register 	A record from an official register of adoptions.
    marriageRegister  = 'marriage_register',    // https: //openid.net/record/marriage_register 	A record from an official register of marriages.
    education = 'education',                    // https: //openid.net/record/education 	        A authoritative record of a person having received specific education or has passed a test or series of tests.
    military = 'military',                      // https: //openid.net/record/military 	            A military personnel record.
    voterRegister = 'voter_register',           // https: //openid.net/record/voter_register        A record from an official register of voters.

    populationRegister = 'population_register', // https://openid.net/record/population_register 	A record from an official population register.
    prisonRecord = 'prison_record',             // https: //openid.net/record/prison_record 	    A record from an institution or authority for the confinement of persons who have been deprived of their liberty following a criminal conviction by a judicial process.
}

/** Documents (physical, non electronic records) to certify the evidence in OpenID + custom UHC document types */
export enum PhysicalDocumentUHC {
    // OpenID document (physical) types
    bankStatement = 'bank_statement',                       // https://openid.net/document/bank_statement 	        Bank statement from a recognized banking institution.
    utilityStatement = 'utility_statement',                 // https://openid.net/document/utility_statement 	    Statement from a recognized utility provider.
    mortgageStatement = 'mortgage_statement',               // https://openid.net/document/mortgage_statement 	    Statement from a recognized mortgage provider.
    loanStatement = 'loan_statement',                       // https://openid.net/document/loan_statement 	        Statement from a recognized loan provider.
    taxStatement = 'tax_statement',                         // https://openid.net/document/tax_statement 	        Statement from a country's tax authority.
    socialSecurityStatement = 'social_security_statement',  // https://openid.net/document/social_security_statement Statement from a country's social security authority.
    birthCertificate = 'birth_certificate',                 // https://openid.net/document/birth_certificate        Official document certifying the circumstances of a birth.
    adoptionCertificate = 'adoption_certificate',           // https://openid.net/document/adoption_certificate 	Official document certifying the circumstances of an adoption.
    marriageCertificate = 'marriage_certificate',           // https://openid.net/document/marriage_certificate 	Official document certifying the circumstances of a marriage.
    educationCertificate = 'education_certificate',         // https://openid.net/document/education_certificate 	Document certifying that a person has received specific education or has passed a test or series of tests.
    militaryId = 'military_id',                             // https://openid.net/document/military_id 	            An official military identity document issued by a country's government to its service personnel.
    voterId = 'voter_id',                                   // https://openid.net/document/voter_id 	            An official voter identity document.

    genderCertificate = 'gender_certificate',               // https://openid.net/document/gender_certificate       Official document certifying that a person has satisfied the criteria for legal recognition in the acquired gender.
    firearmPermit = 'firearm_permit',                       // https://openid.net/document/firearm_permit           Official document permitting an individual to use or own a firearm.
    pilotPermit = 'pilot_permit',                           // https://openid.net/document/pilot_permit             Official document permitting an individual to operate an aircraft.
    visa = 'visa',                                          // https://openid.net/document/visa                     Document that grants the holder official permission to enter, leave or stay in a country.

    idCard = 'idcard',                                      // https://openid.net/document/idcard 	An identity document issued by a country's government for the purpose of identifying a citizen.
    passport = 'passport',                                  // https://openid.net/document/passport             A passport is a travel document, usually issued by a country's government, that certifies the identity and nationality of its holder primarily for the purpose of international travel. (see OxfordPassport).
    drivingPermit = 'driving_permit',   	                // https://openid.net/document/driving_permit       Official document permitting an individual to operate motorized vehicles. In the absence of a formal identity document, a driver's license may be accepted in many countries for identity verification.
    residencePermit = 'residence_permit',                   // https://openid.net/document/residence_permit     Official document permitting an individual to reside within a particular jurisdiction.

    // UHC custom document (physical) types
    healthInsuranceCard  = 'health_insurance_card',         // from JP
    idCardForeigners = 'idcard_foreigners',                 // from DE
    idCardEmergency = 'emergency_idcard',                   // from DE: ID Card issued by a government to foreign nationals as passports replacement.
    idCardRefugees = 'idcard_refugees',                     // from DE: ID Card issued by a government to refugees as passports replacement.
    idCardApatrids = 'idcard_apatrids',                     // from DE: ID Card issued by a government to refugees as passports replacement.
    idCardReplacement = 'replacement_idcard',               // from DE: ID Card replacement document issued by a government to foreign nationals
    certificateSuspensionDeportation = 'certificate_of_suspension_of_deportation', 	// from DE: identity document issued to refugees in case of suspension of deportation that are marked as "id card replacement".

    // These should be 'electronic_record' instead of 'document'?
    electronicResidencePermit = 'erp',                          // from DE
    electronicResidencePermitReplacement = 'erp_replacement',   // from DE
}

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