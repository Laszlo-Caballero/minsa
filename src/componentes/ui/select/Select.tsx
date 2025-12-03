import cx from "@/utils/cx";
import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps
  extends Omit<
    DetailedHTMLProps<
      SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    "className"
  > {
  label: string;
  options: Option[];
  placeholder?: string;
  className?: {
    label?: string;
    select?: string;
  };
  error?: string;
}

export default function Select({
  label,
  options,
  placeholder,
  className,
  error,
  ...props
}: SelectProps) {
  return (
    <div>
      <label
        className={cx(
          "text-sm font-medium text-SubtituloGris",
          className?.label
        )}
      >
        {label}
      </label>
      <div className="relative mt-1">
        <select
          className={cx(
            "w-full border border-SubtituloGris rounded-xl px-3 py-2 appearance-none bg-white",
            className?.select
          )}
          defaultValue=""
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
