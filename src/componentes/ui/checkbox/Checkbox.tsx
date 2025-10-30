import cx from "@/utils/cx";

interface CheckBoxProps {
  label: string;
  placeholder?: string;
  onChange?: (checked: boolean) => void;
  value?: boolean;
  className?: string;
}

export default function Checkbox({
  label,
  className,
  onChange,
  value,
  placeholder,
}: CheckBoxProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <p className="text-sm text-SubtituloGris">{label}</p>

      <div
        onClick={() => {
          onChange?.(!value);
        }}
        className={cx(
          "px-3 py-2 rounded-xl cursor-pointer border border-SubtituloGris flex items-center text-SubtituloGris",
          className,
          value && "bg-IconoHospital/50 text-white"
        )}
      >
        <p>{placeholder}</p>
      </div>
    </div>
  );
}
