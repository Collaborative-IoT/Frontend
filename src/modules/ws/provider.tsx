import {Client,BaseUser,ClientSubscriber,AuthCredentials} from "@collaborative/arthur";
import React, { Children, useState } from "react";
type Nullable<T> = T | null;

import {
    apiBaseUrl,
    __prod__,
  } from "../../lib/constants";

/**
 * This context with the below provider wraps all of the components 
 * and when it is time to connect it uses it.
 */
export const WSProviderContext = React.createContext<{
    client: Nullable<Client>;
    user:Nullable<BaseUser>;
    create_client:(set:()=>{}) => void;
  }>({
    client: null,
    user:null,
    create_client: ()=>{},
  });  

const initClient = (set_client:any, set_user:any)=>{
    let subscriber =  new ClientSubscriber();
    if (typeof window !== 'undefined'){
        let type_of_auth = localStorage.getItem("t_ciot") as string;
        let auth_access = localStorage.getItem("a_ciot") as string;
        let auth_refresh = localStorage.getItem("r_ciot") as string;
        let auth_credentials:AuthCredentials = {
            access:auth_access,
            refresh:auth_refresh,
            oauth_type:type_of_auth
        };

        let client = new Client(apiBaseUrl,subscriber,auth_credentials);
        set_client((prev:any)=>{
            return client;
        });
    }
}

  export const WSProvider: React.FC<{}> = ({
    children,
  }) => {

    const [client, set_client] = useState(null);
    const [user, set_user] = useState(null);

    return(    
      <WSProviderContext.Provider value={
          {
            client,
            user,
            create_client:()=>{initClient(set_client,set_user)}
          }
      }>
          {children}

      </WSProviderContext.Provider>
    )
  }