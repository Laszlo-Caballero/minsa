import cx from "@/utils/cx";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

interface TextareaProps
  extends Omit<
    DetailedHTMLProps<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    "className"
  > {
  label: string;
  placeholder: string;
  className?: {
    label?: string;
    textarea?: string;
  };
  error?: string;
}

export default function Textarea({
  label,
  placeholder,
  className,
  error,
  ...props
}: TextareaProps) {
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
      <textarea
        className={cx(
          "w-full border border-SubtituloGris rounded-xl px-3 py-2 mt-1 min-h-[100px] resize-none",
          className?.textarea
        )}
        placeholder={placeholder}
        {...props}
      />

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
