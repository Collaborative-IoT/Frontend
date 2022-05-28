import React, { useState } from "react";
// Used to switch between integration mode and user mode
export const ModeContext = React.createContext<{
    integration_mode_activated: boolean;
    integration_add_open: boolean;
    integration_server_select_open: boolean;
    set_integration_server_select_open: any;
    set_integration_mode: any;
    set_integration_add: any;
    custom_action_open: boolean;
    set_custom_action_open: any;
}>({
    integration_mode_activated: false,
    integration_add_open: false,
    set_integration_server_select_open: false,
    set_integration_mode: () => {},
    set_integration_server_select_open: () => {},
    set_integration_add: () => {},
    custom_action_open: false,
    set_custom_action_open: () => {},
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
            }}
        >
            {children}
        </ModeContext.Provider>
    );
};
