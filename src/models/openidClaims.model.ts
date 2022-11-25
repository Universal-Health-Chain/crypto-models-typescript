/* Copyright 2022 ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */

export const DegreeLicenseCertificateHL7 = 'AA'||'AAS'||'ABA'||'AE'||'AS'||'BA'||'BBA'||'BE'||'BFA'||'BN'||'BS'||'BSL'||'BSN'||'BT'||'CANP'||'CER'||'CMA'||'CNM'||'CNP'||'CNS'||'CPNP'||'CRN'||'CTR'||'DBA'||'DED'||'DIP'||'DO'||'EMT'||'EMTP'||'FPNP'||'HS'||'JD'||'MA'||'MBA'||'MCE'||'MD'||'MDA'||'MDI'||'ME'||'MED'||'MEE'||'MFA'||'MME'||'MS'||'MSL'||'MSN'||'MT'||'MTH'||'NG'||'NP'||'PA'||'PHD'||'PHE'||'PHS'||'PN'||'PharmD'||'RMA'||'RN'||'RPH'||'SEC'||'TS';

export interface ClaimsFullOpenID extends
    ClaimsStandardOpenID,
    ClaimsAdditionalOpenID,
    ClaimsEndUserOpenID,
    ClaimProfessionalOpenID,
    ClaimEmergencyOpenID
{}

/** Use ISO 3166/ICAO 3-letter codes for 'country' [ICAO-Doc9303] instead of 2-letter ICAO codes.
 * because of both OpenID 'country_code', 'nationalities' and FHIR country code for National Identity Documents ('NNxxx') use it.
 */
export interface ClaimPlaceOfBirthOpenID{
    // country:    typeof CountryAlpha3ISO; // UHC uses [ISO3166-3] syntax for FHIR NNxxx compatibility, but OpenID also admits country in [ISO3166-1] Alpha-2 (e.g., DE)
    region?:    string;                 // ISO: state, province, prefecture, or region component. This field might be required in some jurisdictions.
    locality?:  string;                 // representing city or locality component.
}

/** Both OpenID 'country_code', 'nationalities' and FHIR country code for National Identity Documents ('NNxxx')
 * use ISO 3166/ICAO 3-letter codes [ICAO-Doc9303] instead of 2-letter ICAO codes.
 * OpenID specification defines some Claims for conveying End-User data in addition to the Claims defined in the OpenID Connect specification,
 * in order to fulfill the requirements of some jurisdictions on identity assurance.
 * https://openid.net/specs/openid-connect-4-identity-assurance-1_0-12.html#section-4
 */
export interface ClaimsEndUserOpenID {
    place_of_birth?:    ClaimPlaceOfBirthOpenID;    // End-User's place of birth.
    // nationalities?:  	typeof CountryAlpha3ISO[];  // End-User's nationalities using ICAO 3-letter codes [ICAO-Doc9303], e.g., "USA" or "JPN". 2-letter ICAO codes MAY be used in some circumstances for compatibility reasons.
    birth_family_name?: string;                     // End-User's family name(s) when they were born, or at least from the time they were a child. This term can be used by a person who changes the family name later in life for any reason. Note that in some cultures, people can have multiple family names or no family name; all can be present, with the names being separated by space characters.
    birth_given_name?:  string;                     // End-User's given name(s) when they were born, or at least from the time they were a child. This term can be used by a person who changes the given name later in life for any reason. Note that in some cultures, people can have multiple given names; all can be present, with the names being separated by space characters.
    birth_middle_name?: string;                     // End-User's middle name(s) when they were born, or at least from the time they were a child. This term can be used by a person who changes the middle name later in life for any reason. Note that in some cultures, people can have multiple middle names; all can be present, with the names being separated by space characters. Also note that in some cultures, middle names are not used.
    salutation?:        string;                     // End-User's salutation, e.g., "Mr."
    title?: 	        string; 	                // End-User's title, e.g., "Dr."
    msisdn?: 	        string; 	                // End-User's mobile phone number formatted according to ITU-T recommendation [E.164], e.g., "+1999550123"
    also_known_as?: 	string; 	                // Stage name, religious name or any other type of alias/pseudonym with which a person is known in a specific context besides its legal name. This must be part of the applicable legislation and thus the trust framework (e.g., be an attribute on the identity card).
}

