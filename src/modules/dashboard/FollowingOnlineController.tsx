import { Room, UserPreview, UserWithFollowInfo } from "@dogehouse/kebab";
import React, { useState } from "react";
import { useConn } from "../../shared-hooks/useConn";
import { useTypeSafeQuery } from "../../shared-hooks/useTypeSafeQuery";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import {
  FollowerOnline,
  FollowersOnlineShowMore,
  FollowersOnlineWrapper,
} from "../../ui/FollowersOnline";
import { InfoText } from "../../ui/InfoText";

interface FriendsOnlineControllerProps {}


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
const data :UserWithFollowInfo = {
  followsYou :true,
  youAreFollowing:true,
  iBlockedThem:false,
  id:"2342",
  bio:"test",
  displayName:"topdawg",
  avatarUrl:"",
  bannerUrl:"",
  numFollowers:10,
  numFollowing:1000,
  currentRoom:room,
  contributions:200,
  staff:true,
  online:true,
  username:"top",
  lastOnline:new Date().toString() 
}

const Page: React.FC<{
  cursor: number;
  onLoadMore: (cursor: number) => void;
  isLastPage: boolean;
  isOnlyPage: boolean;
}> = ({ cursor, isLastPage, isOnlyPage, onLoadMore }) => {
  const { t } = useTypeSafeTranslation();



  return (
    <>
      {
        <FollowerOnline {...data} />
}
      {isLastPage  ? (
        <FollowersOnlineShowMore
          onClick={() => {}}
        />
      ) : null}
    </>
  );
};

export const FollowingOnlineController: React.FC<FriendsOnlineControllerProps> = ({}) => {
  const [cursors, setCursors] = useState<number[]>([0]);
  //const conn = useConn();

  //if (!conn) {
   // return null;
 // }

  return (
    <FollowersOnlineWrapper>
      {cursors.map((c, i) => (
        <Page
          key={c}
          cursor={c}
          onLoadMore={(nc) => setCursors([...cursors, nc])}
          isLastPage={false}
          isOnlyPage={cursors.length === 1}
        />
      ))}
    </FollowersOnlineWrapper>
  );
};
