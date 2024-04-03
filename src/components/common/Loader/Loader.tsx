import React from "react";

function Loader({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return <></>;

  return (
    <div className="absolute inset-0 backdrop-blur-sm flex justify-center items-center z-[99]">
      <div className="border-solid border-white border-t-4 border-t-violet-600 rounded-full w-[100px] h-[100px] animate-spin"></div>
    </div>
  );
}

export default Loader;
