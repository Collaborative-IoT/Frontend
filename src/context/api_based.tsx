import { AuthResponse,CommunicationRoom,BaseUser,Client,AuthCredentials,ClientSubscriber, User, AllUsersInRoomResponse, GetFollowListResponse } from "@collaborative/arthur";
import React, { useEffect, useMemo, useState } from "react";
import { wsApiBaseUrl } from "../lib/constants";
import { useRouter } from "next/router";
import { Url } from "url";

type Nullable<T> = T | null;
type StateChange = Nullable<(update: ((prevState: null) => null) | null) => void>;

export const MainContext = React.createContext<{
    dash_live_rooms:Nullable<CommunicationRoom[]>;
    client: Nullable<Client>;
    user:Nullable<BaseUser>;
    all_users_in_room:Nullable<User[]>;
    my_followers:Nullable<Array<number>>;
    create_client:() => void;
    set_my_followers:StateChange;
  }>({
      dash_live_rooms:[],
      client: null, 
      user:null,
      all_users_in_room:null,
      create_client: ()=>{},
      my_followers:null,
      set_my_followers:null
  });  

  const initClient = (
      set_error:any,
      set_user:React.Dispatch<React.SetStateAction<BaseUser | null>>,
      set_dash_live_rooms:React.Dispatch<React.SetStateAction<CommunicationRoom[] | null>>,
      set_all_users_in_room:StateChange,
      set_my_followers:StateChange)=>{
    
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
        var my_user_id:Nullable<number> = null;

        // setup the subscriber
        let subscriber =  new ClientSubscriber();
        let client = new Client(wsApiBaseUrl,subscriber,auth_credentials);
        subscriber.good_auth = (data:AuthResponse)=>{
            if(data.new_access){
                localStorage.setItem("a-ciot",data.new_access);
                localStorage.setItem("r-ciot", data.new_refresh);
            }
            client.send("my_data",{});
            client.send("create_room", {name:"test",desc:"test2",public:true});
            client.send("create_room", {name:"test",desc:"test2",public:true});
            client.send("get_top_rooms",{});
        }
        subscriber.your_data = (user_data:BaseUser)=>{
            set_user(user_data);
        }
        subscriber.all_users_in_room = (room_data:AllUsersInRoomResponse) =>{
            set_all_users_in_room?((_prev:any)=>{
                return room_data;
            }):null;
        }
        subscriber.bad_auth =()=>{

            localStorage.setItem("ciot_auth_status","bad");
            set_error(true)
            
        }
        subscriber.followers = (data:GetFollowListResponse)=>{
            console.log("the follower data from ws:",data);
            if (my_user_id != null && data.for_user == my_user_id){
                set_my_followers?((_prev:any)=>{
                    return data.user_ids;
                }):null;
            }
        }
        subscriber.top_rooms = (data:CommunicationRoom[])=>{
            if (data.length > 0){
                set_dash_live_rooms!!(data);
            }
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
    const [all_users_in_room, set_all_users_in_room] = useState(null);
    const [my_followers, set_my_followers] = useState(null);
    const [error, set_error] = useState(false);
    let {push} = useRouter();
    useEffect(()=>{
        if (should_connect){
            
            let temp_client:Client = initClient(set_error,set_user,set_dash_live_rooms,set_all_users_in_room,set_my_followers)!!;
            set_client((_prev:any)=>{              
                return temp_client;
            })
        }
    },[])
    useEffect(()=>{
        
        if (error == true){
            push("/");
        }
    },[error])
    return(    
      <MainContext.Provider 
        value={useMemo(
            () => ({
                    dash_live_rooms:dash_live_rooms,
                    client,
                    user,
                    all_users_in_room,
                    my_followers,
                    set_my_followers,
                    create_client:()=>{},
            }),
            [client,user,all_users_in_room,my_followers,dash_live_rooms]
          )
      }>
          {children}
      </MainContext.Provider>
    )
  }