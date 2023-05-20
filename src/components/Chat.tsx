import React, { FC, useEffect } from "react";
import { getNavigatorLanguage, ISOLangCountry } from "../locales";

export interface ChatProps {
  appId?: string;
  pageId: string;
  cookie?: boolean;
  language?: ISOLangCountry;
}

const Chat: FC<ChatProps> = ({ appId, pageId, cookie, language }) => {
  useEffect(() => {
    if (typeof window !== "undefined" && pageId) {
      const chatbox = document.getElementById("fb-customer-chat");
      if (chatbox) {
        chatbox.setAttribute("page_id", pageId);
        chatbox.setAttribute("attribution", "biz_inbox");
      }
      // Define the FB async init function
      window.fbAsyncInit = () => {
        window.FB.init({
          appId,
          autoLogAppEvents: true,
          xfbml: true,
          version: "v16.0",
        });
      };
      // Load the Facebook SDK asynchronously
      let js: HTMLScriptElement;
      const fjs = document.getElementsByTagName("script")[0];
      if (!document.getElementById("facebook-jssdk")) {
        js = document.createElement("script");
        js.id = "facebook-jssdk";
        js.async = true;
        js.defer = true;
        js.crossOrigin = "anonymous";
        js.src = `https://connect.facebook.net/${
          language || getNavigatorLanguage()
        }/sdk/xfbml.customerchat.js`;
        js.nonce = "aieR2yIx";
        fjs?.parentNode?.insertBefore(js, fjs);
      }
    } else {
      console.error("props 'appId' is required to initiate Facebook SDK!");
    }
  }, [appId, pageId, cookie, language]);

  return (
    <>
      <div id="fb-root" />
      <div id="fb-customer-chat" className="fb-customerchat"></div>
    </>
  );
};

export default Chat;
