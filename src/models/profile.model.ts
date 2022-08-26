import { ProtectedDataAESCCM } from "./aes.model";

/** If the "installCode" value is not provided the app will work in "demo" mode */
export interface NewProfileData {
    userDid: string;
    nickname: string;
    activationData: {
      clientAppId: string;
      deviceId?: string;
      installCode?: string; // demo mode if not provided
    };
  }

/** ProfileProtected has no personal data (only nickname).
 *  Once the database is opened the personal data will be available (wallet).
 */
export interface ProfileProtected {
    userDid: string;
    nickname: string;
    lastAccess?: number; // unix time (seconds)
    activationData: {
      clientAppId: string;
      protectedDeviceId?: ProtectedDataAESCCM;
      protectedInstallCode?: ProtectedDataAESCCM;
    };
    protectedDbPassword: ProtectedDataAESCCM;
  }