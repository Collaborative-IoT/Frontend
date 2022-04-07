import React from "react";
import { apiBaseUrl } from "../../lib/constants";
import { PageComponent } from "../../types/PageComponent";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { MiddlePanel } from "../layouts/GridPanels";
import { UserProfileController } from "./UserProfileController";

interface UserPageProps {
}

export const UserPage: PageComponent<UserPageProps> = ({  }) => {
  const router = useRouter()
  const { userId } = router.query
  const [user_data, set_user_data] = useState<User|null>(null);
  
  useEffect(()=>{
    if(!client){
      router.push("/404")
    }else{
      client!!.client_sub.single_user_data = (data:SingleUserDataResults) =>{

      }
    }},[])
  
  return (
    <>
      {user_data? (
        <HeaderController
          title={user_data.display_name}
          embed={{ image: user_data.avatar_url }}
          description={user_data.bio}
        />
      ) : (
        <HeaderController />
      )}
      <DefaultDesktopLayout>
        <MiddlePanel>
          <UserProfileController key={username} />
        </MiddlePanel>
      </DefaultDesktopLayout>
    </>
  );
};


