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
import { Button } from "../../ui/Button";
import { ModeContext } from "../../mode_context/room_mode";
export const useSplitPassiveData = () => {
  const bots: React.ReactNode[] = [];
  let number_of_bots = 0;
  const {
      client, 
      user,
      selected_iot_server, 
      iot_server_controllers, 
      iot_server_passive_data, 
      iot_server_owners} = useContext(MainContext);

  const {set_custom_action_open} = useContext(ModeContext);
  if (
      selected_iot_server && 
      iot_server_controllers && 
      iot_server_passive_data && 
      iot_server_owners){
      let all_bots = [];
 
      if (iot_server_passive_data.has(selected_iot_server)){
        let bot_data =  JSON.parse(JSON.parse(iot_server_passive_data.get(selected_iot_server)));
        if (bot_data["bots"]  != null){
            for(let bot_obj of bot_data["bots"]){
                all_bots.push(bot_obj);
            }
        }
      }
      number_of_bots += all_bots.length;
      all_bots!!.forEach((data:any) => {
          console.log(data);
      let bot_specific_data = data["data"];
      //Do we have permissions or are we the owner
      if (iot_server_controllers.get(selected_iot_server)?.has(user?.user_id) || iot_server_owners.get(selected_iot_server) == user?.user_id.toString()) {
          bots.push(
        <div className="flex flex-col h-15.5 w-15 rounded-8 bg-primary-700 overflow-scroll p-2">
            <Button
                loading={false}
                size={`small`}
                onClick = {()=>{set_custom_action_open(true)}}>
                Custom Action
            </Button>
            {
                //only owners of the connection can disconnect from the server
                iot_server_owners.get(selected_iot_server) == user?.user_id.toString()?     
                <Button
                    loading={false}
                    className = {"mt-2"}
                    size={`small`}>
                        Disconnect
                </Button>:null
            }
            {
                iot_server_owners.get(selected_iot_server) == user?.user_id.toString()?     
                <Button
                    loading={false}
                    className = {"mt-2"}
                    size={`small`}>
                    Setup Relation
                </Button>:null   
            }
            <Button
                loading={false}
                className = {"mt-2"}
                size={`small`}>
                View Relations        
            </Button>

       
        </div>);
      }
      //does the permission for this user exist?
      //only display users with permissions.     
            bots.push(
                <div className="flex flex-col w-15  rounded-8 bg-primary-700 overflow-scroll p-2">
                    <RoomAvatar
                        id={data["device_name"]}
                        canSpeak={false}
                        isMe={false}
                        key={data["device_name"]}
                        src="https://github.com/House-of-IoT/HOI-WebClient/blob/8459cfee7970d53a916ce478a4f3acf4efc1e9ed/Frontend/src/Img/bot.png?raw=true"
                        username={data["device_name"]}
                        isBot={false}
                        activeSpeaker={false }
                        muted={false}
                        deafened={false}
                        onClick={() => {
                        }}
                    />
                    
                    {Object.keys(data).map((key)=>{
                       return ( key != "data" && key != "device_name" && key != "message" && key != "alert_status"? <div className="text-primary-200 text-sm ">
                            {key + ":" + data[key]}
                        </div>:null )
                    })} 

                    {bot_specific_data == ""? <p className="text-accent">No Data</p>:        <Button
                loading={false}
                className = {"mt-2"}
                size={`small`}>
                View Data        
            </Button>

                    }
                    <Button
                        loading={false}
                        className = {"mt-2"}
                        size={`small`}>
                        Execute Actions
                    </Button>
                </div>
  
            );
            
      });
  }

  return {bots, number_of_bots};
};
