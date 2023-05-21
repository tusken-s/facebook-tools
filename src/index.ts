import Button, { ButtonProps } from "./components/Button";
import Chat, { ChatProps } from "./components/Chat";
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
type InitChatParams = {
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
      init: (params: InitButtonParams | InitChatParams) => void;

      CustomerChat: {
        /**
         * Initializes the Facebook Chat Plugin with the specified parameters.
         * @param pageId - The ID of the Facebook Page to associate with the Chat Plugin.
         * @param loggedInGreeting - The greeting message to display when the user is logged in.
         * @param loggedOutGreeting - The greeting message to display when the user is logged out.
         */
        init(
          pageId: string,
          loggedInGreeting?: string,
          loggedOutGreeting?: string
        ): void;

        /**
         * Shows or hides the Facebook Chat Plugin dialog.
         * @param show - Determines whether to show or hide the Chat Plugin dialog. Set to `true` to show and `false` to hide.
         */
        show(show: boolean): void;
      };
    };
  }
}

export type { ButtonProps, ChatProps, ScriptProps, StatusResponse };

export { Features, Button, Chat, Script };
