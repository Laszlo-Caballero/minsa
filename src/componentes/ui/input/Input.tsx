import cx from "@/utils/cx";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "className"
  > {
  label: string;
  placeholder: string;
  className?: {
    label?: string;
    input?: string;
  };
  error?: string;
}

export default function Input({
  label,
  placeholder,
  className,
  error,
  ...props
}: InputProps) {
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
      <input
        className={cx(
          "w-full border border-SubtituloGris rounded-xl px-3 py-2 mt-1",
          className?.input
        )}
        placeholder={placeholder}
        {...props}
      />

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
