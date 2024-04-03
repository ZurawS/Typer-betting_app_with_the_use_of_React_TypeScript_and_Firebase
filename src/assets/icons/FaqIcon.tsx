import React from "react";

function FaqIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
    >
      <title>Stockholm-icons / Code / Info-circle</title>
      <desc>Created with Sketch.</desc>
      <defs />
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect x="0" y="0" width="24" height="24" />
        <circle
          className={`fill-current ${active ? "text-indigo-500" : "text-slate-400"}`}
          opacity="0.3"
          cx="12"
          cy="12"
          r="10"
        />
        <rect
          className={`fill-current ${active ? "text-indigo-500" : "text-slate-400"}`}
          x="11"
          y="10"
          width="2"
          height="7"
          rx="1"
        />
        <rect
          className={`fill-current ${active ? "text-indigo-500" : "text-slate-400"}`}
          x="11"
          y="7"
          width="2"
          height="2"
          rx="1"
        />
      </g>
    </svg>
  );
}

export default FaqIcon;
