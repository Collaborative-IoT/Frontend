import { Room, User, UserPreview } from "@dogehouse/kebab";
import { useRouter } from "next/router";
import React from "react";
import { useCurrentRoomIdStore } from "../../global-stores/useCurrentRoomIdStore";
import { SolidMegaphone, SolidMessages, SolidNotification } from "../../icons";
import { useTokenStore } from "../../modules/auth/useTokenStore";
import { closeVoiceConnections } from "../../modules/webrtc/WebRtcApp";
import { modalConfirm } from "../../shared-components/ConfirmModal";
import { useConn } from "../../shared-hooks/useConn";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { DropdownController } from "../DropdownController";
import { SettingsDropdown } from "../SettingsDropdown";
import { SingleUser } from "../UserAvatar";

export interface RightHeaderProps {
  onAnnouncementsClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => null;
  onMessagesClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => null;
  onNotificationsClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => null;
  actionButton?: React.ReactNode;
}

const RightHeader: React.FC<RightHeaderProps> = ({
  actionButton,
  onAnnouncementsClick,
  onMessagesClick,
  onNotificationsClick,
}) => {
  const { push } = useRouter();
  const { t } = useTypeSafeTranslation();
  const userPreview: UserPreview = {
    id: "222",
    displayName: "tester",
    numFollowers: 2,
    avatarUrl: "",
  };
  
  const room:Room = {

    id: "222",
    numPeopleInside: 2,
    voiceServerId: "222",
    creatorId: "23423",
    peoplePreviewList: [userPreview],
    autoSpeaker: false,
    inserted_at: "2",
    chatMode: "default",
    name: "test room 445",
    chatThrottle: 2000,
    isPrivate: false,
    description: "test desc"

}
  const user:User = {
    youAreFollowing: true,
      username: "test",
      online: true,
      numFollowing: 2,
      numFollowers: 2,
      lastOnline: "test",
      id: "223232",
      followsYou: true,
      botOwnerId: "test",
      contributions: 2,
      staff: true,
      displayName: "test",
      currentRoomId: "23323",
      currentRoom: room,
      bio: "test",
      avatarUrl: "test",
      bannerUrl: "test",
      whisperPrivacySetting: "on"

  }


  return (
    <div className="flex space-x-4 items-center justify-end focus:outline-no-chrome w-full">
      {onAnnouncementsClick && (
        <button onClick={onAnnouncementsClick}>
          <SolidMegaphone width={23} height={23} className="text-primary-200" />
        </button>
      )}
      {onMessagesClick && (
        <button onClick={onMessagesClick}>
          <SolidMessages width={23} height={23} className="text-primary-200" />
        </button>
      )}
      {onNotificationsClick && (
        <button onClick={onNotificationsClick}>
          <SolidNotification
            width={23}
            height={23}
            className="text-primary-200"
          />
        </button>
      )}
      {actionButton}
      <DropdownController
        zIndex={20}
        className="top-9 right-3 md:right-0 fixed"
        innerClassName="fixed  transform -translate-x-full"
        overlay={(close) => (
          <SettingsDropdown
            onActionButtonClicked={() => {
            }}
            onCloseDropdown={close}
            user={user}
          />
        )}
      >
        <SingleUser
          className={"focus:outline-no-chrome"}
          size="sm"
          src={"https://avatars.githubusercontent.com/u/35206353?v=4"}
        />
      </DropdownController>
    </div>
  );
};

export default RightHeader;
