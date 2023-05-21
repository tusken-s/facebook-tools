import React, { FC, useEffect, useRef } from "react";

export interface ChatProps {
  pageId: string;
  color?: string;
  minimized?: boolean;
}

const Chat: FC<ChatProps> = ({ pageId, minimized, color }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && container.current) {
      container.current.setAttribute("page_id", pageId);
      container.current.setAttribute("attribution", "biz_inbox");
      if (color) container.current.setAttribute("theme_color", color);
      if (minimized)
        container.current.setAttribute("minimized", minimized.toString());
    }
  }, [container, pageId, color, minimized]);

  return (
    <>
      <div
        ref={container}
        id="fb-customer-chat"
        className="fb-customerchat"
      ></div>
    </>
  );
};

export default Chat;