/** Address OpenID can be translated from / to FHIR Address,
 * but FHIR Address can have also ISO21090 ADXP extensions:
 * https://www.hl7.org/fhir/iso-21090.html
 */
export interface ClaimAddressOpenID {
    formatted?:         string; // Full mailing address, formatted for display or use on a mailing label. This field MAY contain multiple lines, separated by newlines. Newlines can be represented either as a carriage return/line feed pair ("\r\n") or as a single line feed character ("\n").
    street_address?:    string; // Full street address component, which MAY include house number, street name, Post Office Box, and multi-line extended street address information. This field MAY contain multiple lines, separated by newlines. Newlines can be represented either as a carriage return/line feed pair ("\r\n") or as a single line feed character ("\n").
    locality?:          string; // City or locality component.
    region?:            string; // State, province, prefecture, or region component.
    postal_code?:       string; // Zip code or postal code component.
    country?:           string; // Country name component.
}

/** An authorization server MAY use the 'email' claim to reference an individual.
 * BCP47 language tag values are case insensitive.
 * Usually language names are spelled with lowercase characters, region names are spelled with uppercase characters.
 * Per the recommendations in BCP47, language tag values for Claims SHOULD only be as specific as necessary.
 * For instance, using fr might be sufficient in many contexts, rather than fr-CA or fr-FR.
 */
export interface ClaimsStandardOpenID {
    sub?:                   string; // Subject - Identifier for the End-User at the Issuer.
    name?:                  string; // End-User's full name in displayable form including all name parts, possibly including titles and suffixes, ordered according to the End-User's locale and preferences.
    given_name?:            string; // Given name(s) or first name(s) of the End-User. Note that in some cultures, people can have multiple given names; all can be present, with the names being separated by space characters.
    family_name?:           string; // Surname(s) or last name(s) of the End-User. Note that in some cultures, people can have multiple family names or no family name; all can be present, with the names being separated by space characters.
    middle_name?:           string; // Middle name(s) of the End-User. Note that in some cultures, people can have multiple middle names; all can be present, with the names being separated by space characters. Also note that in some cultures, middle names are not used.
    nickname?:              string; // Casual name of the End-User that may or may not be the same as the given_name. For instance, a nickname value of Mike might be returned alongside a given_name value of Michael.
    preferred_username?:    string; // Shorthand name by which the End-User wishes to be referred to at the RP, such as janedoe or j.doe. This value MAY be any valid JSON string including special characters such as @, /, or whitespace. The RP MUST NOT rely upon this value being unique, as discussed in Section 5.7.
    profile?:               string; // URL of the End-User's profile page. The contents of this Web page SHOULD be about the End-User.
    picture?:               string; // URL of the End-User's profile picture. This URL MUST refer to an image file (for example, a PNG, JPEG, or GIF image file), rather than to a Web page containing an image. Note that this URL SHOULD specifically reference a profile photo of the End-User suitable for displaying when describing the End-User, rather than an arbitrary photo taken by the End-User.
    website?:               string; // URL of the End-User's Web page or blog. This Web page SHOULD contain information published by the End-User or an organization that the End-User is affiliated with.
    email?:                 string; // End-User's preferred e-mail address. Its value MUST conform to the RFC 5322 [RFC5322] addr-spec syntax. The RP MUST NOT rely upon this value being unique, as discussed in Section 5.7.
    email_verified?:        boolean;// True if the End-User's e-mail address has been verified; otherwise false. When this Claim Value is true, this means that the OP took affirmative steps to ensure that this e-mail address was controlled by the End-User at the time the verification was performed. The means by which an e-mail address is verified is context-specific, and dependent upon the trust framework or contractual agreements within which the parties are operating.
    gender?:                string; // End-User's gender. Values defined by this specification are female and male. Other values MAY be used when neither of the defined values are applicable.
    birthdate?:             string; // End-User's birthday, represented as an ISO 8601:2004 [ISO8601‑2004] YYYY-MM-DD format. The year MAY be 0000, indicating that it is omitted. To represent only the year, YYYY format is allowed. Note that depending on the underlying platform's date related function, providing just year can result in varying month and day, so the implementers need to take this factor into account to correctly process the dates.
    zoneinfo?:              string;     // String from zoneinfo [zoneinfo] time zone database representing the End-User's time zone. For example, Europe/Paris or America/Los_Angeles.
    locale?:                string;     // End-User's locale, represented as a BCP47 [RFC5646] language tag. This is typically an ISO 639-1 Alpha-2 [ISO639‑1] language code in lowercase and an ISO 3166-1 Alpha-2 [ISO3166‑1] country code in uppercase, separated by a dash. For example, en-US or fr-CA. As a compatibility note, some implementations have used an underscore as the separator rather than a dash, for example, en_US; Relying Parties MAY choose to accept this locale syntax as well.
    phone_number?:          string;     // End-User's preferred telephone number. E.164 [E.164] is RECOMMENDED as the format of this Claim, for example, +1 (425) 555-1212 or +56 (2) 687 2400. If the phone number contains an extension, it is RECOMMENDED that the extension be represented using the RFC 3966 [RFC3966] extension syntax, for example, +1 (604) 555-1234;ext=5678.
    phone_number_verified?: boolean;    // True if the End-User's phone number has been verified; otherwise false. When this Claim Value is true, this means that the OP took affirmative steps to ensure that this phone number was controlled by the End-User at the time the verification was performed. The means by which a phone number is verified is context-specific, and dependent upon the trust framework or contractual agreements within which the parties are operating. When true, the phone_number Claim MUST be in E.164 format and any extensions MUST be represented in RFC 3966 format.
    address?:               ClaimAddressOpenID; // End-User's preferred postal address. The value of the address member is a JSON [RFC4627] structure containing some or all of the members defined in Section 5.1.1.
    updated_at?:            number; 	        // Time the End-User's information was last updated. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
}

