import { Avatar, Box } from "@mui/material";
import useWebSocket from "../../../../request/WebSocket";
import { useEffect, useState } from "react";
import {
  ConversationItem,
  getConversationsAPI,
  getMessageAPI,
  MessageType,
} from "../../../../request/chat";
import dayjs from "dayjs";
import "./Chat.scss";
import { getUserInfoAPI, UserInfo } from "../../../../request/user";

export function Chat() {
  const baseURL = "8.137.11.172:7121";

  const authorization =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdXRoIjoiQVQwMDAzIiwidXNlcm5hbWUiOiIwMDRkYjQ3YS02ZGE3LTRlNWUtODhhMS0wN2YzNDZjODk0NjMiLCJqdGkiOiJ0b2tlbklkIiwiaWF0IjoxNzE0MTg1Mjc0LCJleHAiOjMzMjUwMTg1Mjc0fQ.WM6mQkRBoCgMNAmpO57-IItVzGy6MDp6gXzBXmhNj88";

  const [webSocket, sendMessage, lastMessage, isConnected] = useWebSocket({
    url: `ws://${baseURL}/webSocket/chat/${authorization}`, //这里放长链接
    onOpen: () => {
      //连接成功
      console.log("WebSocket connected");
    },
    onClose: () => {
      //连接关闭
      console.log("WebSocket disconnected");
    },
    onError: (event) => {
      //连接异常
      console.error("WebSocket error:", event);
    },
    onMessage: (message) => {
      //收到消息
      console.log("WebSocket received message:", message);
    },
  });

  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [talkWith, setTalkWith] = useState<ConversationItem | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [content, setContent] = useState<string>();

  const changeTalk = (item: ConversationItem) => {
    setTalkWith(item);
    getMessageAPI({
      from: 0,
      size: 10,
      conversationId: item.conversationId,
    }).then((res) => {
      setMessages(res.data);
    });
  };

  /**
   * 发送消息
   */
  function sendBtn() {
    setMessages([
      ...messages,
      {
        senderId: userInfo?.userId as string,
        content: content as string,
      },
    ]);
    // setConversations() = conversations.map((item) => {
    //   if (item.conversationId === conversationIdRef.value) {
    //     item.lastMessage = contentRef.value;
    //     item.lastTime = Date.now();
    //   }
    //   return item;
    // });
    //通过websocket发送消息
    sendMessage(
      `{"authorization": "${authorization}","conversationId": "${talkWith?.conversationId}","content": "${content}","messageType":"1","recipientId": "${talkWith?.talkWithId}"}`
    );
    setContent("");
  }

  useEffect(() => {
    getConversationsAPI({ from: 0, size: 10 }).then((res) => {
      setConversations(res.data);
    });
    getUserInfoAPI().then((res) => {
      setUserInfo(res.data);
    });
  }, []);

  return (
    <Box>
      <div className="chatApp">
        <div className="myInfo">
          <div className="name">11</div>
        </div>
        <div className="talkWindow">
          <div className="left">
            {conversations.map((item, index) => (
              <div
                className="conversation"
                key={index}
                onClick={() => {
                  changeTalk(item);
                }}
              >
                <Avatar
                  alt="admin"
                  src={item.talkWithAvatarUrl}
                  sx={{ width: 56, height: 56 }}
                />
                <div className="msgBox">
                  <div className="up">
                    {item.talkWithName}
                    {item.unreadCount !== 0 && (
                      <span className="notRead">{item.unreadCount}</span>
                    )}
                    <text className="mid">
                      {dayjs(item.lastTime).format("hh:mm")}
                    </text>
                  </div>

                  <div className="down">{item.lastMessage}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="right">
            {!!talkWith ? (
              <div className="talkBox">
                <div className="talkingWith">{talkWith?.talkWithName}</div>
                <div className="messages">
                  {messages.map((item, index) => (
                    <div
                      key={index}
                      className={`message ${
                        userInfo?.userId === item.senderId
                          ? "my-message"
                          : "other-message"
                      }`}
                    >
                      {userInfo?.userId !== item.senderId && (
                        <img
                          src={
                            userInfo?.userId === item.senderId
                              ? userInfo?.avatarUrl
                              : talkWith?.talkWithAvatarUrl
                          }
                          alt="avatar"
                          className="minAvatar"
                        />
                      )}
                      <p className="message-text">{item.content}</p>
                      {userInfo?.userId === item.senderId && (
                        <img
                          src={
                            userInfo?.userId === item.senderId
                              ? userInfo?.avatarUrl
                              : talkWith?.talkWithAvatarUrl
                          }
                          alt="avatar"
                          className="minAvatar"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="send-box">
                  <textarea
                    className="message-input"
                    placeholder="在这里输入消息..."
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  ></textarea>
                  <button className="send-button" onClick={sendBtn}>
                    发送
                  </button>
                </div>
              </div>
            ) : (
              <div>选择对话</div>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
}
