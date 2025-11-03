import { cn } from "@/utils/utils";

interface IInput {
    type: string;
    onChange: (value: string) => void; 
    value?: string;
    name: string
    placeholder?: string
    className?: string
    id?: string
  }
  export default function Input({ onChange, value, type, name, placeholder, className, id, ...rest }: IInput) {
    return (
      <input
        type={type}
        onChange={(event) => onChange(event.target.value)}
        value={value}
        name={name}
        placeholder={placeholder}
        id={id}
        
        className={cn(className)}
        {...rest}
      />
    );
  }