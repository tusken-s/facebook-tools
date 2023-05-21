import React, { FC, useEffect, useRef } from "react";

export interface ChatProps {
  pageId: string;
}

const Chat: FC<ChatProps> = ({ pageId }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && container.current) {
      container.current.setAttribute("page_id", pageId);
      container.current.setAttribute("attribution", "biz_inbox");
    }
  }, [container.current]);

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
