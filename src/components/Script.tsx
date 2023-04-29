import React, { FC, useEffect } from "react";

export interface ScriptProps {
  appId: string;
  cookie?: boolean;
  language?: `${Lowercase<string>}_${Uppercase<string>}`;
}

const Script: FC<ScriptProps> = ({ appId, cookie, language }) => {
  useEffect(() => {
    if (window && appId) {
      // Define the FB async init function
      window.fbAsyncInit = () => {
        window.FB.init({
          appId,
          cookie,
          autoLogAppEvents: true,
          xfbml: true,
          version: "v16.0",
        });
      };
      // Load the Facebook SDK asynchronously
      (() => {
        let js: HTMLScriptElement;
        const fjs = document.getElementsByTagName("script")[0];
        if (!document.getElementById("facebook-jssdk")) {
          js = document.createElement("script");
          js.id = "facebook-jssdk";
          js.async = true;
          js.defer = true;
          js.crossOrigin = "anonymous";
          js.src = `https://connect.facebook.net/${language || "en_US"}/sdk.js`;
          js.nonce = "aieR2yIx";
          fjs.parentNode?.insertBefore(js, fjs);
        }
      })();
    } else {
      console.error("props 'appId' is required to initiate Facebook SDK!");
    }
  }, [appId, cookie]);

  return <div id="fb-root" />;
};

export default Script;
