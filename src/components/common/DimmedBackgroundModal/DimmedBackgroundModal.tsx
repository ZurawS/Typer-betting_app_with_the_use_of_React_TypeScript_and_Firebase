import React, { ReactNode } from "react";

export default function DimmedBackgroundModal({children}: {children: ReactNode}) {
  return (
    <>
      <div className="fixed inset-0 bg-slate-600 opacity-30 z-50"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">{children}</div>
    </>
  );
}
