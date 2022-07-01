import React, { useContext } from "react";
import { MainContext } from "../../api_context/api_based";
import { ModeContext } from "../../mode_context/room_mode";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { Button } from "../../ui/Button";
import { CenterLoader } from "../../ui/CenterLoader";
import { InfoText } from "../../ui/InfoText";
import { SingleUser } from "../../ui/UserAvatar";

interface ServerPermissionProps {}

const SelectButton: React.FC<{ has_permission: boolean }> = ({ has_permission }) => {
    return (
        <Button
            loading={false}
            onClick={() => {
            }}
            size={`small`}
        >
           {has_permission? "Revoke":"Give"}
        </Button>
    );
};
export const ServerPermissionsPage: React.FC<{}> = () => {
    const { t } = useTypeSafeTranslation();
    const {
        selected_iot_server,
        iot_server_controllers,
        all_users_in_room
    } = useContext(MainContext);
    const {
        give_permissions_open,
        set_give_permissions_open
    } = useContext(ModeContext);
    if (
        selected_iot_server == null
    ) {
        return <InfoText className={`mt-2`}>No Server Selected</InfoText>;
    }
    let data = [];
    for (let user_id of all_users_in_room!!.keys()) {
        let user = all_users_in_room.get(user_id);
        data.push({
            username: user!!.username,
            avatar_url:user!!.avatar_url,
            id:user!!.user_id,
            has_permission:iot_server_controllers!!.get(selected_iot_server)!!.has(user!!.user_id)
        });
    }

    return (
        <>
            {data.map((user_data: { username: String; avatar_url: String, id:number, has_permission:boolean }) => (
                <div
                    className={`flex border-b border-solid w-full py-4 px-2 items-center`}
                    key={username}
                >
                    <div className="flex">
                        <SingleUser
                            size="md"
                            src={avatar_url}/>
                    </div>
                    <div className={`flex ml-4 flex-1 mr-4`}>
                        <div className={`flex text-lg font-bold`}>
                            {username}
                        </div>
                    </div>
                    <SelectButton has_permission={has_permission} />
                </div>
            ))}
        </>
    );
};

export const ServerPermissions: React.FC<ServerPermissionProps> = ({}) => {
    const { t } = useTypeSafeTranslation();
    return (
        <>
            <div className={`flex mt-4 flex-col text-primary-100 pt-3`}>
                <h1 className={`text-xl`}>Manage Permissions</h1>
                <div className="flex flex-col">{<ServerPermissionsPage />}</div>
            </div>
        </>
    );
};
