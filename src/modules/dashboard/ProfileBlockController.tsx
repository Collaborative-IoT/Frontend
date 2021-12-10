import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCurrentRoomIdStore } from "../../global-stores/useCurrentRoomIdStore";
import { ContributorBadge, StaffBadge } from "../../icons/badges";
import { useConn } from "../../shared-hooks/useConn";
import { useTypeSafeQuery } from "../../shared-hooks/useTypeSafeQuery";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { useTypeSafeUpdateQuery } from "../../shared-hooks/useTypeSafeUpdateQuery";
import useWindowSize from "../../shared-hooks/useWindowSize";
import { ProfileBlock } from "../../ui/ProfileBlock";
import { UpcomingRoomsCard } from "../../ui/UpcomingRoomsCard";
import { badge, UserSummaryCard } from "../../ui/UserSummaryCard";
import { CreateScheduleRoomModal } from "../scheduled-rooms/CreateScheduledRoomModal";
import { EditProfileModal } from "../user/EditProfileModal";
import { MinimizedRoomCardController } from "./MinimizedRoomCardController";

interface ProfileBlockControllerProps {}

export const ProfileBlockController: React.FC<ProfileBlockControllerProps> = ({}) => {
  const [upcomingCount, setUpcomingCount] = useState(3);
  const { currentRoomId } = useCurrentRoomIdStore();

  //useConn();
  const conn = {user:{
    contributions:40,
    username:"test",
    botOwnerId:1,
    staff:true,
    avatarUrl:"",
    numFollowers:10,
    numFollowing:100,
    bio:"godlike",
    displayName:"",
    id:""
    }}


  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [
    showCreateScheduleRoomModal,
    setShowCreateScheduleRoomModal,
  ] = useState(false);
  const { data } = useTypeSafeQuery(["getScheduledRooms", ""]);
  const { push } = useRouter();
  const update = useTypeSafeUpdateQuery();
  const { height } = useWindowSize();
  const { t } = useTypeSafeTranslation();

  const badges: badge[] = [];
  if (conn.user.staff) {
    badges.push({
      content: <StaffBadge />,
      variant: "primary",
      color: "white",
      title: t("components.userBadges.dhStaff"),
      naked: true,
    });
  }

  if (conn.user.contributions > 0) {
    badges.push({
      content: <ContributorBadge contributions={conn.user.contributions} />,
      variant: "primary",
      color: "white",
      title: `${t("components.userBadges.dhContributor")} (${conn.user.contributions} ${t("pages.admin.contributions")})`,
      naked: true,
    });
  }

  if (conn.user.botOwnerId) {
    badges.push({
      content: t("pages.viewUser.bot"),
      variant: "primary",
      color: "white",
      title: t("pages.viewUser.bot"),
    });
  }

  useEffect(() => {
    if (height && height < 780) {
      setUpcomingCount(2);
    } else {
      setUpcomingCount(3);
    }
  }, [height]);

  return (
    <>
      <EditProfileModal
        isOpen={showEditProfileModal}
        onRequestClose={() => setShowEditProfileModal(false)}
      />
      {showCreateScheduleRoomModal ? (
        <CreateScheduleRoomModal
          onScheduledRoom={()=>{}
          }
          onRequestClose={() => setShowCreateScheduleRoomModal(false)}
        />
      ) : null}
      <ProfileBlock
        top={
          currentRoomId ? (
            <MinimizedRoomCardController />
          ) : (
            <UserSummaryCard
              onClick={() => setShowEditProfileModal(true)}
              badges={badges}
              website=""
              isOnline={false}
              {...conn.user}
              username={conn.user.username}
            />
          )
        }
        bottom={
          <UpcomingRoomsCard
            onCreateScheduledRoom={() => setShowCreateScheduleRoomModal(true)}
            rooms={[]}
          />
        }
      />
    </>
  );
};
