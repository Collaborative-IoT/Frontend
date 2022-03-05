import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

export const DropdownController: React.FC<{
  portal?: boolean;
  className?: string;
  innerClassName?: string;
  zIndex?: number;
}> = ({
  children,
  className,
  innerClassName,
  portal = true,
  zIndex,
}) => {
  const [visible, setVisibility] = useState(false);

  const referenceRef = useRef<HTMLButtonElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      modifiers: [{ name: "eventListeners", enabled: visible }],
      placement: "left",
    }
  );


  return (
    <React.Fragment>
      <button
        className="flex focus:outline-no-chrome"
        ref={referenceRef}
        onClick={()=>{}}
        data-testid="dropdown-trigger"
      >
        {children}
      </button>

    </React.Fragment>
  );
};
