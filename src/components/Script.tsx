import React, { FC, useEffect, useRef } from "react";
import { getNavigatorLanguage, ISOLangCountry } from "../locales";
import { Features } from "../index";

export interface ScriptProps {
  appId?: string;
  pageId?: string;
  cookie?: boolean;
  nonce?: string;
  language?: ISOLangCountry;
  features: Array<Features>;
}

const Script: FC<ScriptProps> = ({
  appId,
  pageId,
  cookie,
  nonce,
  language,
  features,
}) => {
  const loginScript = useRef<HTMLScriptElement>(null);
  const chatScript = useRef<HTMLScriptElement>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (features.includes(Features.LOGIN_BUTTON) ||
        features.includes(Features.CHAT_PLUGIN))
    ) {
      const fjs = document.getElementsByTagName("script")[0];
      if (appId && loginScript.current) {
        loginScript.current.async = true;
        loginScript.current.defer = true;
        loginScript.current.crossOrigin = "anonymous";
        loginScript.current.nonce = nonce;
        loginScript.current.src = `https://connect.facebook.net/${
          language || getNavigatorLanguage()
        }/sdk.js`;
        fjs?.parentNode?.insertBefore(loginScript.current, fjs);
      }
      if (pageId && chatScript.current) {
        chatScript.current.async = true;
        chatScript.current.defer = true;
        chatScript.current.crossOrigin = "anonymous";
        chatScript.current.nonce = nonce;
        chatScript.current.src = `https://connect.facebook.net/${
          language || getNavigatorLanguage()
        }/sdk/xfbml.customerchat.js`;
        fjs?.parentNode?.insertBefore(chatScript.current, fjs);
      }
    } else {
      console.error("props 'appId' is required to initiate Facebook SDK!");
    }
  }, [appId, pageId, cookie, language, features, nonce]);

  useEffect(() => {
    if (
      (typeof window !== "undefined" && loginScript.current) ||
      chatScript.current
    )
      // Define the FB async init function
      window.fbAsyncInit = () => {
        // Handle login status and login/logout events
        window.FB.init({
          appId: appId,
          cookie: cookie,
          autoLogAppEvents: true,
          xfbml: true,
          version: "v16.0",
        });
      };
  }, [loginScript, chatScript, appId, cookie]);

  return (
    <>
      {appId && <script ref={loginScript} />}
      {pageId && <script ref={chatScript} />}
      <div id="fb-root" />
    </>
  );
};

export default Script;
