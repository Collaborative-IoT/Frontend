import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { Button } from "../../ui/Button";
import { CenterLoader } from "../../ui/CenterLoader";
import { InfoText } from "../../ui/InfoText";
import { SingleUser } from "../../ui/UserAvatar";

interface BlockedFromRoomUsersProps {}

export const GET_BLOCKED_FROM_ROOM_USERS = "get_blocked_from_room_users";

const UnbanButton = ({
  userId,
  offset,
}: {
  userId: string;
  offset: number;
}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <Button
      loading={false}
      onClick={() => {
      }}
      size={`small`}
    >
      {t("components.blockedFromRoomUsers.unban")}
    </Button>
  );
};
export const BlockedFromRoomUsersPage: React.FC<{
  offset: number;
  onLoadMore: (newOffset: number) => void;
  isLastPage: boolean;
  isOnlyPage: boolean;
}> = ({ offset, onLoadMore, isOnlyPage, isLastPage }) => {
  const { t } = useTypeSafeTranslation();


    return (
      <InfoText className={`mt-2`}>
        {t("components.blockedFromRoomUsers.noBans")}
      </InfoText>
    );


  return (
    <>
    </>
  );
};

export const BlockedFromRoomUsers: React.FC<BlockedFromRoomUsersProps> = ({}) => {
  const [offsets, setOffsets] = React.useState([0]);
  const { t } = useTypeSafeTranslation();

  return (
    <>
      <div className={`flex mt-4 flex-col text-primary-100 pt-3`}>
        <h1 className={`text-xl`}>
          {t("components.blockedFromRoomUsers.header")}
        </h1>
        <div className="flex flex-col">
          {offsets.map((offset, i) => (
            <BlockedFromRoomUsersPage
              key={offset}
              offset={offset}
              isLastPage={i === offsets.length - 1}
              isOnlyPage={offsets.length === 1}
              onLoadMore={(o) => setOffsets([...offsets, o])}
            />
          ))}
        </div>
      </div>
    </>
  );
};
