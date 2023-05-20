import Button, { ButtonProps } from "./components/Button";
import Script, { ScriptProps } from "./components/Script";
import locales from "./locales";

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

let language = "en";
// Use navigator language
if (typeof navigator !== "undefined" && navigator.language)
  language = navigator.language;
// Use ISO language code
if (language.includes("-")) language = language.replace("-", "_");
// Mapping of language codes to ISO language codes with default country codes
const languageMapping: { [ll: string]: string } = {
  en: "en_US",
  fr: "fr_FR",
  ar: "ar_AR",
  es: "es_ES",
  de: "de_DE",
  pt: "pt_PT",
  zh: "zh_CN",
  he: "he_IL",
};
const ll_CC = language?.includes("_") ? languageMapping[language] : language;
const labels = locales[ll_CC];

export { Button, Script, labels, ll_CC };
