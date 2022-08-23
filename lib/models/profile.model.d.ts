import { ProtectedDataAESCCM } from "./aes.model";
export interface NewProfileData {
    userDid: string;
    nickname: string;
    activationData: {
        clientAppId: string;
        deviceId?: string;
    };
}
/** ProfileProtected has no personal data (only nickname).
 *  Once the database is opened the personal data will be available (wallet).
 */
export interface ProfileProtected {
    userDid: string;
    nickname: string;
    lastAccess?: number;
    activationData: {
        clientAppId: string;
        deviceId?: ProtectedDataAESCCM;
        protectedInstallCode?: ProtectedDataAESCCM;
    };
    protectedDbPassword: ProtectedDataAESCCM;
}
