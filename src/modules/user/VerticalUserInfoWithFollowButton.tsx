import { UserWithFollowInfo } from "../ws/entities";
import React from "react";
import { SolidFriends, SolidFriendsAdd } from "../../icons";
import { useConn } from "../../shared-hooks/useConn";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { Button } from "../../ui/Button";
import { VerticalUserInfo } from "../../ui/VerticalUserInfo";

interface VerticalUserInfoControllerProps {
  idOrUsernameUsedForQuery: string;
}

export const VerticalUserInfoWithFollowButton: React.FC<VerticalUserInfoControllerProps> = ({
  idOrUsernameUsedForQuery
}) => {
  const conn = useConn();
  const { t } = useTypeSafeTranslation();

  return (
    <>
      <VerticalUserInfo/>
      <div className={`flex mb-5 items-center w-full justify-center`}>
        {/* @todo add real icon */}
        { 
          <Button
            loading={false}
            onClick={async () => {
        
              
            }}
            size="small"
            color={true ? "secondary" : "primary"}
            icon={true ? null : <SolidFriendsAdd />}
          >
            {true
              ? t("pages.viewUser.unfollow")
              : t("pages.viewUser.followHim")}
          </Button>
        }
      </div>
    </>
  );
};
