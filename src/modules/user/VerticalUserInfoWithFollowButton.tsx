import { UserWithFollowInfo } from "../ws/entities";
import React, { useContext } from "react";
import { SolidFriends, SolidFriendsAdd } from "../../icons";
import { useConn } from "../../shared-hooks/useConn";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { Button } from "../../ui/Button";
import { VerticalUserInfo } from "../../ui/VerticalUserInfo";
import { UserPreviewModalContext } from "../room/UserPreviewModalProvider";
import { MainContext } from "../../api_context/api_based";

interface VerticalUserInfoControllerProps {
  idOrUsernameUsedForQuery: string;
}

export const VerticalUserInfoWithFollowButton: React.FC<VerticalUserInfoControllerProps> = ({

}) => {
  const conn = useConn();
  const { t } = useTypeSafeTranslation();
  const {user,all_users_in_room} = useContext(MainContext);
  const {data} = useContext(UserPreviewModalContext);
  return (
    <>
    {user!!.user_id == +data!!.userId? null:<VerticalUserInfo user={ all_users_in_room!!.get(data?.userId)}/>}
      
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