export interface ClaimsAdditionalOpenID {
    claims_locales?: string;   // OPTIONAL. End-User's preferred languages. Space-separated list of BCP47 language tag values.
}

/** http://www.hl7.org/fhir/v2/0360/2.7/index.html
 * Code System URL:	http://terminology.hl7.org/CodeSystem/v2-0360|2.7
 */
export interface ClaimProfessionalOpenID {
    src?:   string; // URI representing the authority conveying the professional credential on the user, such as a state or regulatory group.
    val?:   typeof DegreeLicenseCertificateHL7; // value representing the nature of the processional credential held.
}

/** Include the 'pro' claim to reference licenses, accreditations, or other professional credentials held by the current user.
 * These are generally for things such as specific medical licenses or degrees.
 * An example list of professional values can be found at http://www.hl7.org/fhir/v2/0360/2.7/index.html
 */
export interface ClaimProfessionalOpenID {
    pro?:   ClaimProfessionalOpenID[]; // Array of machine-readable values representing the professional credential held by the current user.
}

/** Emergency access: Those with a need for emergency access can be flagged with the 'er' claim.
 * "Break the glass" emergency access policies:
 * Authorization servers SHOULD provide a mechanism to specify a policy to accept certain flags
 * including but not limited to the 'er' claim provided by trusted identity providers,
 * to gain access to the resource set without direct involvement by the resource owner.
 * This type of policy MUST include access to the btg scope specified in the HEART OAuth FHIR profile.
 */
export interface ClaimEmergencyOpenID {
    er?: boolean;   // if present and true it indicates the current user has emergency responder status and SHOULD be given access to records for emergency use without requiring the input of the resource owner by the way of a "break the glass" emergency access policy (see Section 4.1)
}