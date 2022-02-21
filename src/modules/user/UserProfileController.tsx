import isElectron from "is-electron";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { isServer } from "../../lib/isServer";
import { usePreloadPush } from "../../shared-components/ApiPreloadLink";
import { useConn } from "../../shared-hooks/useConn";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { Button } from "../../ui/Button";
import { CenterLoader } from "../../ui/CenterLoader";
import { InfoText } from "../../ui/InfoText";
import { UserProfile } from "../../ui/UserProfile";
import { EditProfileModal } from "./EditProfileModal";
import { VerticalUserInfoWithFollowButton } from "./VerticalUserInfoWithFollowButton";

interface UserProfileControllerProps {}

const isMac = process.platform === "darwin";

export const UserProfileController: React.FC<UserProfileControllerProps> = ({}) => {
  const conn = useConn();
  const { t } = useTypeSafeTranslation();
  const { push } = useRouter();
  const { query } = useRouter();

  return (
    <>
    </>
  );
};
