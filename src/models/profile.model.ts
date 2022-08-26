import { ProtectedDataAESCCM } from "./aes.model";

/** If the "installCode" value is not provided the app will work in "demo" mode */
export interface NewProfileData {
    clientAppId: string;
    deviceId?: string;
    installCode?: string; // demo mode if not provided
    nickname: string;
    userDid: string;
  }

/** ProfileProtected has no personal data (only nickname).
 *   - "userDID": employeeRole or personal public DID.
 *  - "protectedInstallCode": if it does not exist the app will work in "demo" mode.
 *  Once the database is opened the personal data will be available (wallet).
 */
export interface ProfileProtected {
  clientAppId: string;
  lastAccess?: number; // unix time (seconds)
  nickname: string;
  protectedDeviceId?: ProtectedDataAESCCM;
  protectedInstallCode?: ProtectedDataAESCCM;
  protectedDbPassword: ProtectedDataAESCCM;
  userDid: string;
}