/* eslint-disable @typescript-eslint/no-explicit-any */
import Gold from "../assets/gold.jpg";
import Movie from "../assets/movie.jpeg";
import Baby from "../assets/babygirl.png";
import { useEffect, useState } from "react";
import IconMenu from "../assets/menu.png";
import SideBar from "../components/SideBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Gemini from "../gemini";
import { useDispatch, useSelector } from "react-redux";
import { addChat, addMessage, setTitleRoomChat } from "../store/chatSlice";
import { AppDispatch } from "../store/app";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

const ChatDetail = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [dataDetail, setDataDetail] = useState<any>("");
  const [messageDetail, setMessageDetail] = useState<string[]>([]);
  const [inputChat, setInputChat] = useState<string>("");
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: any) => state.chat);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.length > 0) {
      const chat = data.find(
        (ele: { id: string | undefined }) => ele.id === id
      );
      setDataDetail(chat);
      setMessageDetail(chat?.message);
    }
  }, [data, id]);
  useEffect(() => {
    if (dataDetail && dataDetail.title) {
      const setTitleRoom = async () => {
        if (dataDetail?.title === "Chat" && dataDetail?.message[0]?.text) {
          const promptName = `This is a new chat, and user ask about ${dataDetail.message[0].text}. No rely and comment just give me a name for this chat, Max length is 10 characters`;
          const newTitle = await Gemini(promptName, null);
          dispatch(setTitleRoomChat({ newTitle, idChat: id }));
        }
      };
      setTitleRoom();
    }
  }, [dataDetail, dispatch, id, inputChat]);

  const handleChatDetail = async () => {
    setIsLoading(true);
    if (id) {
      const chatText = await Gemini(inputChat, messageDetail);
      if (dataDetail?.title === "Chat") {
        const promptName = `This is a new chat, and user ask about ${inputChat}. No rely and comment just give me a name for this chat, Max length is 10 characters`;
        const newTitle = await Gemini(promptName, null);
        dispatch(setTitleRoomChat({ newTitle, idChat: id }));
      }
      if (chatText) {
        const message = { idChat: id, userMess: inputChat, botMess: chatText };
        dispatch(addMessage(message));
      }
    } else {
      const chatText = await Gemini(inputChat, null);
      const idRoom = uuidv4();
      dispatch(
        addChat({
          roomDetail: false,
          userMess: inputChat,
          botMess: chatText,
          idRoom,
        })
      );
      navigate(`/chat/${idRoom}`);
    }
    setInputChat("");
    setIsLoading(false);
  };

  const handleClickImg = async (text: string) => {
    setIsLoading(true);
    const chatText = await Gemini(text, null);
    const idRoom = uuidv4();
    dispatch(
      addChat({
        roomDetail: false,
        userMess: text,
        botMess: chatText,
        idRoom,
      })
    );
    setIsLoading(false);
    navigate(`/chat/${idRoom}`);
  };

  return (
    <div className="text-white xl:w-[85%] w-full relative ">
      <div className="flex items-center space-x-2 p-4">
        <button onClick={() => setMenuToggle(!menuToggle)}>
          <img src={IconMenu} alt="menu" className="w-10 h10 xl:hidden" />
        </button>
        <p className="text-white uppercase font-bold ">
          ꧁༺Shmily༻꧂ use source from google gemini 😎😎😎
        </p>
      </div>

      {menuToggle && (
        <div className="absolute h-full top-0 left-0 xl:hidden">
          <SideBar onToggle={() => setMenuToggle(!menuToggle)} />
        </div>
      )}
      <div className="max-w-[95%] w-full mx-auto mt-20 space-y-10">
        {id ? (
          <div className="flex flex-col space-y-4 p-4 h-[70vh] overflow-x-hidden overflow-y-auto bg-black/50 ">
            {Array.isArray(messageDetail) &&
              messageDetail.map((item: any) => (
                <div className="flex space-y-6 flex-col" key={item.id}>
                  <div className="flex space-x-4 items-baseline">
                    {item.isBot ? (
                      <div className="border-b border-white pb-3 w-full flex space-x-4">
                        {/* <img src={IconStar} alt="star" className="w-8 h-8" /> */}
                        <p>
                          {item?.time && format(item.time, "dd/MM/yyyy HH:mm")}
                        </p>
                        <p dangerouslySetInnerHTML={{ __html: item.text }} />
                      </div>
                    ) : (
                      <div className="w-full flex space-x-4">
                        <p className="font-bold">User</p>
                        <p className="italic">{item.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col space-y-5">
            <div className="space-y-1">
              <h2 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-500 inline-block text-transparent bg-clip-text text-[40px] font-bold">
                Hello!
              </h2>
              <p className="text-[20px]">How can I help you today?</p>
            </div>

            <div className="flex items-center flex-row space-x-2 ">
              <Link
                to={"https://giavang.pnj.com.vn/"}
                target="_blank"
                className="w-[300px] h-[300px] bg-primaryBg-sideBar flex items-center justify-center rounded-md flex-col cursor-pointer"
                onClick={() =>
                  handleClickImg(
                    "what is this link 'https://giavang.pnj.com.vn/'?"
                  )
                }
              >
                <p className="py-1 text-center">Gold price today?</p>
                <img
                  src={Gold}
                  alt="Img temp"
                  className="w-[90%] h-[90%] pb-1"
                />
              </Link>

              <Link
                to={"https://bosstranmovie.vercel.app/"}
                target="_blank"
                className="w-[300px] h-[300px] bg-primaryBg-sideBar flex items-center justify-center rounded-md flex-col cursor-pointer"
                onClick={() =>
                  handleClickImg(
                    "what is this link 'https://bosstranmovie.vercel.app/'??"
                  )
                }
              >
                <p className="py-1 text-center">
                  To watch the movie trailer, click here 😋?
                </p>
                <img
                  src={Movie}
                  alt="Img temp"
                  className="w-[90%] h-[90%] pb-1"
                />
              </Link>

              <Link
                to="https://www.youtube.com/watch?v=lwvOJ7l-8Mo"
                target="_blank"
                className="w-[300px] h-[300px] bg-primaryBg-sideBar flex items-center justify-center rounded-md flex-col cursor-pointer"
                onClick={() =>
                  handleClickImg("Top 10 best songs of Alan walker?")
                }
              >
                <p className="py-1 text-center">
                  Top 10 best songs of Alan walker?
                </p>
                <img
                  src={Baby}
                  alt="Img temp"
                  className="w-[90%] h-[90%] pb-1"
                />
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-5 w-full">
          <input
            type="text"
            placeholder="Enter what you want to search for"
            className="p-4 rounded-lg w-[90%] bg-primaryBg-default border"
            onChange={(e) => setInputChat(e.target.value)}
            value={inputChat}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleChatDetail();
              }
            }}
          />
          <button
            className="p-4 rounded-lg bg-blue-600"
            onClick={handleChatDetail}
          >
            {isLoading ? "Waiting ..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
