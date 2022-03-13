import { JoinRoomAndGetInfoResponse } from "../ws/entities";
import React, { useContext, useState } from "react";
import { useCurrentRoomIdStore } from "../../global-stores/useCurrentRoomIdStore";
import { useConn } from "../../shared-hooks/useConn";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { CenterLoader } from "../../ui/CenterLoader";
import { RoomHeader } from "../../ui/RoomHeader";
import { CreateRoomModal } from "../dashboard/CreateRoomModal";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRoomChatStore } from "./chat/useRoomChatStore";
import { RoomPanelIconBarController } from "./RoomPanelIconBarController";
import { RoomUsersPanel } from "./RoomUsersPanel";
import { useGetRoomByQueryParam } from "./useGetRoomByQueryParam";
import { UserPreviewModal } from "./UserPreviewModal";
import { MainContext } from "../../context/api_based";

interface RoomPanelControllerProps {
  setRoomData?: React.Dispatch<
    React.SetStateAction<JoinRoomAndGetInfoResponse | undefined>
  >;
  showMobileEditModal: boolean;
  setShowMobileEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RoomPanelController: React.FC<RoomPanelControllerProps> = ({
  setRoomData,
  showMobileEditModal,
  setShowMobileEditModal,
}) => {
  const { currentRoomId } = useCurrentRoomIdStore();
  const [showEditModal, setShowEditModal] = useState(false);
  const open = useRoomChatStore((s) => s.open);
  const screenType = useScreenType();
  const {current_room_base_data} = useContext(MainContext);
  return (
    <>
    

{showEditModal || showMobileEditModal ? (
  <CreateRoomModal
    onRequestClose={() => {
      setShowEditModal(false);
      setShowMobileEditModal(false);
    }}
    edit
    data={{
      name: "test",
      description: "",
      privacy: "public",
    }}
  />
) : null}


<HeaderController embed={{}} title="Control" />
    <MiddlePanel
      stickyChildren={
        screenType !== "fullscreen" ? (
          <RoomHeader
            onTitleClick={()=>setShowEditModal(true)}
            title={current_room_base_data? current_room_base_data!!.details.name : "loading..."}
            description={current_room_base_data? current_room_base_data!!.details.description:"loading..."}
            names={ [""]}
          />
        ) : (
          ""
        )
      }
    >
      <UserPreviewModal />
      {screenType === "fullscreen" && open ? null : (
        <RoomUsersPanel />
      )}
      <div
        className={`sticky bottom-0 pb-7 bg-primary-900 ${
          (screenType === "fullscreen" || screenType === "1-cols") && open
            ? "flex-1"
            : ""
        }`}
      >
        <RoomPanelIconBarController users={[]} />
      </div>
    </MiddlePanel>

</>
  );
};

