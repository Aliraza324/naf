import React from "react";

const Pagination = () => {
  return (
    <div className="mt-8 pb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-semibold text-white text-center sm:text-left">
        Showing 1-12 of 738
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/5 bg-[#141414] flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-600 flex items-center justify-center text-white font-semibold">
          1
        </button>

        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/5 bg-[#141414] flex items-center justify-center text-white font-semibold hover:bg-white/5 transition-colors">
          2
        </button>

        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/5 bg-[#141414] flex items-center justify-center text-white font-semibold hover:bg-white/5 transition-colors">
          3
        </button>

        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/5 bg-[#141414] flex items-center justify-center text-neutral-500 font-semibold cursor-default">
          ...
        </button>

        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/5 bg-[#141414] flex items-center justify-center text-white font-semibold hover:bg-white/5 transition-colors">
          50
        </button>

        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/5 bg-[#141414] flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;