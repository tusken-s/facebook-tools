import React, { FC, useEffect } from "react";

export interface ScriptProps {
  appId: string;
  cookie: boolean;
}

const Script: FC<ScriptProps> = ({ appId, cookie }) => {
  useEffect(() => {
    if (window?.FB && appId) {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId,
          cookie,
          autoLogAppEvents: true,
          xfbml: true,
          version: "v16.0",
        });
      };
      ((d, s, id) => {
        let js: HTMLScriptElement;
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        // @ts-ignore
        js = d.createElement(s);
        js.id = id;
        js.async = true;
        js.defer = true;
        js.crossOrigin = "anonymous";
        js.src = "https://connect.facebook.net/fr_FR/sdk.js";
        js.nonce = "aieR2yIx";
        // @ts-ignore
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    } else {
      console.error("props 'appId' is required to initiate Facebook SDK!");
    }
  }, [appId, cookie]);

  return <div id="fb-root" />;
};

export default Script;
