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

export { Button, Script };

export type { ButtonProps, ScriptProps };
export type StatusResponse = {
  status: "connected" | "not_authorized" | "unknown";
  authResponse?: {
    accessToken: string;
    expiresIn: number;
    signedRequest: string;
    userID: string;
  };
};
export type ApiMethod = "get" | "post" | "delete";
export type FacebookApiParams = {
  [key: string]: string | number | boolean;
};
export type LoginOptions = {
  auth_type?: string;
  scope?: string;
  return_scopes?: boolean;
  enable_profile_selector?: boolean;
  profile_selector_ids?: string;
  reauthenticate?: boolean;
  rerequest?: boolean;
  return_nonce?: boolean;
};
export type InitParams = {
  appId: string;
  autoLogAppEvents?: boolean;
  cookie?: boolean;
  xfbml?: boolean;
  version: string;
};
