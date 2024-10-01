"use client";
import { useAuthProvider } from "@/context/AuthProvider";
import { addDocument } from "@/firebase/services";
import useFirestore from "@/hook/useFirestore";
import { formatRelative } from "date-fns";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const Page = () => {
  const [message, setMessage] = useState("");
  const params = useParams();
  const { userData } = useAuthProvider();

  const roomCondition = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: params.rId,
    };
  }, [params.rId]);


  const messages = useFirestore("messages", roomCondition);
  const handleSendMessage = () => {
    addDocument("messages", {
      text: message,
      ...userData,
      roomId: params.rId,
    });
    setMessage("");
  };

  const formatDate = (seconds: number) => {
    let formatedDate = "";
    if (seconds) {
      formatedDate = formatRelative(new Date(seconds * 1000), new Date());
    }
    return formatedDate;
  };

  return (
    <div className="room-detail h-full flex flex-col">
      <div className="r-header flex items-center justify-between p-[15px]">
        <div className="info-room">
          <p className="text-white text-[20px]">Room 1</p>
          <p className="text-white">Đây là room 1</p>
        </div>
        <div className="list-user flex text-[12px] items-center justify-center">
          <button className="mr-[20px] text-white text-[18px]">Mời</button>
          <span className="user-in-room w-[20px] h-[20px] rounded-[20px] overflow-hidden bg-white flex items-center justify-center">
            A
          </span>
          <span className="user-in-room w-[20px] h-[20px] rounded-[20px] overflow-hidden bg-white flex items-center justify-center ml-[-5px] border">
            B
          </span>
          <span className="user-in-room w-[20px] h-[20px] rounded-[20px] overflow-hidden bg-white flex items-center justify-center ml-[-5px] border">
            +
          </span>
        </div>
      </div>
      <div className="r-content  p-[15px] flex-grow items-end flex overflow-hidden">
        <div className="list-mes text-white h-full w-full overflow-auto">
          {messages && messages.length
            ? messages.map((item: any, idx: number) => {
                return (
                  <div className="item mb-6" key={idx}>
                    <div className="item-top mb-[10px] flex items-center gap-2">
                      <span className="user-image w-[40px] h-[40px] rounded-[40px] overflow-hidden bg-white flex items-center justify-center">
                        <Image
                          width={40}
                          height={40}
                          src={item.photoURL}
                          alt={item.displayName}
                        />
                      </span>
                      <span className="user-name">{item.displayName}</span>
                      <span className="user-time text-[12px] ml-[10px] text-[#ddd]">
                        {formatDate(item?.createdAt?.seconds)}
                      </span>
                    </div>
                    <div className="item-content">{item.text}</div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div className="r-footer  p-[15px] flex gap-[20px]">
        <input
          placeholder="Nhập nội dung"
          className=" flex-grow py-[5px] px-[10px] rounded-[4px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button
          className="bg-white px-[20px] rounded-[4px]"
          onClick={handleSendMessage}
        >
          Gửi tin nhắn
        </button>
      </div>
    </div>
  );
};

export default Page;
