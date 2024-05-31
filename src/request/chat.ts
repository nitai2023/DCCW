import service from ".";

export const getConversationsAPI = (data: reqInfo) => {
  return service<ConversationItem[]>({
    method: "GET",
    url: "/message/getConversations",
    params: data,
  });
};

export const getMessageAPI = (data: reqInfo) => {
  return service<MessageType[]>({
    method: "GET",
    url: "/message/getMessages",
    params: data,
  });
};

export interface reqInfo {
  from: number;
  size: number;
  conversationId?: number;
}

export interface MessageType {
  messageId?: string;
  senderId: string;
  content: string;
  sendTime?: number;
  messageType?: number;
  readStatus?: number;
}


export interface ConversationItem {
  conversationId: number;
  talkWithId: string;
  talkWithName: string;
  talkWithAvatarUrl: string;
  lastMessage: string;
  messageType: number;
  lastTime: number;
  unreadCount: number;
}
