import React, { useContext, useEffect } from "react";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { FollowingOnlineController } from "../dashboard/FollowingOnlineController";
import { ProfileBlockController } from "../dashboard/ProfileBlockController";
import { MainLayout } from "./MainLayout";
import { FloatingRoomInfo } from "./FloatingRoomInfo";
import { TabletSidebar } from "./TabletSidebar";
import { MainContext } from "../../context/api_based";
import { useRouter } from "next/router";

interface DefaultDesktopLayoutProps {
  mobileHeader?: React.ReactNode
}

export const DefaultDesktopLayout: React.FC<DefaultDesktopLayoutProps> = ({
  children,
  mobileHeader = undefined,
}) => {
  const {create_client,client} = useContext(MainContext);
  const hasTokens = ()=>{
    if (
      typeof window !== 'undefined' && 
      localStorage.getItem("a-ciot") != null && 
      localStorage.getItem("r-ciot") != null &&
      localStorage.getItem("t-ciot") != null){
      return true;
    }
    return false;
  }

  return (

      <MainLayout
        floatingRoomInfo={<FloatingRoomInfo />}
        tabletSidebar={<TabletSidebar />}
        leftPanel={<FollowingOnlineController />}
        rightPanel={<ProfileBlockController />}
        mobileHeader={mobileHeader}
      >
        {children}
      </MainLayout>

  );
};
