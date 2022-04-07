import React, { useContext, useEffect, useState } from "react";
import { UserWithFollowInfo } from "../modules/ws/entities";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileAbout } from "./ProfileAbout";
import { ProfileTabs } from "./ProfileTabs";
import { badge } from "./UserSummaryCard";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { UserBadgeLgProps } from "./UserBadgeLg";
import { ContributorBadge, StaffBadge } from "../icons/badges";
import { MainContext } from "../api_context/api_based";
import { useRouter } from "next/router";
import { User } from "@collaborative/arthur";

interface UserProfileProps {
  user: UserWithFollowInfo;
  isCurrentUser?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  isCurrentUser,
}) => {
  const { t } = useTypeSafeTranslation();
  const badges: badge[] = [];
  const tags: UserBadgeLgProps[] = [];
  const {user, client} = useContext(MainContext);

    badges.push({
      content: <StaffBadge />,
      variant: "primary",
      color: "white",
      title: t("components.userBadges.dhStaff"),
      naked: true,
    });
    tags.push({
      icon: "dogeStaff",
      children: t("components.userBadges.dhStaff"),
    });

    badges.push({
      content: <ContributorBadge contributions={40} />,
      variant: "primary",
      color: "white",
      title: `${t("components.userBadges.dhContributor")} (${40} ${t("pages.admin.contributions")})`,
      naked: true,
    });
    tags.push({
      icon: "dogeContributor",
      contributions: 40,
      children: t("components.userBadges.dhContributor"),
    });

    badges.push({
      content: t("pages.viewUser.bot"),
      variant: "primary",
      color: "white",
      title: t("pages.viewUser.bot"),
    });
  
  return (
    <>
      <ProfileHeader
        user={user}
        pfp={user!!.avatar_url}
        displayName={user?.display_name}
        isCurrentUser={true}
        username={user.username}
        badges={badges}
      />
      <ProfileTabs user={user} className="mt-4" aboutTags={tags} />
    </>

  );
};
