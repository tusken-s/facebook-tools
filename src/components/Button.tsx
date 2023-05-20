import React, { CSSProperties, FC, ReactNode, useEffect } from "react";
import { labels, StatusResponse } from "../index";

export interface ButtonProps {
  disabled?: boolean;
  width?: string | number;
  scope?: string;
  buttonType?: "continue_with" | "login_with";
  callback: (x: StatusResponse["authResponse"]) => void;
  style?: CSSProperties;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  scope,
  buttonType,
  callback,
  disabled,
  width,
  style,
  children,
}) => {
  useEffect(() => {
    if (typeof window !== "undefined" && window?.FB) {
      window.FB.Event.subscribe("auth.statusChange", () => {
        window.FB.getLoginStatus((res) => {
          if (res.authResponse && res.status === "connected")
            callback(res.authResponse);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (typeof window !== "undefined" && window?.FB) {
      window.FB.login(
        (res) => {
          if (res.status === "connected") callback(res.authResponse);
          else console.warn("User cancelled login or did not fully authorize.");
        },
        { scope }
      );
    }
  };

  return (
    <div
      className="fb-login-button"
      style={{
        width: "100%",
        display: "flex",
        placeContent: "center",
        placeItems: "center",
        ...style,
      }}
    >
      {children ? (
        <div
          style={{
            width: width || "inherit",
          }}
          onClick={handleClick}
        >
          {children}
        </div>
      ) : (
        <button
          className="fb-button-main-element"
          aria-label={buttonType === "continue_with"
            ? labels.contenue
            : labels.login}
          style={{
            fontSize: 16,
            fontWeight: "normal",
            height: 32,
            width: width || "fit-content",
            border: 0,
            borderRadius: 4,
            backgroundColor: "rgb(26, 119, 242)",
            color: "rgb(255, 255, 255)",
            display: "flex",
            justifyContent: "flex-start",
            placeItems: "center",
            opacity: typeof window === "undefined" || disabled ? 0.5 : 1,
            cursor:
              typeof window === "undefined" || disabled
                ? "not-allowed"
                : "pointer",
          }}
          disabled={typeof window === "undefined" || disabled}
          onClick={handleClick}
        >
          <span
            className="fb_button_label_element fb_button_label"
            style={{
              width: "100%",
              margin: "0 8px",
              display: "flex",
              placeContent: "center",
              placeItems: "center",
            }}
          >
            <svg
              style={{
                height: 20,
                marginRight: 10,
              }}
              viewBox="0 0 213 213"
              preserveAspectRatio="xMinYMin"
              className="fb_button_svg_logo login_fb_logo single_button_svg_logo"
            >
              <path
                d="M90,212v-75h-27v-31h27v-25q0,-40 40,-40q15,0 24,2v26h-14q-16,0 -16,16v21h30l-5,31h-27v75a106 106,0,1,0,-32 0"
                className="f_logo_circle"
                fill="white"
              />
              <path
                d="M90,212v-75h-27v-31h27v-25q0,-40 40,-40q15,0 24,2v26h-14q-16,0 -16,16v21h30l-5,31h-27v75a106 106,1,0,1,-32 0"
                className="f_logo_f"
                fill="rgb(26, 119, 242)"
              />
            </svg>
            <span>
              {buttonType === "continue_with"
                ? labels.contenue
                : labels.login}
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

export default Button;
