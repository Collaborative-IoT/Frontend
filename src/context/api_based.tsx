import { AuthResponse,CommunicationRoom,BaseUser,Client,AuthCredentials,ClientSubscriber, User, AllUsersInRoomResponse, GetFollowListResponse, FollowInfo, RoomPermissions } from "@collaborative/arthur";
import React, { useEffect, useMemo, useState } from "react";
import { wsApiBaseUrl } from "../lib/constants";
import { useRouter } from "next/router";

type Nullable<T> = T | null;

export const MainContext = React.createContext<{
    dash_live_rooms:Nullable<CommunicationRoom[]>;
    client: Nullable<Client>;
    user:Nullable<BaseUser>;
    all_users_in_room:Nullable<User[]>;
    im_following:Nullable<Array<FollowInfo>>;
    main_interval_handle:Nullable<NodeJS.Timeout>;
    current_room_permissions:Nullable<Map<number,RoomPermissions>>;
    current_room_id:Nullable<number>;
    create_client:() => void;
    set_current_room_id:any,
  }>({
      dash_live_rooms:[],
      client: null, 
      user:null,
      all_users_in_room:null,
      create_client: ()=>{},
      im_following:null,
      main_interval_handle: null,
      current_room_permissions:null,
      current_room_id:null,
      set_current_room_id:null,
  });  

  const initClient = (
      set_all_room_permissions:React.Dispatch<React.SetStateAction<Map<number,RoomPermissions>|null | null>>,
      set_interval_handle:React.Dispatch<React.SetStateAction<NodeJS.Timeout | null>>,
      set_error:any,
      set_user:React.Dispatch<React.SetStateAction<BaseUser | null>>,
      set_dash_live_rooms:React.Dispatch<React.SetStateAction<CommunicationRoom[] | null>>,
      set_all_users_in_room:React.Dispatch<React.SetStateAction<User[] | null>>,
      set_my_following:React.Dispatch<React.SetStateAction<Array<FollowInfo> | null>>,
      push:any)=>{
    
    if (typeof window !== 'undefined'){
        // connect to the server and authenticate
        try{
        const type_of_auth = localStorage.getItem("t-ciot") as string;
        const auth_access = localStorage.getItem("a-ciot") as string;
        const auth_refresh = localStorage.getItem("r-ciot") as string;
        let auth_credentials:AuthCredentials = {
            access:auth_access,
            refresh:auth_refresh,
            oauth_type:type_of_auth
        };

        // setup the subscriber
        let subscriber =  new ClientSubscriber();
        let client = new Client(wsApiBaseUrl,subscriber,auth_credentials);
        subscriber.good_auth = (data:AuthResponse)=>{
            if(data.new_access){
                localStorage.setItem("a-ciot",data.new_access);
                localStorage.setItem("r-ciot", data.new_refresh);
            }
            client.send("my_data",{});
        }
        subscriber.your_data = (user_data:BaseUser)=>{
            set_user(user_data);
            let handle = setInterval(()=>{
                client.send("get_top_rooms",{});
                client.send("get_following", {user_id:user_data.user_id});
            },5000);
            set_interval_handle(handle);
        }
        subscriber.all_users_in_room = (room_data:AllUsersInRoomResponse) =>{
            set_all_users_in_room(room_data.users);
        }
        subscriber.bad_auth =()=>{
            localStorage.setItem("ciot_auth_status","bad");
            set_error(true)
        }
        subscriber.followers = (data:GetFollowListResponse)=>{
            console.log(data.user_ids);
            set_my_following(data.user_ids);
            
        }
        subscriber.top_rooms = (data:CommunicationRoom[])=>{
            set_dash_live_rooms!!(data);
        }
        subscriber.room_created = (room_number:number)=>{
            console.log("created");
            push(`room/${room_number}`)
        }
        // begin routing incoming data + auth
        client.begin();
        return client;
    }
    catch(e){
        console.log("error");
        console.log(e);
        }
    }
}

export const MainContextProvider: React.FC<{should_connect:boolean}> = ({
    should_connect,
    children,
  }) => {
    const [dash_live_rooms, set_dash_live_rooms] = useState<CommunicationRoom[]|null>(null);
    const [client, set_client] = useState<Client|null>(null);
    const [user, set_user] = useState<BaseUser|null>(null);
    const [all_users_in_room, set_all_users_in_room] = useState<User[]|null>(null);
    const [im_following, set_my_following] = useState<Array<FollowInfo>|null>(null);
    const [error, set_error] = useState(false);
    const [current_room_permissions, set_current_permissions] = useState<Map<number,RoomPermissions>|null>(null);
    const [current_room_id, set_current_room_id] = useState<number|null>(null);
    // for the main interval triggered in the "my_data" callback of the subscriber above.
    // we need to clear it when needed.
    const [interval_handle, set_interval_handle] = useState<NodeJS.Timeout |null>(null);
    let {push} = useRouter();
    useEffect(()=>{
        if (should_connect){
            let temp_client:Client = initClient(
                set_current_permissions,
                set_interval_handle,
                set_error,
                set_user,
                set_dash_live_rooms,
                set_all_users_in_room,
                set_my_following,
                push)!!;
            set_client((_prev:any)=>{              
                return temp_client;
            })
        }
    },[should_connect])
    useEffect(()=>{
        
        if (error == true){
            push("/");
        }
    },[error])
    return(    
      <MainContext.Provider 
        value={
         {
            dash_live_rooms:dash_live_rooms,
            client,
            user,
            all_users_in_room,
            im_following,
            create_client:()=>{},
            main_interval_handle:interval_handle,
            current_room_permissions,
            current_room_id,
            set_current_room_id
        }
      }>
          {children}
      </MainContext.Provider>
    )
  }