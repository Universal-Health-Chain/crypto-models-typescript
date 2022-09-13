import { ProtectedDataAES } from "./aes.model";
/** In CouchDB the DB name is lower case and starts with a letter */
export declare const multibase32hexPrefix = "v";
export interface SelectObject {
    label: string;
    value: string;
}
export declare type ProfilesList = ProfileProtected[];
export declare type SelectProfileList = SelectObject[];
export declare type SelectOptions = SelectObject[];
/** If the "installCode" value is not provided the app will work in "demo" mode */
export interface NewProfileData {
    clientAppId: string;
    nickname: string;
    userDid: string;
    installCode?: string;
    deviceId?: string;
}
/** ProfileProtected has unprotected clientAppId and nickname but other data is protected */
export interface ProfileProtected {
    clientAppId: string;
    nickname: string;
    created: number;
    lastAccess?: number;
    data?: ProtectedDataAES;
    secret: ProtectedDataAES;
}
