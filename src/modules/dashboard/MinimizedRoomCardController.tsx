import { useRouter } from "next/router";
import React from "react";
import { Room, UserPreview, UserWithFollowInfo } from "../ws/entities";
import { useDeafStore } from "../../global-stores/useDeafStore";
import { useMuteStore } from "../../global-stores/useMuteStore";
import { useCurrentRoomFromCache } from "../../shared-hooks/useCurrentRoomFromCache";
import { useCurrentRoomInfo } from "../../shared-hooks/useCurrentRoomInfo";
import { useLeaveRoom } from "../../shared-hooks/useLeaveRoom";
import { useSetDeaf } from "../../shared-hooks/useSetDeaf";
import { useSetMute } from "../../shared-hooks/useSetMute";
import { MinimizedRoomCard } from "../../ui/MinimizedRoomCard";

export const MinimizedRoomCardController: React.FC = ({}) => {
  const data = useCurrentRoomFromCache();
  const { canSpeak } = useCurrentRoomInfo();
  const { muted } = useMuteStore();
  const { deafened } = useDeafStore();
  const setMute = useSetMute();
  const setDeaf = useSetDeaf();
  const router = useRouter();

  if (!data || "error" in data) {
    return null;
  }
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
  const dt = new Date(room.inserted_at);

  return (
    <MinimizedRoomCard
      onFullscreenClick={() => router.push(`/room/${room.id}`)}
      leaveLoading={false}
      room={{
        name: room.name,
        speakers: room.peoplePreviewList.slice(0, 3).map((s) => s.displayName),
        roomStartedAt: dt,
        myself: {
          isDeafened: deafened,
          isSpeaker: canSpeak,
          isMuted: muted,
          leave: () => {
          },
          switchDeafened: () => {
            setDeaf(!deafened);
          },
          switchMuted: () => {
            setMute(!muted);
          },
        },
      }}
    />
  );
};
