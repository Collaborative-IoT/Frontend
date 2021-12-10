import Link from "next/link";
import React from "react";
import { LgLogo, LogoIcon } from "../../icons";
import { useScreenType } from "../../shared-hooks/useScreenType";

export interface LeftHeaderProps {}

const LeftHeader: React.FC<LeftHeaderProps> = ({}) => {
  const screenType = useScreenType();
  return (
    <Link href="/dash">
      <a data-testid="logo-link" className="w-full">
        <h4 style={{color:"#ffffff"}}>Collaborative-IoT 🚀</h4>
      </a>
    </Link>
  );
};

export default LeftHeader;
