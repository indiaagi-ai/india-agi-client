import React from "react";

interface DividerProps {
  label?: string;
  dotted?: boolean;
}

const Divider: React.FC<DividerProps> = ({ label, dotted = true }) => {
  return (
    <div className="relative my-8 flex w-full items-center">
      <div
        className={`flex-1 border-black ${
          dotted ? "border-t-2 border-dotted" : "border-t"
        } `}
      />

      {label && (
        <span className="bg-[#faf9f5] px-4 font-medium text-black">
          {label}
        </span>
      )}

      <div
        className={`flex-1 border-black ${
          dotted ? "border-t-2 border-dotted" : "border-t"
        } `}
      />
    </div>
  );
};

export default Divider;
