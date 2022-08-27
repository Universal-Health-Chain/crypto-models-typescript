import { ProtectedDataAESCCM } from "./aes.model";

/** If the "installCode" value is not provided the app will work in "demo" mode */
export interface NewProfileData {
  clientAppId:    string;
  nickname:       string;
  userDid:        string;
  installCode?:   string;
  deviceId?:      string;
}

/** ProfileProtected has unprotected clientAppId and nickname but other data is protected */
export interface ProfileProtected {
  clientAppId:    string;
  nickname:       string;
  created:        number;
  lastAccess?:    number;
  data?:          ProtectedDataAESCCM;
  secret:         ProtectedDataAESCCM;
}
