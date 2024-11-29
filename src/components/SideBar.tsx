/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addChat, removeChat } from "../store/chatSlice";
import IconPlus from "../assets/plusIcon.png";
import IconChat from "../assets/chat.png";
import IconTrash from "../assets/remove.png";
import IconMenu from "../assets/menu.png";
import { MouseEvent } from "react";

interface ISideBarProps {
  onToggle?: () => void;
}

const SideBar = (props: ISideBarProps) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.chat);
  const navigate = useNavigate();

  const handleAddChat = async () => {
    dispatch(addChat({ roomDetail: true }));
  };

  const handleRemoveChat = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: any
  ) => {
    e.preventDefault();
    dispatch(removeChat(id));
    navigate("/");
  };

  const { onToggle } = props;
  return (
    <div className="bg-primaryBg-/50 w-[280px] h-screen text-white p-8">
      <button className="flex ml-auto xl:hidden" onClick={onToggle}>
        <img src={IconMenu} alt="menu" className="w-10 h10" />
      </button>

      <div className="mt-20">
        <button
          className="px-4 py-2 flex items-center space-x-4 bg-gray-500 rounded-md mb-10"
          onClick={handleAddChat}
        >
          <img src={IconPlus} alt="Plus" className="w-4 h-4" />
          <p>New conversation</p>
        </button>

        <div className="space-y-4">
          <p>Before</p>

          <div className="flex flex-col space-y-6">
            {data.map((ele: any, index: any) => (
              <Link
                to={`/chat/${ele.id}`}
                className="flex items-center justify-between p-2 bg-gray-700 rounded-md cursor-pointer"
                key={index}
              >
                <div className="flex items-center space-x-4">
                  <img src={IconChat} alt="Chat Icon" className="w-8 h-8" />

                  <p>{ele?.title}</p>
                </div>

                <button
                  onClick={(e) => {
                    handleRemoveChat(e, ele.id);
                  }}
                >
                  <img
                    src={IconTrash}
                    alt="Chat Icon"
                    className="w-5 h-5 cursor-pointer"
                  />
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
