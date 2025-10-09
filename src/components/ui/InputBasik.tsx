import { cn } from "@/utils/utils";
import { InputHTMLAttributes } from "react";
interface IInputBasic extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    value: string;
    onChange: (value: string) => void;
    className?: string
    placeholder: string
  }
  
  export const InputBasic = ({ value, onChange, className, placeholder, ...props }: IInputBasic) => {
    return (
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg px-3 py-2 pr-9 outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white placeholder:text-gray-400",
          className
        )}
        {...props}
      />
    );
  };