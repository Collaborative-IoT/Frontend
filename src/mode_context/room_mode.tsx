import React, { useState } from "react";
// Used to switch between integration mode and user mode
// with the data for integration mode.
export const ModeContext = React.createContext<{
    integration_mode_activated: boolean;
    integration_add_open: boolean;
    integration_server_select_open: boolean;
    set_integration_server_select_open: any;
    set_integration_mode: any;
    set_integration_add: any;
    custom_action_open: boolean;
    set_custom_action_open: any;
    selected_server_data_open: bool;
    set_selected_server_data_open: any;
    selected_bot_type: String | null;
    selected_bot_name: String | null;
    set_selected_bot_type: any;
    set_selected_bot_name: any;
    execute_actions_open: bool;
    set_execute_actions_open: any;
    give_permissions_open: bool;
    set_give_permissions_open: any;
    current_action_for_relation:String|null;
    current_device_name_for_relation:String|null;
    set_current_action_for_relation:any;
    set_current_device_name_for_relation:any;
}>({
    integration_mode_activated: false,
    integration_add_open: false,
    set_integration_server_select_open: false,
    set_integration_mode: () => {},
    set_integration_server_select_open: () => {},
    set_integration_add: () => {},
    custom_action_open: false,
    set_custom_action_open: () => {},
    selected_server_data_open: false,
    set_selected_server_data_open: () => {},
    selected_bot_type: null,
    selected_bot_name: null,
    set_selected_bot_type: () => {},
    set_selected_bot_name: () => {},
    set_execute_actions_open: () => {},
    execute_actions_open: false,
    give_permissions_open: false,
    set_give_permissions_open: () => {},
    current_action_for_relation:null,
    current_device_name_for_relation:null,
    set_current_action_for_relation:()=>{},
    set_current_device_name_for_relation:()=>{}
});

export const ModeContextProvider: React.FC<{}> = ({ children }) => {
    const [integration_mode_activated, set_integration_mode] =
        useState<boolean>(false);
    const [integration_add_open, set_integration_add] =
        useState<boolean>(false);
    const [integration_server_select_open, set_integration_server_select_open] =
        useState<boolean>(false);
    const [custom_action_open, set_custom_action_open] =
        useState<boolean>(false);
    const [selected_server_data_open, set_selected_server_data_open] =
        useState<boolean>(false);
    const [selected_bot_name, set_selected_bot_name] = useState<String | null>(
        null
    );
    const [selected_bot_type, set_selected_bot_type] = useState<String | null>(
        null
    );
    const [current_action_for_relation, set_current_action_for_relation] = useState<String | null>(
        null
    );
    const [current_device_name_for_relation, set_current_device_name_for_relation] = useState<String | null>(
        null
    );
    const [execute_actions_open, set_execute_actions_open] =
        useState<boolean>(false);
    const [give_permissions_open, set_give_permissions_open] =
        useState<boolean>(false);
    return (
        <ModeContext.Provider
            value={{
                integration_mode_activated,
                set_integration_mode,
                set_integration_add,
                integration_add_open,
                integration_server_select_open,
                set_integration_server_select_open,
                custom_action_open,
                set_custom_action_open,
                selected_server_data_open,
                set_selected_server_data_open,
                set_selected_bot_name,
                set_selected_bot_type,
                selected_bot_name,
                selected_bot_type,
                execute_actions_open,
                set_execute_actions_open,
                set_give_permissions_open,
                give_permissions_open,
                current_device_name_for_relation,
                current_action_for_relation,
                set_current_action_for_relation,
                set_current_device_name_for_relation
            }}
        >
            {children}
        </ModeContext.Provider>
    );
};
