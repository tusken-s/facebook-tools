import Button, { ButtonProps } from "./components/Button";
import Script, { ScriptProps } from "./components/Script";

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: {
      getLoginStatus: (callback: (response: StatusResponse) => void) => void;
      Event: {
        subscribe: (
          event: "auth.statusChange",
          callback: (response: StatusResponse) => void
        ) => void;
      };
      login: (
        callback: (response: StatusResponse) => void,
        options?: LoginOptions
      ) => void;
      api: (
        path: string,
        method: ApiMethod,
        params?: FacebookApiParams,
        callback?: (response: any) => void
      ) => void;
      init: (params: InitParams) => void;
    };
  }
}
type StatusResponse = {
  status: "connected" | "not_authorized" | "unknown";
  authResponse?: {
    accessToken: string;
    expiresIn: number;
    signedRequest: string;
    userID: string;
  };
};
type ApiMethod = "get" | "post" | "delete";
type FacebookApiParams = {
  [key: string]: string | number | boolean;
};
type LoginOptions = {
  auth_type?: string;
  scope?: string;
  return_scopes?: boolean;
  enable_profile_selector?: boolean;
  profile_selector_ids?: string;
  reauthenticate?: boolean;
  rerequest?: boolean;
  return_nonce?: boolean;
};
type InitParams = {
  appId: string;
  autoLogAppEvents?: boolean;
  cookie?: boolean;
  xfbml?: boolean;
  version: string;
};

export type {
  ButtonProps,
  ScriptProps,
  StatusResponse,
  ApiMethod,
  FacebookApiParams,
  LoginOptions,
  InitParams,
};

const language = navigator.language || navigator.languages.at(0) || "en";
// Mapping of language codes to ISO language codes with default country codes
const languageMapping: {[ll_CC: string]: string} = {
  "en": "en_US",
  "fr": "fr_FR",
  "ar": "ar_AR",
  "pt": "pt_PT",
  "zh": "zh_CN",
  "es": "es_ES",
  "he": "he_IL",
};
const ll_CC = language?.includes('_') ? languageMapping[language] : language;
const labels = require(`./locales/${ll_CC}.json`);

export { Button, Script, labels, ll_CC };
