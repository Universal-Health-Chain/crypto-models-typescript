export declare const DegreeLicenseCertificateHL7 = "AA";
export interface ClaimsFullOpenID extends ClaimsStandardOpenID, ClaimsAdditionalOpenID, ClaimsEndUserOpenID, ClaimProfessionalOpenID, ClaimEmergencyOpenID {
}
/** Use ISO 3166/ICAO 3-letter codes for 'country' [ICAO-Doc9303] instead of 2-letter ICAO codes.
 * because of both OpenID 'country_code', 'nationalities' and FHIR country code for National Identity Documents ('NNxxx') use it.
 */
export interface ClaimPlaceOfBirthOpenID {
    region?: string;
    locality?: string;
}
/** Both OpenID 'country_code', 'nationalities' and FHIR country code for National Identity Documents ('NNxxx')
 * use ISO 3166/ICAO 3-letter codes [ICAO-Doc9303] instead of 2-letter ICAO codes.
 * OpenID specification defines some Claims for conveying End-User data in addition to the Claims defined in the OpenID Connect specification,
 * in order to fulfill the requirements of some jurisdictions on identity assurance.
 * https://openid.net/specs/openid-connect-4-identity-assurance-1_0-12.html#section-4
 */
export interface ClaimsEndUserOpenID {
    place_of_birth?: ClaimPlaceOfBirthOpenID;
    birth_family_name?: string;
    birth_given_name?: string;
    birth_middle_name?: string;
    salutation?: string;
    title?: string;
    msisdn?: string;
    also_known_as?: string;
}
/** Address OpenID can be translated from / to FHIR Address,
 * but FHIR Address can have also ISO21090 ADXP extensions:
 * https://www.hl7.org/fhir/iso-21090.html
 */
export interface ClaimAddressOpenID {
    formatted?: string;
    street_address?: string;
    locality?: string;
    region?: string;
    postal_code?: string;
    country?: string;
}
/** An authorization server MAY use the 'email' claim to reference an individual.
 * BCP47 language tag values are case insensitive.
 * Usually language names are spelled with lowercase characters, region names are spelled with uppercase characters.
 * Per the recommendations in BCP47, language tag values for Claims SHOULD only be as specific as necessary.
 * For instance, using fr might be sufficient in many contexts, rather than fr-CA or fr-FR.
 */
export interface ClaimsStandardOpenID {
    sub?: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    middle_name?: string;
    nickname?: string;
    preferred_username?: string;
    profile?: string;
    picture?: string;
    website?: string;
    email?: string;
    email_verified?: boolean;
    gender?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?: string;
    phone_number?: string;
    phone_number_verified?: boolean;
    address?: ClaimAddressOpenID;
    updated_at?: number;
}
export interface ClaimsAdditionalOpenID {
    claims_locales?: string;
}
/** http://www.hl7.org/fhir/v2/0360/2.7/index.html
 * Code System URL:	http://terminology.hl7.org/CodeSystem/v2-0360|2.7
 */
export interface ClaimProfessionalOpenID {
    src?: string;
    val?: typeof DegreeLicenseCertificateHL7;
}
/** Include the 'pro' claim to reference licenses, accreditations, or other professional credentials held by the current user.
 * These are generally for things such as specific medical licenses or degrees.
 * An example list of professional values can be found at http://www.hl7.org/fhir/v2/0360/2.7/index.html
 */
export interface ClaimProfessionalOpenID {
    pro?: ClaimProfessionalOpenID[];
}
/** Emergency access: Those with a need for emergency access can be flagged with the 'er' claim.
 * "Break the glass" emergency access policies:
 * Authorization servers SHOULD provide a mechanism to specify a policy to accept certain flags
 * including but not limited to the 'er' claim provided by trusted identity providers,
 * to gain access to the resource set without direct involvement by the resource owner.
 * This type of policy MUST include access to the btg scope specified in the HEART OAuth FHIR profile.
 */
export interface ClaimEmergencyOpenID {
    er?: boolean;
}
