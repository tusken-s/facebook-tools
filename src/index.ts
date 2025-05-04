import Button, { ButtonProps } from "./components/Button";
import Script, { ScriptProps } from "./components/Script";

enum Features {
  LOGIN_BUTTON = "loginButton",
  CHAT_PLUGIN = "chatPlugin",
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
type InitButtonParams = {
  appId: string;
  autoLogAppEvents?: boolean;
  cookie?: boolean;
  xfbml?: boolean;
  version: string;
};

declare global {
  interface Window {
    /**
     * Function called by the Facebook SDK when it is ready to be initialized.
     */
    fbAsyncInit: () => void;
    FB: {
      /**
       * Checks the login status of the user.
       * @param callback - The callback function to handle the response.
       */
      getLoginStatus: (callback: (response: StatusResponse) => void) => void;

      Event: {
        /**
         * Subscribes to an event, such as "auth.statusChange".
         * @param event - The event to subscribe to.
         * @param callback - The callback function to handle the response.
         */
        subscribe: (
          event: "auth.statusChange",
          callback: (response: StatusResponse) => void
        ) => void;
      };

      /**
       * Logs the user into your application.
       * @param callback - The callback function to handle the response.
       * @param options - Optional parameters for the login request.
       */
      login: (
        callback: (response: StatusResponse) => void,
        options?: LoginOptions
      ) => void;

      /**
       * Makes API requests to the Facebook Graph API.
       * @param path - The Graph API endpoint path.
       * @param method - The HTTP method for the request.
       * @param params - Optional parameters for the API request.
       * @param callback - Optional callback function to handle the response.
       */
      api: (
        path: string,
        method: ApiMethod,
        params?: FacebookApiParams,
        callback?: (response: any) => void
      ) => void;

      /**
       * Initializes Facebook components such as buttons or chat plugins.
       * @param params - Parameters for the initialization.
       */
      init: (params: InitButtonParams) => void;
    };
  }
}

export type { ButtonProps, ScriptProps, StatusResponse };

export { Features, Button, Script };
