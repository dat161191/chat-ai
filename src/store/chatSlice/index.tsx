/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface Chat {
  id: string;
  title: string;
  message: any[];
  roomDetail: boolean;
}

interface ChatState {
  data: Chat[];
  /**
   * data:[
    {
        id: 1,
        title: 'qweqweqw,
        messages: [
            {id: 1, text: 'react là gì', isBot: false},
            {id: 2, text: 'react là lib của js', isBot: true},
        ],
        roomDetail: false        
    }]
   */
}

const initData: ChatState = { data: [] };

const ChatSlice = createSlice({
  name: "chat",
  initialState: initData,
  reducers: {
    addChat: (state, action) => {
      const { roomDetail, userMess, botMess, idRoom } = action.payload;
      if (roomDetail) {
        state.data.push({
          id: uuidv4(),
          title: "Chat",
          message: [],
          roomDetail: true,
        });
      } else {
        const messageFormat: any = marked.parse(botMess);
        const botMessFormat: any = DOMPurify.sanitize(messageFormat);
        const time = new Date();
        const newMess = [
          { id: uuidv4(), text: userMess, isBot: false, time },
          { id: uuidv4(), text: botMessFormat, isBot: true, time },
        ];
        state.data.push({
          id: idRoom,
          title: "Chat",
          message: newMess,
          roomDetail: false,
        });
      }
    },
    addMessage: (state, action) => {
      const { idChat, userMess, botMess } = action.payload;
      const chat = state.data.find((chat: any) => chat.id === idChat);
      if (chat) {
        const messageFormat: any = marked.parse(botMess);
        const botMessFormat: any = DOMPurify.sanitize(messageFormat);
        const time = new Date();
        const newMess = [
          ...chat.message,
          { id: uuidv4(), text: userMess, isBot: false, time },
          { id: uuidv4(), text: botMessFormat, isBot: true, time },
        ];
        chat.message = newMess;
        state.data = [...state.data];
      }
    },
    removeChat: (state, action: PayloadAction<any>) => {
      state.data = state.data.filter((ele: any) => ele.id !== action.payload);
    },
    setTitleRoomChat: (state, action) => {
      const { newTitle, idChat } = action.payload;
      const chat = state.data.find((chat: any) => chat.id === idChat);
      if (chat) {
        chat.title = newTitle;
      }
    },
  },
});

export const { addChat, removeChat, addMessage, setTitleRoomChat } =
  ChatSlice.actions;

export default ChatSlice.reducer;
