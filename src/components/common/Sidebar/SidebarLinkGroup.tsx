import React, { ReactElement, useState } from "react";

interface SidebarLinkGroupPops {
  children: (handleClick: () => void, open: boolean) => ReactElement;
  activecondition?: boolean;
}

function SidebarLinkGroup({ children, activecondition }: SidebarLinkGroupPops) {
  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${activecondition && "bg-slate-900"}`}>
      {open && children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;
