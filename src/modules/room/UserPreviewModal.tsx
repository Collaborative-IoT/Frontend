import { JoinRoomAndGetInfoResponse, RoomUser, UserWithFollowInfo } from "../ws/entities";
import React, { useContext, useEffect } from "react";
import { useDebugAudioStore } from "../../global-stores/useDebugAudio";
import { useConn } from "../../shared-hooks/useConn";
import { useCurrentRoomInfo } from "../../shared-hooks/useCurrentRoomInfo";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";
import { Spinner } from "../../ui/Spinner";
import { VerticalUserInfoWithFollowButton } from "../user/VerticalUserInfoWithFollowButton";
import { AudioDebugConsumerSection } from "./AudioDebugConsumerSection";
import { RoomChatMessage, useRoomChatStore } from "./chat/useRoomChatStore";
import { UserPreviewModalContext } from "./UserPreviewModalProvider";
import { VolumeSliderController } from "./VolumeSliderController";
import { MainContext } from "../../api_context/api_based";

const UserPreview: React.FC<{
  message?: RoomChatMessage;
  id: string;
  isMe: boolean;
  iAmCreator: boolean;
  iAmMod: boolean;
  isCreator: boolean;
  roomPermissions?: RoomUser["roomPermissions"];
  onClose: () => void;
}> = ({
  id,
  isCreator,
  isMe,
  iAmCreator,
  iAmMod,
  message,
  roomPermissions,
  onClose,
}) => {

  const {user,all_users_in_room} = useContext(MainContext);
  const { t } = useTypeSafeTranslation();
  const bannedUserIdMap = useRoomChatStore((s) => s.bannedUserIdMap);
  const { debugAudio } = useDebugAudioStore();

  const canDoModStuffOnThisUser =
    !isMe &&
    (iAmCreator || iAmMod) &&
    !isCreator &&
    (!roomPermissions?.isMod || iAmCreator);

  // [shouldShow, key, onClick, text]
  const buttonData = [
    [
      iAmCreator && !isMe && roomPermissions?.isSpeaker,
      "changeRoomCreator",
      () => {
        onClose();
      },
      t("components.modals.profileModal.makeRoomCreator"),
    ],
    [
      !isMe && iAmCreator,
      "makeMod",
      () => {
        onClose();
      },
      roomPermissions?.isMod
        ? t("components.modals.profileModal.unmod")
        : t("components.modals.profileModal.makeMod"),
    ],
    [
      canDoModStuffOnThisUser &&
        !roomPermissions?.isSpeaker &&
        roomPermissions?.askedToSpeak,
      "addSpeakerButton",
      () => {
        onClose();
      },
      t("components.modals.profileModal.addAsSpeaker"),
    ],
    [
      canDoModStuffOnThisUser && roomPermissions?.isSpeaker,
      "moveToListenerButton",
      () => {
        onClose();
      },
      t("components.modals.profileModal.moveToListener"),
    ],
    [
      canDoModStuffOnThisUser &&
        !(id in bannedUserIdMap) &&
        (iAmCreator || !roomPermissions?.isMod),
      "banFromChat",
      () => {
        onClose();
      },
      t("components.modals.profileModal.banFromChat"),
    ],
    [
      canDoModStuffOnThisUser &&
        id in bannedUserIdMap &&
        (iAmCreator || !roomPermissions?.isMod),
      "unbanFromChat",
      () => {
        onClose();
      },
      t("components.modals.profileModal.unBanFromChat"),
    ],
    [
      canDoModStuffOnThisUser && (iAmCreator || !roomPermissions?.isMod),
      "banFromRoom",
      () => {
        onClose();
      },
      t("components.modals.profileModal.banFromRoom"),
    ],
    [
      canDoModStuffOnThisUser && (iAmCreator || !roomPermissions?.isMod),
      "banIpFromRoom",
      () => {
        onClose();
      },
      t("components.modals.profileModal.banIPFromRoom"),
    ],
    [
      isMe &&
        !iAmCreator &&
        (roomPermissions?.askedToSpeak || roomPermissions?.isSpeaker),
      "goBackToListener",
      () => {
        onClose();
      },
      t("components.modals.profileModal.goBackToListener"),
    ],
    [
      !!message,
      "deleteMessage",
      () => {
        if (message?.id) {

          onClose();
        }
      },
      t("components.modals.profileModal.deleteMessage"),
    ],
  ] as const;

  return (
    <div className={`flex flex-col w-full`}>
      <div className={`flex bg-primary-900 flex-col`}>
        <VerticalUserInfoWithFollowButton
          idOrUsernameUsedForQuery={id}
        />
      </div>
      {!isMe && (isCreator || roomPermissions?.isSpeaker) ? (
        <div className={`flex pb-3 bg-primary-800`}>
          <VolumeSliderController userId={id} />
        </div>
      ) : null}
      <div className="flex px-6 flex-col bg-primary-800">
        {debugAudio ? <AudioDebugConsumerSection userId={id} /> : null}
        {buttonData.map(([shouldShow, key, onClick, text]) => {
          return shouldShow ? (
            <Button
              color="secondary"
              className={`my-1 text-base`}
              key={key}
              onClick={onClick}
            >
              {text}
            </Button>
          ) : null;
        })}
      </div>
    </div>
  );
};

export const UserPreviewModal: React.FC<{}> = ({
}) => {
  const { isCreator: iAmCreator, isMod } = useCurrentRoomInfo();
  const { data, setData } = useContext(UserPreviewModalContext);
  const {user,all_users_in_room,current_room_permissions,current_room_base_data,client} = useContext(MainContext);
  useEffect(()=>{
    if (data && client){
      
    }
  },[data,client])
  return (
    <Modal
      variant="userPreview"
      onRequestClose={() => setData(null)}
      isOpen={!!data}
    >
      {
      // make sure our data exists
      // we need the user to have permissions and 
      // we need to have their data along with our data
      !data  ? null : (
        <UserPreview
          id={data.userId}
          isCreator={current_room_base_data!!.creator_id === +data.userId }
          roomPermissions={
            null
          }
          iAmCreator={user!!.user_id === current_room_base_data!!.creator_id }
          isMe={user!!.user_id === +data.userId}
          iAmMod={current_room_permissions!![user!!.user_id].is_mod}
          message={data.message}
          onClose={() => setData(null)}
        />
      )}
    </Modal>
  );
};


