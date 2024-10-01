"use client";
import ModalAddRoom from "@/components/Modal/ModalAddRoom";
import { useAppContext } from "@/context/AppProvider";
import { useAuthProvider } from "@/context/AuthProvider";
import useFirestore from "@/hook/useFirestore";
import Link from "next/link";
import { useMemo } from "react";
import { addDocument } from "@/firebase/services";
type valueSubmitAddRoom = {
  name: string;
  des: string;
};
const ListRoom = () => {
  // const
  const { userData } = useAuthProvider();

  const roomCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: userData.uid,
    };
  }, [userData.uid]);

  const rooms = useFirestore("rooms", roomCondition);

  const appContext = useAppContext();

  const addNewRoom = () => {
    appContext?.onShowModal(ModalAddRoom, {
      handleSubmit: handleModalSubmitAddRoom,
      onCloseModal: appContext.onCloseModal,
    });
  };
  const handleModalSubmitAddRoom = (value: valueSubmitAddRoom) => {
    addDocument("rooms", { ...value, members: [userData.uid],createdAt: new Date() });
  };
  return (
    <div className="list-room p-[15px]">
      <p className="text-white text-[24px] mb-[20px]">Danh sách chat</p>
      <div className="list">
        {rooms.map((room: any) => {
          return (
            <Link
              href={`/rooms/${room.id}`}
              className="item text-white py-[5px] flex"
              key={room.id}
            >
              {room.name}
            </Link>
          );
        })}
      </div>
      <button className="text-white mt-[20px]" onClick={addNewRoom}>
        + Thêm phòng chat
      </button>
    </div>
  );
};

export default ListRoom;
