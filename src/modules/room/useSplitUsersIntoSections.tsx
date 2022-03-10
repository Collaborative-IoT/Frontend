import React, { useContext } from "react";
import { useMuteStore } from "../../global-stores/useMuteStore";
import { useDeafStore } from "../../global-stores/useDeafStore";
import { SolidSimpleMegaphone } from "../../icons";
import { modalConfirm } from "../../shared-components/ConfirmModal";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { RoomAvatar } from "../../ui/RoomAvatar";
import { Emote } from "./chat/Emote";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { User } from "@collaborative/arthur";
import { MainContext } from "../../context/api_based";
export const useSplitUsersIntoSections = ({
}) => {
  const { muted } = useMuteStore();
  const { deafened } = useDeafStore();
  const screenType = useScreenType();
  const speakers: React.ReactNode[] = [];
  const askingToSpeak: React.ReactNode[] = [];
  const listeners: React.ReactNode[] = [];
  const {user,all_users_in_room, current_room_base_data,current_room_permissions} = useContext(MainContext);
  let canIAskToSpeak = false;
  if (user && all_users_in_room && current_room_base_data && current_room_permissions){
      let all_users_plus_me:User[] = [{
        you_are_following:false,
        follows_you:false,
        they_blocked_you:false,
        username:user!!.username,
        num_followers:user!!.num_followers,
        num_following:user!!.num_following,
        last_online:"fff",
        user_id:user!!.user_id,
        contributions:user!!.contributions,
        avatar_url:user!!.avatar_url,
        banner_url:user!!.banner_url,
        i_blocked_them:false,
        display_name:user!!.display_name,
        bio:user!!.bio
      }].concat(all_users_in_room);
      console.log("permissions" , current_room_permissions);
      all_users_plus_me!!.forEach((u:User) => {
        let arr = listeners;
        if (u.user_id === current_room_base_data?.creator_id ||current_room_permissions!![u.user_id]!!.is_speaker) {
          arr = speakers;
        } else if (current_room_permissions!![u.user_id]!!.asked_to_speak) {
          arr = askingToSpeak;
        } else if (u.user_id === user!!.user_id) {
          canIAskToSpeak = true;
        }

        let flair: React.ReactNode | undefined = undefined;

        const isCreator = u.user_id === current_room_base_data!!.creator_id;
        const isSpeaker = current_room_permissions!![u.user_id]!!.is_speaker;
        const canSpeak = isCreator || isSpeaker;
        const isMuted = user!!.user_id === u.user_id ? muted : false;
        const isDeafened = user!!.user_id === u.user_id ? deafened : false;

        if (isCreator || current_room_permissions!![u.user_id]!!.is_mod) {
          flair = (
            <Emote
              emote={isCreator ? "coolhouse" : "dogehouse"}
              alt={isCreator ? `admin` : `mod`}
              title={isCreator ? `Admin` : `Mod`}
              style={{ marginLeft: 4 }}
              className={`w-3 h-3 ml-1`}
            />
          );
        }

        // for (let i = 0; i < 50; i++) {
        arr.push(
          <RoomAvatar
            // key={u.id + i}
            id={u.user_id}
            canSpeak={canSpeak}
            isMe={user!!.user_id === u.user_id}
            key={u.user_id}
            src={u.avatar_url}
            username={u.username}
            isBot={false}
            activeSpeaker={
              canSpeak && !isMuted && !isDeafened && false //make false active speaker map
            }
            muted={canSpeak && isMuted && !isDeafened}
            deafened={isDeafened}
            onClick={() => {
            }}
            flair={flair}
          />
        );
        // }
      });

      if (canIAskToSpeak && screenType !== "fullscreen") {
        speakers.push(
          <div key="megaphone" className={`flex justify-center`}>
            <BoxedIcon
              onClick={() => {
                modalConfirm("Would you like to ask to speak?", () => {
                });
              }}
              style={{ width: 60, height: 60 }}
              circle
              className="flex-shrink-0"
              title="Request to speak"
            >
              <SolidSimpleMegaphone width={20} height={20} />
            </BoxedIcon>
          </div>
        );
      }
  }
  return { speakers, listeners, askingToSpeak, canIAskToSpeak };
};
