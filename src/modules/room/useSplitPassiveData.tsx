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
import { MainContext } from "../../api_context/api_based";
import { UserPreviewModalContext } from "./UserPreviewModalProvider";

export const useSplitPassiveData = () => {
  const bots: React.ReactNode[] = [];
  const {
      client, 
      selected_iot_server, 
      iot_server_controllers, 
      iot_server_passive_data, 
      iot_server_owners} = useContext(MainContext);
  if (
      selected_iot_server && 
      iot_server_controllers && 
      iot_server_passive_data && 
      iot_server_owners){
      let all_bots = [];
      if (iot_server_passive_data.has(selected_iot_server)){
        let bot_data = JSON.parse(iot_server_passive_data.get(selected_iot_server));
        if (bot_data["bots"]){
            for(let bot_obj of bot_data["bots"]){
                all_bots.push({"name":bot_obj["device_name"], "type":bot_obj["type"]});
            }
        }
      }

      all_bots!!.forEach((data:any) => {
      //does the permission for this user exist?
      //only display users with permissions.     
            bots.push(
              <RoomAvatar
                id={data["name"]}
                canSpeak={false}
                isMe={false}
                key={data["name"]}
                src="https://github.com/House-of-IoT/HOI-WebClient/blob/master/Frontend/src/Img/bot.png"
                username={data["name"]}
                isBot={false}
                activeSpeaker={false }
                muted={false}
                deafened={false}
                onClick={() => {
                }}
              />
            );
      });
  }
  return {bots};
};
