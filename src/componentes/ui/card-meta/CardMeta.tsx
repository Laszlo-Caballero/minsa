import React from "react";

interface CardMetaProps {
  title: string;
  meta: string;
  value: number | string;
  percentage: number;
  color?: string;
}

export const CardMeta = ({
  title,
  meta,
  value,
  percentage,
  color = "teal-400",
}: CardMetaProps) => {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg">
            {meta}
          </span>
        </div>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
        <div
          className={`h-1.5 bg-${color} rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
